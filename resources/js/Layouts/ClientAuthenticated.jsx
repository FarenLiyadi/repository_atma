import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
    Sidenav,
    DashboardNavbar,
    Configurator,
    Footer,
} from "@/widgets/layout";

import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClientSidenav } from "@/widgets/layout/ClientSidenav";

export function ClientAuthenticated({ children }) {
    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavType } = controller;
    const [access, setAccess] = useState([]);

    function delayNotif() {
        let notif = JSON.parse(localStorage.getItem("notif"))

        if (notif) {
            if (notif.type == 'success') {
                toast.success(notif.msg, {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                    theme: "light",
                });
            } else if (notif.type == 'error') {
                toast.error(notif.msg, {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                    theme: "light",
                });
            } else {
                toast.info(notif.msg, {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                    theme: "light",
                });
            }
        }

        localStorage.removeItem('notif');
    }

    async function requestResourceLeaderList() {
        try {
            const response = await axios
                .get("/x-resource/leader-list");
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
            toast.error("Something Went Wrong!", {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                draggable: true,
                theme: "light",
            });
            throw error;
        }
    }

    async function requestUserAccessRight() {
        try {
            const response = await axios
                .get("/x-resource/access-right-info");
            if (response.data.code !== 0) {
                console.log("error");
                throw new Error(response.data.msg);
            }
            return response.data.data;
        } catch (error) {
            console.error("There was a problem with the Axios request:", error);
            throw error;
        }
    }

    // Set Up
    async function setupLeaderListStorage() {
        if (localStorage.getItem('leaderList') === null) {
            const data = await requestResourceLeaderList();
            localStorage.setItem('leaderList', JSON.stringify(data));
            return;
        }
    }

    async function setupUserAccessRight() {
        const data = await requestUserAccessRight();
        setAccess(data);
        return;
    }

    useEffect(() => {
        const fetchData = async () => {
            setupLeaderListStorage();
            setupUserAccessRight();
            delayNotif();
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-blue-gray-50/50">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                closeOnClick
                draggable={false}
                theme="light"
            />
            <ClientSidenav
                brandImg={
                    sidenavType === "dark"
                        ? "/img/logo-ct.png"
                        : "/img/logo-ct-dark.png"
                }
                access={access}
            />
            <div className="p-4 xl:ml-80">
                <DashboardNavbar />

                <IconButton
                    size="lg"
                    color="white"
                    className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
                    ripple={false}
                    onClick={() => setOpenConfigurator(dispatch, true)}
                >
                    <Cog6ToothIcon className="h-5 w-5" />
                </IconButton>

                <main> {children}</main>
                <div className="text-blue-gray-600">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ClientAuthenticated;
