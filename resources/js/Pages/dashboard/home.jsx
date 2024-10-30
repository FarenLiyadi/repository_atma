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

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

import { StatisticsCard } from "@/widgets/cards";

const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(number);
};

export function Home({ user_tu, user_dosen, usage, size, roles }) {
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
            color: "green",
            icon: "tata_usaha",
            title: "User TU",
            value: user_tu,
            footer: {
                color: "",
                value: "",
                label: "",
            },
        },
    ];
    const data = {
        labels: ["Free", "Usage"],
        datasets: [
            {
                label: "Size in GB",
                data: [size - usage, usage],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                ],
                borderColor: [
                    "rgba(54, 162, 239, 0.2)",
                    "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                enabled: true,
            },
        },
    };
    return (
        <div className="mt-12 h-screen">
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
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
                {roles != 1 && (
                    <Card className="mt-6 w-96">
                        <CardBody>
                            <Typography
                                variant="h5"
                                color="blue-gray"
                                className="mb-2"
                            >
                                My Storage
                            </Typography>
                            <Typography>Size : {size} Gb</Typography>
                            <Typography>Usage : {usage} Gb</Typography>
                            <Typography>
                                Free Space : {size - usage} Gb
                            </Typography>
                        </CardBody>
                        <Pie data={data} options={options} />
                    </Card>
                )}
            </div>
        </div>
    );
}

export default Home;
