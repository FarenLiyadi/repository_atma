import { NewAuthenticated } from "@/Layouts/NewAuthenticated";
import React, { useEffect, useState } from "react";
import { Home } from "./dashboard/home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Head } from "@inertiajs/react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

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
    const [size, setSize] = React.useState(null);
    const handleOpen = (value) => setSize(value);
    return (
        <div>
            <Head title="Dashboard" />
            <NewAuthenticated>
                <Button
                    className="mb-2 "
                    onClick={() => handleOpen("xl")}
                    variant="gradient"
                >
                    Panduan Aplikasi
                </Button>
                <Dialog open={size === "xl"} size={"xl"} handler={handleOpen}>
                    <DialogHeader>Panduan Penggunaan</DialogHeader>
                    <DialogBody className="space-y-4 text-sm text-gray-700">
                        <div>
                            <h3 className="text-lg font-semibold mb-1">
                                📤 Upload Data
                            </h3>
                            <p>
                                Menu <strong>Upload Data</strong> digunakan
                                untuk mengunggah data ke dalam sistem. Dalam
                                proses ini, Anda harus melengkapi beberapa
                                informasi penting, seperti:
                            </p>
                            <ul className="list-disc list-inside ml-4">
                                <li>Tipe Data</li>
                                <li>Tahun Akademik (format: 2023/2024)</li>
                                <li>Judul Data</li>
                                <li>Perizinan Akses (publik/pribadi)</li>
                            </ul>
                            <p>
                                Pastikan seluruh isian diisi dengan benar agar
                                data dapat tersimpan dan diakses sesuai
                                perizinan.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-1">
                                📄 Lihat Data
                            </h3>
                            <p>
                                Setelah data berhasil diunggah, Anda dapat
                                melihatnya pada menu <strong>Lihat Data</strong>
                                . Di sana, Anda memiliki beberapa fitur
                                lanjutan:
                            </p>
                            <ul className="list-disc list-inside ml-4">
                                <li>Share: Membagikan file ke orang lain</li>
                                <li>Download: Mengunduh file</li>
                                <li>
                                    Add Visitor: Memberikan akses ke pengguna
                                    tertentu
                                </li>
                                <li>Edit Visitor: Mengubah daftar visitor</li>
                                <li>Delete: Menghapus data secara permanen</li>
                            </ul>
                            <p className="text-red-600 mt-2 font-medium">
                                ⚠️ Perhatian: Jika data dihapus, file akan
                                hilang secara permanen. Informasi data tetap
                                tersimpan, namun file tidak dapat dikembalikan
                                kecuali diminta ke admin.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-1">
                                👥 Add Visitor
                            </h3>
                            <p>
                                Menu ini digunakan untuk menambahkan pengguna
                                secara spesifik agar bisa melihat file dengan
                                status <em>"hide"</em> atau tersembunyi. Menu
                                ini juga dapat digunakan untuk membagikan file
                                ke pengguna eksternal yang tidak terdaftar dalam
                                sistem.
                            </p>
                            <p className="mt-1">
                                Pemilik file dapat menambahkan{" "}
                                <strong>sandi akses</strong> (opsional) sebagai
                                lapisan keamanan tambahan.
                            </p>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={() => handleOpen(null)}
                            className="mr-1"
                        >
                            <span>Tutup</span>
                        </Button>
                    </DialogFooter>
                </Dialog>

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
