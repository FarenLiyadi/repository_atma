import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import Pagination from "@/Components/Pagination";
import NewAuthenticated from "@/Layouts/NewAuthenticated";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "@/Components/Dropdown";

export default function listpengajaran({ auth }) {
    const [page, setPage] = useState(1);
    const [length, setLength] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [role, setRole] = useState(0);
    const [tahun, setTahun] = useState("");
    const [username, setUsername] = useState("");
    const [dataListUser, setDataListUser] = useState({
        item: [],
        total: 0,
    });
    const [counter, setCounter] = useState(1);

    async function search() {
        const response = await getListUser(page, length, username, role, tahun);

        setCounter((page - 1) * length + 1);
        setTotalPages(Math.ceil(response.total / length));
        setDataListUser(response);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                search();
            } catch (error) {
                toast.error(error, {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                    theme: "light",
                });
                console.error(error);
            }
        };

        fetchData();
    }, [username, role, length, page, tahun]);

    function handleChangeLength() {
        let selectedLength = document.getElementById("src_length").value;
        setPage(1);
        setLength(parseInt(selectedLength));
    }

    function prevBtn() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function nextBtn() {
        if (page < totalPages) {
            setPage(page + 1);
        }
    }
    const handleCopyClick = (item) => {
        navigator.clipboard
            .writeText(item)
            .then(() => {
                alert("Text copied successfully!");
            })
            .catch((err) => {
                alert("Failed to copy text");
            });
    };

    async function deletePengabdian(e, id) {
        e.preventDefault();
        if (confirm("Hapus Pengajaran?")) {
            const data = {
                actor_id: auth.user.id,
                item_id: id,
            };

            try {
                const response = await axios.post("/delete-pengajaran", data);
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
                // Untuk Nofitikasi
                toast.success(response.data.msg, {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                    theme: "light",
                });
                // Reload Data
                search();
            } catch (error) {
                toast.error(error, {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                    theme: "light",
                });
                console.error(
                    "There was a problem with the Axios request:",
                    error
                );
                throw error;
            }
        }
    }
    async function updatePengabdian(e, id) {
        e.preventDefault();
        if (confirm("update permission Pengajaran?")) {
            const data = {
                actor_id: auth.user.id,
                item_id: id,
            };

            try {
                const response = await axios.post("/update-pengajaran", data);
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
                // Untuk Nofitikasi
                toast.success(response.data.msg, {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                    theme: "light",
                });
                // Reload Data
                search();
            } catch (error) {
                toast.error(error, {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                    theme: "light",
                });
                console.error(
                    "There was a problem with the Axios request:",
                    error
                );
                throw error;
            }
        }
    }

    async function getListUser(page = 1, length = 10, username, role, tahun) {
        let parameter = {
            page: page,
            length: length,
            username: username,
            roles: role,
            tahun: tahun,
        };
        // console.log(parameter);
        try {
            const response = await axios.get("/list-pengajaran-request", {
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
            console.log(response.data.data);
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

    return (
        <NewAuthenticated>
            <Head title="Pengajaran" />

            <div className="py-5">
                <div className="mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex flex-col p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <h1 className="md:text-right text-center text-3xl font-bold">
                            Data Pengajaran
                        </h1>
                        <div className="">
                            <label className="text-dark font-bold text-2xl">
                                Pencarian
                            </label>
                            <div className="my-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label
                                        htmlFor="nama"
                                        className="block mb-2 font-medium text-gray-900 dark:text-dark"
                                    >
                                        Aktivitas
                                    </label>
                                    <input
                                        type="text"
                                        id="nama"
                                        placeholder="aktivitas"
                                        className="src_change capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(username) => {
                                            setUsername(username.target.value);
                                            setPage(1);
                                        }}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="tahun"
                                        className="block mb-2 font-medium text-gray-900 dark:text-dark"
                                    >
                                        Tahun
                                    </label>
                                    <input
                                        type="text"
                                        id="tahun"
                                        placeholder="tahun"
                                        className="src_change capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) => {
                                            setTahun(e.target.value);
                                            setPage(1);
                                        }}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="aktor"
                                        className="block mb-2 font-medium text-gray-900 dark:text-dark"
                                    >
                                        Semester
                                    </label>
                                    <select
                                        id="aktor"
                                        className="src_change bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(role) => {
                                            setRole(role.target.value);
                                            setPage(1);
                                        }}
                                    >
                                        <option value="">Pilih Semester</option>
                                        <option value="1">Awal</option>
                                        <option value="2">Akhir</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-5">
                <div className="mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <h2 className="text-3xl text-dark font-extrabold">
                            Daftar pengajaran
                        </h2>
                        <div className="pt-4 w-full ">
                            <table className="table-auto text-dark w-full border-collapse border border-slate-500">
                                <thead>
                                    <tr>
                                        <th className="border border-slate-600 text-xl py-2">
                                            #
                                        </th>
                                        <th className="border border-slate-600 text-xl py-2">
                                            Username
                                        </th>
                                        <th className="border border-slate-600 text-xl py-2">
                                            Aktivitas
                                        </th>
                                        <th className="border border-slate-600 text-xl py-2">
                                            Tahun
                                        </th>
                                        <th className="border border-slate-600 text-xl py-2">
                                            Semester
                                        </th>
                                        <th className="border border-slate-600 text-xl py-2">
                                            Permission
                                        </th>
                                        <th className="border border-slate-600 text-xl py-2">
                                            Tgl. dibuat
                                        </th>
                                        <th className="border border-slate-600 text-xl py-2">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="table-body">
                                    {dataListUser.total === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="text-center font-bold text-2xl p-2"
                                            >
                                                No Data Found
                                            </td>
                                        </tr>
                                    ) : (
                                        dataListUser.item.map((user, index) => (
                                            <tr key={index}>
                                                <td className="text-center border border-slate-600 py-2">
                                                    {counter + index}
                                                </td>
                                                <td className="text-start border border-slate-700 px-3">
                                                    {user.user.username}
                                                </td>
                                                <td className="text-start border border-slate-700 px-3">
                                                    {user.judul_data}
                                                </td>
                                                <td className="text-center border border-slate-700 px-3">
                                                    {user.tahun_data}
                                                </td>
                                                <td className="text-center border border-slate-700 px-3">
                                                    {user.semester == 1
                                                        ? "Awal"
                                                        : user.semester == 2
                                                        ? "Akhir"
                                                        : "Pendek"}
                                                </td>
                                                <td className="text-center border border-slate-700 px-3">
                                                    {user.permission == 1
                                                        ? "Show"
                                                        : "Hide"}
                                                </td>
                                                <td className="text-center border border-slate-700 px-3">
                                                    {new Date(
                                                        user.created_at
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "2-digit",
                                                            month: "long",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </td>
                                                <td className="text-center border border-slate-700">
                                                    <div className="">
                                                        <Dropdown className="relative">
                                                            <Dropdown.Trigger>
                                                                <span className="inline-flex rounded-md">
                                                                    <button
                                                                        type="button"
                                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-gray-800 hover:text-gray-200 dark:text-gray-400 dark:bg-gray-800 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                                                    >
                                                                        Aksi
                                                                        <svg
                                                                            className="ml-2 h-4 w-4"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 20 20"
                                                                            fill="currentColor"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                </span>
                                                            </Dropdown.Trigger>

                                                            <Dropdown.Content>
                                                                <div className="relative z-50">
                                                                    {user.user_id ==
                                                                        auth
                                                                            .user
                                                                            .id && (
                                                                        <p
                                                                            onClick={(
                                                                                event
                                                                            ) =>
                                                                                updatePengabdian(
                                                                                    event,
                                                                                    user.id
                                                                                )
                                                                            }
                                                                            className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
                                                                        >
                                                                            {`Change to ${
                                                                                user.permission ===
                                                                                1
                                                                                    ? "Hide"
                                                                                    : "Show"
                                                                            }`}
                                                                        </p>
                                                                    )}

                                                                    <a
                                                                        href={`file/${user.id}`}
                                                                        className="cursor-pointer block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
                                                                    >
                                                                        Download
                                                                    </a>
                                                                    {user.permission ===
                                                                        1 && (
                                                                        <p
                                                                            onClick={() =>
                                                                                handleCopyClick(
                                                                                    `127.0.0.1:8000/file/${user.id}`
                                                                                )
                                                                            }
                                                                            className="cursor-pointer block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
                                                                        >
                                                                            Share
                                                                        </p>
                                                                    )}
                                                                    {user.user_id ==
                                                                        auth
                                                                            .user
                                                                            .id && (
                                                                        <p
                                                                            onClick={(
                                                                                event
                                                                            ) =>
                                                                                deletePengabdian(
                                                                                    event,
                                                                                    user.id
                                                                                )
                                                                            }
                                                                            className="cursor-pointer block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
                                                                        >
                                                                            Delete
                                                                        </p>
                                                                    )}
                                                                    {auth.user
                                                                        .roles ==
                                                                        1 && (
                                                                        <p
                                                                            onClick={(
                                                                                event
                                                                            ) =>
                                                                                deletePengabdian(
                                                                                    event,
                                                                                    user.id
                                                                                )
                                                                            }
                                                                            className="cursor-pointer block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
                                                                        >
                                                                            Delete
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </Dropdown.Content>
                                                        </Dropdown>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            onChange={handleChangeLength}
                            prevBtn={prevBtn}
                            nextBtn={nextBtn}
                            isPrevDisabled={page == 1}
                            isNextDisabled={page == totalPages}
                            page={page}
                            totalPage={totalPages}
                        />
                    </div>
                </div>
            </div>
        </NewAuthenticated>
    );
}
