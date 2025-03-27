import { NewAuthenticated } from "@/Layouts/NewAuthenticated";
import React, { useEffect, useState } from "react";
import { Home } from "./dashboard/home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Head } from "@inertiajs/react";
// import Echo from "laravel-echo";

// import Pusher from "pusher-js";

export default function Tes({
    user_tu,
    user_dosen,
    auth,
    calculate,
    calculate2,
    drive,
}) {
    // const [orders, setOrders] = useState([]);
    // window.Echo = new Echo({
    //     broadcaster: "reverb",
    //     key: import.meta.env.VITE_REVERB_APP_KEY,
    //     wsHost: import.meta.env.VITE_REVERB_HOST,
    //     wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    //     wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    //     forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
    //     enabledTransports: ["ws", "wss"],
    // });
    // useEffect(() => {
    //     window.Echo.channel("orders").listen("OrderCreated", (event) => {
    //         console.log("Received order:", event);
    //         setOrders((prev) => [...prev, event]);
    //     });

    //     return () => {
    //         window.Echo.leaveChannel("orders");
    //     };
    // }, []);

    // {orders.map((order, index) => (
    //     <li key={index}>
    //         {order.name} - ${order.price}
    //     </li>
    // ))}
    return (
        <div>
            <Head title="Dashboard" />
            <NewAuthenticated>
                <p>new order</p>
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
