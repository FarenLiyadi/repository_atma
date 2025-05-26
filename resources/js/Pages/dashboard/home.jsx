import React, { useEffect, useState } from "react";
import {
    Typography,
    Card,
    CardHeader,
    CardBody,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    // Tooltip,
    Progress,
    CardFooter,
} from "@material-tailwind/react";
// import { PieChart } from "react-minimal-pie-chart";
// import Chart from "react-apexcharts";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    ChartDataLabels,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

import { StatisticsCard } from "@/widgets/cards";

const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(number);
};

export function Home({
    user_tu,
    user_dosen,
    usage,
    size,
    roles,
    calculate,
    calculate2,
    drive,
    lastFile,
    upload_size,
}) {
    // console.log(drive);

    const statisticsCardsData = [
        {
            color: "gray",
            icon: "dosen",
            title: "User Dosen",
            value: user_dosen,
            footer: {
                color: "text-green-500",
                value: "",
                label: "",
            },
        },
        {
            color: "gray",
            icon: "tata_usaha",
            title: "User TU",
            value: user_tu,
            footer: {
                color: "",
                value: "",
                label: "",
            },
        },
        {
            color: "green",
            icon: "server",
            title: "Total Storage",
            value: drive.TotalSpace,
            footer: {
                color: "text-green-500",
                value: "",
                label: "",
            },
        },
        {
            color: "red",
            icon: "used",
            title: "Used Space",
            value: drive.UsedSpace,
            footer: {
                color: "",
                value: "",
                label: "",
            },
        },
        {
            color: "blue",
            icon: "free",
            title: "Free Space",
            value: drive.FreeSpace,
            footer: {
                color: "",
                value: "",
                label: "",
            },
        },
    ];
    const data = Object.entries(calculate).map(([key, value]) => ({
        type: key.toUpperCase(),
        size: parseFloat(value), // Extract numeric value
    }));
    const data2 = Object.entries(calculate2).map(([key, value]) => ({
        type: key.toUpperCase(),
        size: parseFloat(value), // Extract numeric value
    }));
    // console.log(data2);

    // console.log(data2);

    const chartData2 = {
        labels: data2.map((item) => item.type),
        datasets: [
            {
                data: data2.map((item) => item.size),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFA725",
                    "#80CBC4",
                    "#D3E671",
                    "#2C3930",
                    "#FCC6FF",
                    "#16C47F",
                    "#8D0B41",
                    "#F26B0F",
                ], // Define colors
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFA725",
                    "#80CBC4",
                    "#D3E671",
                    "#2C3930",
                    "#FCC6FF",
                    "#16C47F",
                    "#8D0B41",
                    "#F26B0F",
                ],
                barPercentage: 1,
            },
        ],
    };
    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                labels: {
                    color: "white",
                },
            },
            tooltip: {
                titleColor: "white", // Set tooltip title color
                bodyColor: "white", // Set tooltip body text color
            },
            title: {
                display: false,
                text: "Bar Chart Example",
            },
            datalabels: {
                color: "white", // Set the data label inside bars to white
                anchor: "center",
                align: "center",
                font: {
                    weight: "bold",
                    size: 14,
                },
            },
        },

        scales: {
            y: {
                beginAtZero: true,

                ticks: {
                    stepSize: 1, // Set interval between numbers to 1
                    color: "black", // Optional: Change label color
                },
            },
        },
    };
    const chartData = {
        labels: data.map((item) => item.type),
        datasets: [
            {
                data: data.map((item) => item.size),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFA725",
                    "#80CBC4",
                    "#D3E671",
                    "#2C3930",
                    "#FCC6FF",
                    "#16C47F",
                    "#8D0B41",
                    "#F26B0F",
                ], // Define colors
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFA725",
                    "#80CBC4",
                    "#D3E671",
                    "#2C3930",
                    "#FCC6FF",
                    "#16C47F",
                    "#8D0B41",
                    "#F26B0F",
                ],
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            datalabels: {
                color: "#fff", // Label color
                font: {
                    size: 12,
                    weight: "bold",
                },
                formatter: (value) => `${value} MB`, // Display size in MB
            },
        },
    };

    return (
        <div className=" h-screen mb-12">
            {roles != 1 && (
                <div className=" grid gap-y-10 gap-x-6 ">
                    <div className="p-4 bg-white shadow-md rounded-xl w-full">
                        <h2 className="text-lg font-semibold mb-4">
                            Detail Penyimpanan
                        </h2>
                        <Typography>
                            Max Upload Size : {upload_size} Mb
                        </Typography>
                        <Typography>Size : {size} GB</Typography>
                        <Typography>Usage : {usage} GB</Typography>
                        <Typography>Free Space : {size - usage} GB</Typography>
                        <br />
                        <div className="flex flex-wrap gap-20  w-full">
                            <div className="w-64">
                                <Typography>Per Extension (MB)</Typography>
                                <Pie data={chartData} options={options} />
                            </div>
                            <div className="w-1/2">
                                <Typography>Per Kategori (MB)</Typography>
                                <Bar data={chartData2} options={options2} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-12 grid gap-y-10 gap-x-6  md:grid-cols-2 xl:grid-cols-4">
                {roles == 1
                    ? statisticsCardsData.map(
                          ({ icon, title, footer, ...rest }) => (
                              <StatisticsCard
                                  key={title}
                                  {...rest}
                                  title={title}
                                  icon={icon}
                                  footer={
                                      <Typography className="font-normal text-blue-gray-600">
                                          <strong className={footer.color}>
                                              {footer.value}
                                          </strong>
                                          &nbsp;{footer.label}
                                      </Typography>
                                  }
                              />
                          )
                      )
                    : ""}
            </div>
            <div className="mb-18 ">
                <div className="p-4 bg-white shadow-md rounded-xl w-full">
                    <h2 className="text-lg font-semibold mb-4">
                        Last File Upload
                    </h2>

                    <table className="w-full">
                        <thead className="border">
                            <th className="border ">Username</th>
                            <th className="border ">Judul</th>
                            <th className="border ">Kategori</th>
                            <th className="border ">Tanggal upload</th>
                        </thead>
                        <tbody className="border">
                            {lastFile
                                ? lastFile.map((e, index) => {
                                      return (
                                          <tr>
                                              <td className="text-center w-1/4 border">
                                                  {e.username}
                                              </td>
                                              <td className="border text-center w-1/4 px-2">
                                                  {e.judul_data}
                                              </td>
                                              <td className="border text-center w-1/4 px-2">
                                                  {e.sumber}
                                              </td>
                                              <td className="px-2 w-1/4 text-center">
                                                  {new Date(
                                                      e.created_at
                                                  ).toLocaleDateString(
                                                      "id-ID",
                                                      {
                                                          day: "2-digit",
                                                          month: "long",
                                                          year: "numeric",
                                                      }
                                                  )}
                                              </td>
                                          </tr>
                                      );
                                  })
                                : ""}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Home;
