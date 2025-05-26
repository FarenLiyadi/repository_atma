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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function NewAuthenticated({ children }) {
    const [controller, dispatch] = useMaterialTailwindController();
    const [access, setAccess] = useState([]);
    const { sidenavType } = controller;

    function delayNotif() {
        let notif = JSON.parse(localStorage.getItem("notif"));

        if (notif) {
            if (notif.type == "success") {
                toast.success(notif.msg, {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                    theme: "light",
                });
            } else if (notif.type == "error") {
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

        localStorage.removeItem("notif");
    }

    async function requestResourceLeaderList() {
        try {
            const response = await axios.get("/x-resource/leader-list");
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

    async function requestResourceAccessRightList() {
        try {
            const response = await axios.get("/x-resource/access-right");
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

    async function requestUserAccessRight() {
        try {
            const response = await axios.get("/x-resource/access-right-info");
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
        if (localStorage.getItem("leaderList") === null) {
            const data = await requestResourceLeaderList();
            localStorage.setItem("leaderList", JSON.stringify(data));
            return;
        }
    }

    async function setupAccessRightListStorage() {
        if (localStorage.getItem("AccessRight") === null) {
            const data = await requestResourceAccessRightList();
            localStorage.setItem("AccessRight", JSON.stringify(data));
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
            // setupLeaderListStorage();
            // setupAccessRightListStorage();
            // setupUserAccessRight();
            delayNotif();
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-blue-gray-50/50">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                closeOnClick
                draggable={false}
                theme="light"
            />

            <Sidenav
                brandImg={
                    sidenavType === "dark"
                        ? "/img/logo-ct.png"
                        : "/img/logo-ct-dark.png"
                }
            />
            <div className="p-4 flex-1 xl:ml-80">
                <DashboardNavbar />

                <main> {children}</main>
                <div className="text-blue-gray-600">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default NewAuthenticated;
