import NewAuthenticated from "@/Layouts/NewAuthenticated";
import { useEffect } from "react";
import { Head } from "@inertiajs/react";
import { toast } from "react-toastify";
import axios from "axios";

export default function detailUser({ auth }) {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryParams = new URLSearchParams(window.location.search);
                const itemId = queryParams.get("id");

                const response = await getDetailUser(itemId);
                renderTableDetailUser(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    async function getDetailUser(itemId) {
        let parameter = {
            item_id: itemId,
        };

        try {
            const response = await axios.get("/admin/detail-user-request", {
                params: parameter,
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
            toast.error(error, {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                draggable: true,
                theme: "light",
            });
            console.error("There was a problem with the Axios request:", error);
            throw error;
        }
    }

    function renderTableDetailUser(items) {
        const data = items.item;
        let userId = document.getElementById("user_id");
        let nama = document.getElementById("nama");
        let access_id = document.getElementById("access_id");
        let peran = document.getElementById("peran");
        let dibuatOleh = document.getElementById("dibuat_oleh");
        let tanggal = document.getElementById("tanggal");
        let select_event = document.getElementById("select_event");

        const accessRight = JSON.parse(localStorage.getItem("AccessRight"));
        const accessName = accessRight.find(
            (item) => item[0] === data.access_id
        );

        userId.textContent = data.id;
        nama.textContent = data.username;
        access_id.textContent = accessName[1] ?? "-";
        peran.textContent = data.roles;
        dibuatOleh.textContent = data.created_by;
        select_event.textContent =
            data.select_event == 1 ? "SANGJIT" : "RESEPSI";
        tanggal.textContent = new Date(data.created_at).toLocaleDateString(
            "id-ID",
            { weekday: "long", day: "2-digit", month: "long", year: "numeric" }
        );
    }

    function pageUpdateUser() {
        const queryParams = new URLSearchParams(window.location.search);
        const itemId = queryParams.get("id");
        window.location.href = `/admin/update-user?id=${itemId}`;
    }

    return (
        <NewAuthenticated>
            <Head title="Detail User" />

            <div className="pt-5 overflow-auto">
                <div className="flex justify-between items-baseline my-auto sm:px-6 lg:px-8 space-y-6">
                    <h2 className="text-2xl font-bold">Detail User</h2>

                    {/* BreadCrumb Navigation */}
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <a
                                        href="/"
                                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        Dashboard
                                    </a>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg
                                        className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 9 4-4-4-4"
                                        />
                                    </svg>
                                    <a
                                        href={`/admin/list-user`}
                                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        List User
                                    </a>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg
                                        className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 9 4-4-4-4"
                                        />
                                    </svg>
                                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                        Detail User
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="py-5">
                <div className="mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="flex justify-between">
                            <h2 className="text-3xl text-dark font-extrabold">
                                Detail User
                            </h2>
                            <div>
                                <button
                                    onClick={pageUpdateUser}
                                    className="rounded px-2 py-1.5 font-semibold text-white bg-blue-500 hover:bg-blue-600"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                        <div className="pt-4 table-auto w-full">
                            <table className="w-full border-collapse border border-slate-500">
                                <tbody id="table-body">
                                    <tr>
                                        <td className="text-dark border border-slate-600 font-bold text-xl p-2">
                                            User ID
                                        </td>
                                        <td
                                            className="text-dark border border-slate-600 text-xl p-2"
                                            id="user_id"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="text-dark border border-slate-600 font-bold text-xl p-2">
                                            Nama
                                        </td>
                                        <td
                                            className="text-dark border border-slate-600 text-xl p-2"
                                            id="nama"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="text-dark border border-slate-600 font-bold text-xl p-2">
                                            Event Acara
                                        </td>
                                        <td
                                            className="text-dark border border-slate-600 text-xl p-2"
                                            id="select_event"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="text-dark border border-slate-600 w-1/3 font-bold text-xl p-2">
                                            Hak Akses
                                        </td>
                                        <td
                                            className="text-dark border border-slate-600 text-xl p-2"
                                            id="access_id"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="text-dark border border-slate-600 font-bold text-xl p-2">
                                            Peran
                                        </td>
                                        <td
                                            className="text-dark border border-slate-600 text-xl p-2"
                                            id="peran"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="text-dark border border-slate-600 font-bold text-xl p-2">
                                            Dibuat Oleh
                                        </td>
                                        <td
                                            className="text-dark border border-slate-600 text-xl p-2"
                                            id="dibuat_oleh"
                                        ></td>
                                    </tr>
                                    <tr>
                                        <td className="text-dark border border-slate-600 font-bold text-xl p-2">
                                            Dibuat Tanggal
                                        </td>
                                        <td
                                            className="text-dark border border-slate-600 text-xl p-2"
                                            id="tanggal"
                                        ></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </NewAuthenticated>
    );
}
