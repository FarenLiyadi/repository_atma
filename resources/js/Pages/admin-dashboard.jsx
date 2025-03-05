import { NewAuthenticated } from "@/Layouts/NewAuthenticated";
import React, { useEffect } from "react";
import { Home } from "./dashboard/home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Head } from "@inertiajs/react";

export default function Tes({
    user_tu,
    user_dosen,
    auth,
    calculate,
    calculate2,
    drive,
}) {
    console.log(calculate);

    return (
        <div>
            <Head title="Dashboard" />
            <NewAuthenticated>
                <Home
                    user_dosen={user_dosen}
                    user_tu={user_tu}
                    roles={auth.user.roles}
                    size={auth.user.size}
                    usage={auth.user.usage}
                    calculate={calculate}
                    calculate2={calculate2}
                    drive={drive}
                />
            </NewAuthenticated>
        </div>
    );
}
