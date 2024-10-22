import { chartsConfig } from "@/configs";

const websiteViewsChart = {
    type: "bar",
    height: 220,
    series: [
        {
            name: "Event",
            data: [50, 20, 10, 22, 50, 10, 40],
        },
    ],
    options: {
        ...chartsConfig,
        colors: "#388e3c",
        plotOptions: {
            bar: {
                columnWidth: "16%",
                borderRadius: 5,
            },
        },
        xaxis: {
            ...chartsConfig.xaxis,
            categories: ["M", "T", "W", "T", "F", "S", "S"],
        },
    },
};

const dailySalesChart = {
    type: "line",
    height: 220,
    series: [
        {
            name: "Pengeluaran",
            data: [
                50000, 40000, 300000, 320000, 500000, 350000, 200000, 230000,
                500000,
            ],
        },
    ],
    options: {
        ...chartsConfig,
        colors: ["#e53935"],
        stroke: {
            lineCap: "round",
        },
        markers: {
            size: 5,
        },
        xaxis: {
            ...chartsConfig.xaxis,
            categories: [
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },
    },
};

const completedTaskChart = {
    type: "line",
    height: 220,
    series: [
        {
            name: "Sales",
            data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
        },
    ],
    options: {
        ...chartsConfig,
        colors: ["#388e3c"],
        stroke: {
            lineCap: "round",
        },
        markers: {
            size: 5,
        },
        xaxis: {
            ...chartsConfig.xaxis,
            categories: [
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },
    },
};
const completedTasksChart = {
    ...completedTaskChart,
    series: [
        {
            name: "Tasks",
            data: [
                500000, 400000, 300000, 220000, 500000, 250000, 400000, 230000,
                500000,
            ],
        },
    ],
};

export const statisticsChartsData = [
    {
        color: "white",
        title: "Event",
        description: "Event per hari",
        footer: "updated 2 hours ago",
        chart: websiteViewsChart,
    },
    {
        color: "white",
        title: "Pengeluaran",
        description: "Pengeluaran per bulan",
        footer: "updated 4 min ago",
        chart: dailySalesChart,
    },
    {
        color: "white",
        title: "Pendapatan",
        description: "Pendapatan per bulan",
        footer: "just updated 1 minutes ago",
        chart: completedTasksChart,
    },
];

export default statisticsChartsData;
