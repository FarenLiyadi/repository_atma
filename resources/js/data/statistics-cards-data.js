import {
    BanknotesIcon,
    UserPlusIcon,
    UsersIcon,
    ChartBarIcon,
} from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fabuildinguser } from "@awesome.me/kit-KIT_CODE/icons/classic/solid";
import { faCat } from "@awesome.me/kit-KIT_CODE/icons/sharp/solid";
import { faDog } from "@awesome.me/kit-KIT_CODE/icons/sharp-duotone/solid";

export const statisticsCardsData = [
    {
        color: "green",
        icon: <FontAwesomeIcon icon="fa-solid fa-building-user" />,
        title: "Pendapatan bulan ini",
        value: "Rp 51.000.000",
        footer: {
            color: "text-green-500",
            value: "+55%",
            label: "Dari bulan lalu",
        },
    },
    {
        color: "gray",
        icon: UsersIcon,
        title: "Total Client",
        value: "466",
        footer: {
            color: "text-green-500",
            value: "",
            label: "Perhitungan mulai dari 2024",
        },
    },
    {
        color: "gray",
        icon: UserPlusIcon,
        title: "Client baru bulan ini",
        value: "10",
        footer: {
            color: "text-red-500",
            value: "",
            label: "May 2024",
        },
    },
    {
        color: "red",
        icon: ChartBarIcon,
        title: "Pengeluaran bulan ini",
        value: "Rp 1.003.430",
        footer: {
            color: "text-green-500",
            value: "+5%",
            label: "Dari bulan lalu",
        },
    },
];

export default statisticsCardsData;
