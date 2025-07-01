import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
    UserGroupIcon,
    UserIcon,
    DocumentIcon,
    FingerPrintIcon,
    IdentificationIcon,
    BookOpenIcon,
    MoonIcon,
    SunIcon,
    ChevronDownIcon,
    ClipboardDocumentCheckIcon,
    ChevronUpIcon,
    GiftIcon,
    WalletIcon,
    TagIcon,
    CircleStackIcon,
    BanknotesIcon,
    QrCodeIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { TbFileCv } from "react-icons/tb";
import { FaDatabase } from "react-icons/fa";
import { IoIosCloudUpload } from "react-icons/io";
import { TiUserAdd } from "react-icons/ti";
import { MdDelete } from "react-icons/md";

import {
    Avatar,
    Button,
    IconButton,
    Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import NewNavLink from "@/Components/NewNavLink";

export function Sidenav() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { openSidenav } = controller;
    const [openAdminData, SetOpenAdminData] = useState(false);

    const [username, setUsername] = useState("");
    const [fakultas, setfakultas] = useState("");
    const [prodi, setprodi] = useState("");
    const [roles, setroles] = useState(null);

    async function search() {
        const response = await getDetailUser();
        // console.log(response);
        renderTableUpdateUser(response);
    }

    useEffect(() => {
        search();
    }, []);

    async function getDetailUser() {
        try {
            const response = await axios.get("/get-user-profile", {
                params: "",
            });
            if (response.data.code !== 0) {
                toast.error(response.data.msg, {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                    theme: "light",
                });
                throw new Error(response.data.msg);
            }

            return response.data.data;
        } catch (error) {
            alert(error);
            console.error("There was a problem with the Axios request:", error);
            throw error;
        }
    }

    function renderTableUpdateUser(items) {
        const data = items;

        setUsername(data.user.username);
        setroles(data.user.roles);
        setfakultas(data.user.fakultas);
        setprodi(data.user.prodi);
    }

    return (
        <aside
            className={`bg-white shadow-sm ${
                openSidenav ? "translate-x-0" : "-translate-x-80"
            } fixed inset-0 z-50 my-4 ml-4 max-h-[calc(100vh-32px)] w-72 rounded-xl pb-4 transition-transform duration-300 xl:translate-x-0 border border-blue-100 overflow-auto no-scrollbar`}
        >
            <div className={`relative`}>
                <div to="" className=" px-8 text-center mx-auto w-max">
                    <div className=" lg:pt-8 xl:pt-4 flex w-full justify-center  items-center gap-2">
                        <img src="/img/uajm.png" className="w-20 " alt="" />
                        <p className="text-black font-bold ">
                            Repository - UAJM
                        </p>
                    </div>
                </div>
                <IconButton
                    variant="text"
                    color="blue"
                    size="sm"
                    ripple={false}
                    className="absolute right-3 top-3 grid rounded-br-none rounded-tl-none xl:hidden"
                    onClick={() => setOpenSidenav(dispatch, false)}
                >
                    <XMarkIcon
                        strokeWidth={2.5}
                        className="h-5 w-5 text-blue-400"
                    />
                </IconButton>
            </div>
            <div className="mx-2 border-b-2 mb-4  border-b-light-blue-300">
                <ul>
                    <li key="Dashboard">
                        <a href={roles != 1 ? "/update-user" : "#"}>
                            <Button
                                variant={"text"}
                                color={"blue"}
                                className="flex items-center gap-4 px-4 capitalize"
                                fullWidth
                            >
                                <img
                                    src={`https://ui-avatars.com/api/?name=${username}`}
                                    className="w-10 h-10 text-inherit rounded-xl"
                                />
                                <Typography
                                    color="inherit"
                                    className="font-medium capitalize"
                                >
                                    {username}
                                </Typography>
                            </Button>
                        </a>
                    </li>
                </ul>
                <ul>
                    <li className="capitalize pl-20 -mt-6">
                        {fakultas ?? "-"}
                    </li>
                    <li className="capitalize pl-20 -mt-1">{prodi ?? "-"}</li>
                </ul>
            </div>
            <div className="mx-2 ">
                <ul key={"Menu"} className="mb-0 flex flex-col gap-1">
                    <li className="mx-3.5 mt-0 mb-2">
                        <Typography
                            variant="small"
                            color={"blue"}
                            className="font-black uppercase opacity-75"
                        >
                            Menu
                        </Typography>
                    </li>
                    <li key="Dashboard">
                        <a href="/dashboard">
                            <Button
                                variant={
                                    route().current("dashboard")
                                        ? "gradient"
                                        : "text"
                                }
                                color={"blue"}
                                className="flex items-center gap-4 px-4 capitalize"
                                fullWidth
                            >
                                <HomeIcon className="w-5 h-5 text-inherit" />
                                <Typography
                                    color="inherit"
                                    className="font-medium capitalize"
                                >
                                    Dashboard
                                </Typography>
                            </Button>
                        </a>
                    </li>
                    {roles != 1 && (
                        <li key="upload-data">
                            <a href="/upload-data">
                                <Button
                                    variant={
                                        route().current("upload.data")
                                            ? "gradient"
                                            : "text"
                                    }
                                    color={"blue"}
                                    className="flex items-center gap-4 px-4 capitalize"
                                    fullWidth
                                >
                                    <IoIosCloudUpload className="w-5 h-5 text-inherit" />
                                    <Typography
                                        color="inherit"
                                        className="font-medium capitalize"
                                    >
                                        Upload Data
                                    </Typography>
                                </Button>
                            </a>
                        </li>
                    )}
                    {roles == 1 && (
                        <li key="deleted-data">
                            <a href="/list-deleted">
                                <Button
                                    variant={
                                        route().current("list.deleted.view")
                                            ? "gradient"
                                            : "text"
                                    }
                                    color={"blue"}
                                    className="flex items-center gap-4 px-4 capitalize"
                                    fullWidth
                                >
                                    <MdDelete className="w-5 h-5 text-inherit" />
                                    <Typography
                                        color="inherit"
                                        className="font-medium capitalize"
                                    >
                                        List File deleted
                                    </Typography>
                                </Button>
                            </a>
                        </li>
                    )}

                    {roles === 1 && (
                        <li key="register">
                            <li
                                key="admin"
                                onClick={() => SetOpenAdminData(!openAdminData)}
                            >
                                <Button
                                    variant={
                                        route().current("update.user.view")
                                            ? "gradient"
                                            : "text"
                                    }
                                    color={"blue"}
                                    className="flex items-center justify-between gap-4 px-4 space-x-4 capitalize"
                                    fullWidth
                                >
                                    <div className="flex items-center gap-4">
                                        <UserGroupIcon className="w-5 h-5 text-inherit" />
                                        <Typography
                                            color="inherit"
                                            className="font-medium capitalize"
                                        >
                                            Administrator
                                        </Typography>
                                    </div>
                                    {openAdminData ? (
                                        <div className="ml-7">
                                            <ChevronUpIcon className="w-6 h-6 text-inherit" />
                                        </div>
                                    ) : (
                                        <div className="ml-7">
                                            <ChevronDownIcon className="w-6 h-6 text-inherit" />
                                        </div>
                                    )}
                                </Button>
                                {openAdminData && (
                                    <div className=" ">
                                        <li key={"list-user"} className="max-w">
                                            <a href="/list-user" className="">
                                                <Button
                                                    variant={
                                                        route().current(
                                                            "list.user.view"
                                                        )
                                                            ? "gradient"
                                                            : "text"
                                                    }
                                                    color={"blue"}
                                                    className="flex ml-2 justify-start  capitalize gap-2 "
                                                    fullWidth
                                                >
                                                    <UserIcon className="w-5 h-5 text-inherit" />
                                                    <Typography
                                                        color="inherit"
                                                        className="font-medium capitalize text-right"
                                                    >
                                                        Daftar User
                                                    </Typography>
                                                </Button>
                                            </a>
                                        </li>
                                        <li className="max-w">
                                            {" "}
                                            <a href="/create-user">
                                                <Button
                                                    variant={
                                                        route().current(
                                                            "create.user.view"
                                                        )
                                                            ? "gradient"
                                                            : "text"
                                                    }
                                                    color={"blue"}
                                                    className="flex ml-2 justify-start  capitalize gap-2 "
                                                    fullWidth
                                                >
                                                    <TiUserAdd className="w-5 h-5 text-inherit" />
                                                    <Typography
                                                        color="inherit"
                                                        className="font-medium capitalize"
                                                    >
                                                        Register
                                                    </Typography>
                                                </Button>
                                            </a>
                                        </li>
                                    </div>
                                )}
                            </li>
                        </li>
                    )}
                    <li key="list-pengajaran">
                        <a href="/list-pengajaran">
                            <Button
                                variant={
                                    route().current("list.pengajaran.view") ||
                                    route().current("update.pengajaran.view")
                                        ? "gradient"
                                        : "text"
                                }
                                color={"blue"}
                                className="flex items-center gap-4 px-4 capitalize"
                                fullWidth
                            >
                                <FaDatabase className="w-5 h-5 text-inherit" />
                                <Typography
                                    color="inherit"
                                    className="font-medium capitalize"
                                >
                                    Pendidikan & pengajaran
                                </Typography>
                            </Button>
                        </a>
                    </li>
                    <li key="list-penelitian">
                        <a href="/list-penelitian">
                            <Button
                                variant={
                                    route().current("list.penelitian.view") ||
                                    route().current("update.penelitian.view")
                                        ? "gradient"
                                        : "text"
                                }
                                color={"blue"}
                                className="flex items-center gap-4 px-4 capitalize"
                                fullWidth
                            >
                                <FaDatabase className="w-5 h-5 text-inherit" />
                                <Typography
                                    color="inherit"
                                    className="font-medium capitalize"
                                >
                                    Penelitian
                                </Typography>
                            </Button>
                        </a>
                    </li>
                    <li key="list-pengabdian">
                        <a href="/list-pengabdian">
                            <Button
                                variant={
                                    route().current("list.pengabdian.view") ||
                                    route().current("update.pengabdian.view")
                                        ? "gradient"
                                        : "text"
                                }
                                color={"blue"}
                                className="flex items-center gap-4 px-4 capitalize"
                                fullWidth
                            >
                                <FaDatabase className="w-5 h-5 text-inherit" />
                                <Typography
                                    color="inherit"
                                    className="font-medium capitalize"
                                >
                                    Pengabdian
                                </Typography>
                            </Button>
                        </a>
                    </li>

                    <li key="list-penunjang">
                        <a href="/list-penunjang">
                            <Button
                                variant={
                                    route().current("list.penunjang.view") ||
                                    route().current("update.penunjang.view")
                                        ? "gradient"
                                        : "text"
                                }
                                color={"blue"}
                                className="flex items-center gap-4 px-4 capitalize"
                                fullWidth
                            >
                                <FaDatabase className="w-5 h-5 text-inherit" />
                                <Typography
                                    color="inherit"
                                    className="font-medium capitalize"
                                >
                                    Penunjang
                                </Typography>
                            </Button>
                        </a>
                    </li>
                    <li key="list-pribadi">
                        <a href="/list-pribadi">
                            <Button
                                variant={
                                    route().current("list.pribadi.view") ||
                                    route().current("update.pribadi.view")
                                        ? "gradient"
                                        : "text"
                                }
                                color={"blue"}
                                className="flex items-center gap-4 px-4 capitalize"
                                fullWidth
                            >
                                <TbFileCv className="w-5 h-6 text-inherit" />
                                <Typography
                                    color="inherit"
                                    className="font-medium capitalize"
                                >
                                    Pribadi
                                </Typography>
                            </Button>
                        </a>
                    </li>

                    <li key="LogOut">
                        <NewNavLink
                            method="post"
                            href={route("logout")}
                            as="button"
                        >
                            <Button
                                variant={"text"}
                                color={"blue"}
                                className="flex items-center gap-4 px-4 capitalize"
                                fullWidth
                                type="submit"
                            >
                                <IoIosLogOut className="w-5 h-5 text-inherit" />
                                <Typography
                                    color="inherit"
                                    className="font-medium capitalize"
                                >
                                    Logout
                                </Typography>
                            </Button>
                        </NewNavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidenav;
