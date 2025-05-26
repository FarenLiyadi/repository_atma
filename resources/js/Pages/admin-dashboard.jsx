import { NewAuthenticated } from "@/Layouts/NewAuthenticated";
import React, { useEffect, useState } from "react";
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
    lastFile,
}) {
    // const [orders, setOrders] = useState([]);

    // useEffect(() => {
    //     window.Echo.channel("orders").listen("OrderCreated", (event) => {
    //         console.log("Received order:", event);
    //         setOrders((prev) => [...prev, event]);
    //         toast.info("there is new data", {
    //             position: "top-right",
    //             autoClose: 3000,
    //             closeOnClick: true,
    //             draggable: true,
    //             theme: "light",
    //         });
    //     });

    //     return () => {
    //         window.Echo.leaveChannel("orders");
    //     };
    // }, []);
    // <p>new order</p>
    // {orders.map((order, index) => (
    //     <li key={index}>
    //         {order.name} - ${order.price}
    //     </li>
    // ))}
    // console.log(lastFile);

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
                    lastFile={lastFile}
                    upload_size={auth.user.upload_size}
                />
            </NewAuthenticated>
        </div>
    );
}
