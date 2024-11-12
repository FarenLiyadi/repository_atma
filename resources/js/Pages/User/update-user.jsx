import NewAuthenticated from "@/Layouts/NewAuthenticated";
import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function updateUser({ auth }) {
    const [roles, setRoles] = useState(1);
    const [fakultas, setfakultas] = useState();
    const [prodi, setprodi] = useState();
    const [username, setUsername] = useState("");
    const [nidn, setNidn] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState({});
    const [size, setsize] = useState(0);
    const [show, setshow] = useState(false);

    function change_role(value) {
        setRoles(value);
    }
    function change_fakultas(value) {
        setfakultas(value);
    }
    function change_prodi(value) {
        setprodi(value);
    }

    const queryParams = new URLSearchParams(window.location.search);
    const itemId = queryParams.get("id") ?? auth.user.id;

    async function search() {
        const response = await getDetailUser(itemId);
        renderTableUpdateUser(response);
    }

    useEffect(() => {
        search();
    }, []);

    async function getDetailUser(itemId) {
        let parameter = {
            item_id: itemId,
        };

        try {
            const response = await axios.get("/detail-user-request", {
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
            alert(error);
            console.error("There was a problem with the Axios request:", error);
            throw error;
        }
    }

    function renderTableUpdateUser(items) {
        const data = items.item;

        setUsername(data.username);
        setNidn(data.nidn);
        setsize(data.size);
        setRoles(data.roles);
        setfakultas(data.fakultas);
        setprodi(data.prodi);
    }

    async function submitHandler(e) {
        e.preventDefault();

        let errors = {};

        if (!username.trim()) {
            errors.username = "Username harus diisi.";
        }
        if (!nidn.trim()) {
            errors.username = "NIDN.";
        }
        if (!fakultas) {
            errors.fakultas = "Harus Memilih fakultas";
        }
        if (roles == 2) {
            if (!prodi) {
                errors.prodi = "Harus Memilih prodi.";
            }
        }

        if (password) {
            if (password != password2) {
                errors.password2 =
                    "Password dan Konfirmasi Password tidak sesuai.";
            }
        }

        const queryParams = new URLSearchParams(window.location.search);
        const itemId = queryParams.get("id") ?? auth.user.id;

        if (Object.keys(errors).length === 0) {
            const data = {
                item_id: itemId,
                username: username,
                nidn: nidn,
                fakultas: fakultas,
                prodi: prodi,
                size: size,
                password: password,
                conf_password: password2,
                roles: roles,
                actor_id: auth.user.id,
            };

            console.log("Submit", data);

            try {
                const response = await axios.post("/update-user", data);
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

                window.location.href = "/dashboard";
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

    return (
        <NewAuthenticated>
            <Head title="Update User" />

            <div className="pt-5 overflow-auto">
                <div className="flex justify-between items-baseline my-auto sm:px-6 lg:px-8 space-y-6">
                    <h2 className="text-2xl font-bold">Update User</h2>

                    {/* BreadCrumb Navigation */}
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <a
                                        href="/admin/list-undangan"
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
                                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                        Update User
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
                                    {auth.user.roles == 1 && (
                                        <div className="">
                                            <div>
                                                <label
                                                    htmlFor="nidn"
                                                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                                                >
                                                    NIDN
                                                </label>
                                                <input
                                                    type="text"
                                                    id="nidn"
                                                    placeholder="NIDN"
                                                    className="src_change w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={nidn}
                                                    onChange={(event) => {
                                                        setNidn(
                                                            event.target.value
                                                        );
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
                                                    htmlFor="username"
                                                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                                                >
                                                    username
                                                </label>
                                                <input
                                                    type="text"
                                                    id="username"
                                                    placeholder="username"
                                                    className="src_change w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={username}
                                                    onChange={(event) => {
                                                        setUsername(
                                                            event.target.value
                                                        );
                                                    }}
                                                    required
                                                />
                                                {errors.username && (
                                                    <div className="text-red-600 dark:text-red-400">
                                                        {errors.username}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type={
                                                show == true
                                                    ? "text"
                                                    : "password"
                                            }
                                            id="password"
                                            placeholder="Password"
                                            autoComplete=""
                                            className="src_change w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={password}
                                            onChange={(event) => {
                                                setPassword(event.target.value);
                                            }}
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
                                            type={
                                                show == true
                                                    ? "text"
                                                    : "password"
                                            }
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
                                        />
                                        {errors.password2 && (
                                            <div className="text-red-600 dark:text-red-400">
                                                {errors.password2}
                                            </div>
                                        )}
                                    </div>
                                    <div className=" flex  ">
                                        <TextInput
                                            id="remember"
                                            type="checkbox"
                                            name="remember"
                                            checked={show}
                                            className="mt-1  w-5 h-5 border-blue-500"
                                            onChange={(e) =>
                                                setshow(e.target.checked)
                                            }
                                        />
                                        <InputLabel
                                            className="ml-2 mt-1"
                                            value="Show Password"
                                        />
                                    </div>
                                    {auth.user.roles == 1 && (
                                        <div className="">
                                            <div>
                                                <label
                                                    htmlFor="size"
                                                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                                                >
                                                    size GB
                                                </label>
                                                <input
                                                    type="text"
                                                    id="size"
                                                    placeholder="size"
                                                    className="src_change w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={size}
                                                    onChange={(event) => {
                                                        setsize(
                                                            event.target.value
                                                        );
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
                                                    htmlFor="peran"
                                                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                                                >
                                                    Aktor
                                                </label>
                                                <select
                                                    id="peran"
                                                    className="src_change w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={roles}
                                                    onChange={(event) => {
                                                        setRoles(
                                                            event.target.value
                                                        );
                                                    }}
                                                >
                                                    <option value="1">
                                                        Superadmin
                                                    </option>
                                                    <option value="2">
                                                        Dosen
                                                    </option>
                                                    <option value="3">
                                                        Tata Usaha
                                                    </option>
                                                </select>
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="fakultas"
                                                    className="block mb-2 font-medium text-gray-900 dark:text-white"
                                                >
                                                    Fakultas
                                                </label>

                                                <select
                                                    id="fakultas"
                                                    required
                                                    className="src_change w-full md:w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={fakultas}
                                                    onChange={(event) =>
                                                        change_fakultas(
                                                            event.target.value
                                                        )
                                                    }
                                                >
                                                    <option
                                                        disabled
                                                        selected
                                                        value
                                                    >
                                                        Pilih fakultas
                                                    </option>

                                                    <option value="ekonomi dan bisnis">
                                                        Ekonomi dan bisnis
                                                    </option>
                                                    <option value="teknologi informasi">
                                                        Teknologi Informasi
                                                    </option>
                                                    <option value="hukum">
                                                        Hukum
                                                    </option>
                                                    <option value="psikologi">
                                                        Psikologi
                                                    </option>
                                                    <option value="pasca sarjana">
                                                        Pasca Sarjana
                                                    </option>
                                                </select>
                                                {errors.fakultas && (
                                                    <div className="text-red-600 dark:text-red-400">
                                                        {errors.fakultas}
                                                    </div>
                                                )}
                                            </div>
                                            {roles == 2 && (
                                                <div>
                                                    <label
                                                        htmlFor="prodi"
                                                        className="block mb-2 font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Prodi
                                                    </label>
                                                    {fakultas ==
                                                        "ekonomi dan bisnis" && (
                                                        <select
                                                            id="prodi"
                                                            required
                                                            className="src_change w-full md:w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            value={prodi}
                                                            onChange={(event) =>
                                                                change_prodi(
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <option
                                                                disabled
                                                                selected
                                                                value
                                                            >
                                                                Pilih prodi
                                                            </option>

                                                            <option value="manajemen">
                                                                Manajemen
                                                            </option>
                                                            <option value="akuntansi">
                                                                Akuntansi
                                                            </option>
                                                        </select>
                                                    )}
                                                    {fakultas ==
                                                        "teknologi informasi" && (
                                                        <select
                                                            id="prodi"
                                                            required
                                                            className="src_change w-full md:w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            value={prodi}
                                                            onChange={(event) =>
                                                                change_prodi(
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <option
                                                                disabled
                                                                selected
                                                                value
                                                            >
                                                                Pilih prodi
                                                            </option>

                                                            <option value="teknik informatika">
                                                                Teknik
                                                                Informatika
                                                            </option>
                                                            <option value="sistem informasi">
                                                                Sistem informasi
                                                            </option>
                                                        </select>
                                                    )}
                                                    {fakultas == "hukum" && (
                                                        <select
                                                            id="prodi"
                                                            required
                                                            className="src_change w-full md:w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            value={prodi}
                                                            onChange={(event) =>
                                                                change_prodi(
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <option
                                                                disabled
                                                                selected
                                                                value
                                                            >
                                                                Pilih prodi
                                                            </option>

                                                            <option value="ilmu hukum">
                                                                Ilmu Hukum
                                                            </option>
                                                        </select>
                                                    )}
                                                    {fakultas == "teknik" && (
                                                        <select
                                                            id="prodi"
                                                            required
                                                            className="src_change w-full md:w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            value={prodi}
                                                            onChange={(event) =>
                                                                change_prodi(
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <option
                                                                disabled
                                                                selected
                                                                value
                                                            >
                                                                Pilih prodi
                                                            </option>

                                                            <option value="teknik mesin">
                                                                Teknik Mesin
                                                            </option>
                                                            <option value="teknik elektro">
                                                                Teknik Elektro
                                                            </option>
                                                            <option value="teknik sipil">
                                                                Teknik Sipil
                                                            </option>
                                                            <option value="psikologi">
                                                                Teknik Elektro
                                                            </option>
                                                        </select>
                                                    )}
                                                    {fakultas ==
                                                        "pasca sarjana" && (
                                                        <select
                                                            id="prodi"
                                                            required
                                                            className="src_change w-full md:w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            value={prodi}
                                                            onChange={(event) =>
                                                                change_prodi(
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <option
                                                                disabled
                                                                selected
                                                                value
                                                            >
                                                                Pilih prodi
                                                            </option>

                                                            <option value="magister akuntansi">
                                                                Magister
                                                                Akuntansi
                                                            </option>
                                                        </select>
                                                    )}
                                                    {fakultas ==
                                                        "psikologi" && (
                                                        <select
                                                            id="prodi"
                                                            required
                                                            className="src_change w-full md:w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            value={prodi}
                                                            onChange={(event) =>
                                                                change_prodi(
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <option
                                                                disabled
                                                                selected
                                                                value
                                                            >
                                                                Pilih prodi
                                                            </option>

                                                            <option value="psikolgi">
                                                                psikologi
                                                            </option>
                                                        </select>
                                                    )}

                                                    {errors.prodi && (
                                                        <div className="text-red-600 dark:text-red-400">
                                                            {errors.prodi}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="pt-5">
                                        <button
                                            type="submit"
                                            className="text-white w-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                                        >
                                            Update
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
