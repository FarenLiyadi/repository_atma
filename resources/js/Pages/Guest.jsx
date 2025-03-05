import React, { useState } from "react";

export default function Guest({ nilai }) {
    const [kode_sandi, setkode_sandi] = useState("");
    const [percobaan, setpercobaan] = useState(nilai);
    const pathSegments = window.location.pathname.split("/");
    const uuid = pathSegments[pathSegments.length - 1];
    function handleSend() {
        if (kode_sandi.length > 0) {
            window.location.href = `/guest-download/${uuid}/${kode_sandi}`;
        } else {
            alert("Masukkan Kode Sandi");
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-blue-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 w-80 md:w-96 text-center">
                {/* Logo */}
                <img
                    src="/img/uajm.png"
                    className="w-36 mx-auto mb-4"
                    alt="Logo"
                />

                {/* Title */}
                <h1 className="text-2xl font-semibold text-gray-800">
                    Welcome to Guest Mode
                </h1>

                {/* Input Field */}
                <input
                    placeholder="Masukkan kode sandi"
                    type="text"
                    value={kode_sandi}
                    onChange={(e) => setkode_sandi(e.target.value)}
                    className="border  border-gray-300 rounded-md p-3 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-red-500 mb-5">
                    {nilai == 1
                        ? "kesempatan terakhir untuk salah kode sandi!"
                        : ""}
                    {nilai == 0
                        ? "kamu terlalu banyak memasukkan salah password, segera hubungi admin!"
                        : ""}
                </p>

                {/* Download Button */}
                <button
                    disabled={percobaan > 0 ? false : true}
                    onClick={handleSend}
                    className="  w-full px-4 py-3 bg-blue-600 text-white rounded-md font-semibold text-lg hover:bg-blue-700 transition duration-300"
                >
                    Download
                </button>
            </div>
        </div>
    );
}
