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
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

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
            },
        ],
    };
    const options2 = {
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
        <div className="mt-12 h-screen">
            {roles != 1 && (
                <div className="mb-12 grid gap-y-10 gap-x-6 ">
                    <div className="p-4 bg-white shadow-md rounded-xl w-full">
                        <h2 className="text-lg font-semibold mb-4">
                            Detail Penyimpanan
                        </h2>
                        <Typography>Size : {size} GB</Typography>
                        <Typography>Usage : {usage} GB</Typography>
                        <Typography>Free Space : {size - usage} GB</Typography>
                        <br />
                        <div className="flex flex-wrap  gap-20">
                            <div className="">
                                <Typography>Per Extension</Typography>
                                <Pie data={chartData} options={options} />
                            </div>
                            <div className="">
                                <Typography>Per Kategori</Typography>
                                <Pie data={chartData2} options={options2} />
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
        </div>
    );
}

export default Home;
