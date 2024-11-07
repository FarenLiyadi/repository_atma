import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import Pagination from "@/Components/Pagination";
import NewAuthenticated from "@/Layouts/NewAuthenticated";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "@/Components/Dropdown";

export default function listDeleted({ auth }) {
    const [page, setPage] = useState(1);
    const [length, setLength] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [role, setRole] = useState(0);
    const [jenisdata, setjenisdata] = useState(0);
    const [tahun, setTahun] = useState("");
    const [username, setUsername] = useState("");
    const [judul, setjudul] = useState("");
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
    }, [judul, username, role, length, page, tahun, jenisdata]);

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

    async function getListUser(page = 1, length = 10, username, role, tahun) {
        let parameter = {
            page: page,
            length: length,
            username: username,
            roles: role,
            tahun: tahun,
            jenisdata: jenisdata,
            judul: judul,
        };
        console.log(parameter);
        try {
            const response = await axios.get("/list-deleted-request", {
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
            <Head title="Pengabdian" />

            <div className="py-5">
                <div className="mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex flex-col p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <h1 className="md:text-right text-center text-3xl font-bold">
                            Data terhapus
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
                                        Judul
                                    </label>
                                    <input
                                        type="text"
                                        id="nama"
                                        placeholder="Judul"
                                        className="src_change capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(username) => {
                                            setUsername(username.target.value);
                                            setPage(1);
                                        }}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="nama"
                                        className="block mb-2 font-medium text-gray-900 dark:text-dark"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="nama"
                                        placeholder="paste username dari daftar user"
                                        className="src_change capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(judul) => {
                                            setjudul(judul.target.value);
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
                                        <option value="3">Pendek</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="aktor"
                                        className="block mb-2 font-medium text-gray-900 dark:text-dark"
                                    >
                                        Jenis data
                                    </label>
                                    <select
                                        id="aktor"
                                        className="src_change bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(jenisdata) => {
                                            setjenisdata(
                                                jenisdata.target.value
                                            );
                                            setPage(1);
                                        }}
                                    >
                                        <option value="">
                                            Pilih Jenis Data
                                        </option>
                                        <option value="1">Pengabdian</option>
                                        <option value="2">Penelitian</option>
                                        <option value="3">Penunjang</option>
                                        <option value="4">Pribadi</option>
                                        <option value="5">Pengajaran</option>
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
                            List file terhapus
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
                                            Judul
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
                                            Tgl. deleted
                                        </th>
                                        <th className="border border-slate-600 text-xl py-2">
                                            Del. By
                                        </th>
                                        <th className="border border-slate-600 text-xl py-2">
                                            Jenis data
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
                                                    {user.tahun_data ?? "-"}
                                                </td>
                                                <td className="text-center border border-slate-700 px-3">
                                                    {user.semester == 1
                                                        ? "Awal"
                                                        : ""}
                                                    {user.semester == 2
                                                        ? "Akhir"
                                                        : ""}
                                                    {user.semester == 3
                                                        ? "Pendek"
                                                        : ""}
                                                    {user.semester ? "" : "-"}
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
                                                <td className="text-center border border-slate-700 px-3">
                                                    {new Date(
                                                        user.deleted_at
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "2-digit",
                                                            month: "long",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </td>
                                                <td className="text-center border border-slate-700 px-3">
                                                    {user.deleted_by.username}
                                                </td>
                                                <td className="text-center border border-slate-700">
                                                    <td className="text-center">
                                                        {user.link_pengabdian
                                                            ? "Pengabdian"
                                                            : ""}
                                                        {user.link_pribadi
                                                            ? "Pribadi"
                                                            : ""}
                                                        {user.link_penelitian
                                                            ? "Penelitian"
                                                            : ""}
                                                        {user.link_penunjang
                                                            ? "Penunjang"
                                                            : ""}
                                                        {user.link_pengajaran
                                                            ? "Pengajaran"
                                                            : ""}
                                                    </td>
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
