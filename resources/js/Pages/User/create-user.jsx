import NewAuthenticated from "@/Layouts/NewAuthenticated";
import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { toast } from "react-toastify";

export default function createUser({ auth }) {
    const [role, setRole] = useState(null);
    const [username, setUsername] = useState("");
    const [size, setsize] = useState(0);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState({});

    async function submitHandler(e) {
        e.preventDefault();

        let errors = {};

        if (!username.trim()) {
            errors.username = "Nama harus diisi.";
        }

        if (password != password2) {
            errors.password2 = "Password dan Konfirmasi Password tidak sesuai.";
        }

        if (!role) {
            errors.role = "Harus Mememilih Role.";
        }

        if (Object.keys(errors).length === 0) {
            const data = {
                username: username,
                size: size,
                password: password,
                conf_password: password2,
                roles: role,
            };

            console.log("Submit", data);

            try {
                const response = await axios.post("/create-user", data);
                if (response.data.code !== 0) {
                    toast.error(response.data.msg, {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                        draggable: true,
                        theme: "light",
                    });
                    return;
                }
                // Untuk Nofitikasi
                localStorage.setItem(
                    "notif",
                    JSON.stringify({
                        type: "success",
                        msg: response.data.msg,
                    })
                );

                window.location.href = "/list-user";
            } catch (error) {
                toast.error("Something Went Wrong!", {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                    theme: "light",
                });
            }
        } else {
            setErrors(errors);
        }
    }
    function change_role(value) {
        setRole(value);
    }

    return (
        <NewAuthenticated>
            <Head title="Register" />

            <div className="pt-5 overflow-auto">
                <div className="flex justify-between items-baseline my-auto sm:px-6 lg:px-8 space-y-6">
                    <h2 className="text-2xl font-bold">Register</h2>

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
                            <li aria-current="page"></li>
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
                                        Register
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
                        <div>
                            <form onSubmit={submitHandler}>
                                <div className="my-2 grid grid-flow-row auto-rows-max justify-center gap-4">
                                    <div>
                                        <label
                                            htmlFor="nama"
                                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            Nama
                                        </label>
                                        <input
                                            type="text"
                                            id="nama"
                                            placeholder="Nama"
                                            className="src_change w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={username}
                                            onChange={(event) => {
                                                setUsername(event.target.value);
                                            }}
                                            required
                                        />
                                        {errors.username && (
                                            <div className="text-red-600 dark:text-red-400">
                                                {errors.username}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder="Password"
                                            autoComplete=""
                                            className="src_change w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={password}
                                            onChange={(event) => {
                                                setPassword(event.target.value);
                                            }}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password2"
                                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            Konfirmasi Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password2"
                                            placeholder="Konfirmasi Password"
                                            autoComplete=""
                                            className="src_change w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={password2}
                                            onChange={(event) => {
                                                setPassword2(
                                                    event.target.value
                                                );
                                            }}
                                            required
                                        />
                                        {errors.password2 && (
                                            <div className="text-red-600 dark:text-red-400">
                                                {errors.password2}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="nama"
                                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            Size Storage (GB)
                                        </label>
                                        <input
                                            type="text"
                                            id="sizestorage"
                                            placeholder="Size Storage (GB)"
                                            className="src_change w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={size}
                                            onChange={(event) => {
                                                setsize(event.target.value);
                                            }}
                                            required
                                        />
                                        {errors.size && (
                                            <div className="text-red-600 dark:text-red-400">
                                                {errors.size}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="aktor"
                                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            Aktor
                                        </label>
                                        <select
                                            id="aktor"
                                            required
                                            className="src_change w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={role}
                                            onChange={(event) => {
                                                change_role(event.target.value);
                                            }}
                                        >
                                            <option disabled selected value>
                                                Pilih aktor
                                            </option>
                                            <option value="1">
                                                Superadmin
                                            </option>
                                            <option value="2">Dosen</option>
                                            <option value="3">
                                                Tata usaha
                                            </option>
                                        </select>
                                    </div>

                                    <div className="pt-5">
                                        <button
                                            type="submit"
                                            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-green-800"
                                        >
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </NewAuthenticated>
    );
}
