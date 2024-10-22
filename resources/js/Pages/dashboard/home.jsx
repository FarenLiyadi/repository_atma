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
    Tooltip,
    Progress,
    CardFooter,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

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
                    </Card>
                )}
            </div>
        </div>
    );
}

export default Home;
