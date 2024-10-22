import NewAuthenticated from "@/Layouts/NewAuthenticated";
import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { toast } from "react-toastify";

export default function UploadData({ auth }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const [judul_data, setjudul_data] = useState("");
    const [tahun_data, settahun_data] = useState("");
    const [semester, setsemester] = useState(null);
    const [jenisdata, setjenisdata] = useState(null);
    const [permission, setpermission] = useState(null);
    const [errors, setErrors] = useState({});

    function change_jenisdata(value) {
        setjenisdata(value);
    }
    function change_permission(value) {
        setpermission(value);
    }

    async function submitHandler(e) {
        e.preventDefault();

        let errors = {};
        if (!judul_data) {
            errors.judul_data = "Harus mengisi judul data.";
        }
        if (!jenisdata) {
            errors.jenisdata = "Harus Memilih jenis data.";
        }
        if (!permission) {
            errors.permission = "Harus Memilih permission data.";
        }
        if (selectedFile.size > 10 * 1024 * 1024) {
            // File size > 10MB
            errors.selectedFile = "Ukuran file tidak boleh melebihi 10 MB.";
        }

        if (Object.keys(errors).length === 0) {
            // const data = {
            //     judul_data: judul_data,
            //     tahun_data: tahun_data,
            //     semester: semester,
            //     jenis_data: jenisdata,
            //     selected_file: selectedFile,
            // };
            const formData = new FormData();
            formData.append("judul_data", judul_data);
            formData.append("tahun_data", tahun_data);
            formData.append("semester", semester);
            formData.append("jenis_data", jenisdata);
            formData.append("permission", permission);
            formData.append("file", selectedFile);

            console.log("Submit", formData);

            try {
                const response = await axios.post("/upload-data", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
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
            <Head title="Upload Data" />

            <div className="pt-5 overflow-auto">
                <div className="flex justify-between items-baseline my-auto sm:px-6 lg:px-8 space-y-6">
                    <h2 className="text-2xl font-bold">Upload Data</h2>

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
                                        Upload data
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
                        <div className="">
                            <p className="font-bold text-xl text-red-900">
                                NOTED :
                            </p>
                            <ul className="uppercase text-red-900 list-disc list-inside">
                                <li>
                                    data pribadi format file harus
                                    JPG/DOCS/XLSX/CSV/PDF{" "}
                                </li>
                                <li>Max size per file hanya 10 Mb</li>
                            </ul>
                        </div>
                        <div>
                            <form onSubmit={submitHandler}>
                                <div className="my-2 grid grid-flow-row auto-rows-max justify-center gap-4">
                                    <div>
                                        <label
                                            htmlFor="jenisdata"
                                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            jenis data
                                        </label>
                                        <select
                                            id="jenisdata"
                                            required
                                            className="src_change w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={jenisdata}
                                            onChange={(event) => {
                                                change_jenisdata(
                                                    event.target.value
                                                );
                                            }}
                                        >
                                            <option disabled selected value>
                                                Pilih jenis data
                                            </option>
                                            <option value="4">Pribadi</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="judul_data"
                                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            judul data
                                        </label>
                                        <input
                                            type="text"
                                            id="judul_data"
                                            placeholder="judul data"
                                            className="src_change w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={judul_data}
                                            onChange={(event) => {
                                                setjudul_data(
                                                    event.target.value
                                                );
                                            }}
                                            required
                                        />
                                        {errors.judul_data && (
                                            <div className="text-red-600 dark:text-red-400">
                                                {errors.judul_data}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="show"
                                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            Show
                                        </label>
                                        <select
                                            id="show"
                                            required
                                            className="src_change w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={permission}
                                            onChange={(event) => {
                                                change_permission(
                                                    event.target.value
                                                );
                                            }}
                                        >
                                            <option disabled selected value>
                                                choose permission
                                            </option>
                                            <option value="1">Show</option>
                                            <option value="2">Hide</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="selectedFile"
                                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            File yang akan di upload
                                        </label>
                                        <input
                                            type="file"
                                            id="selectedFile"
                                            placeholder="selectedFile"
                                            className="src_change w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            onChange={handleFileChange}
                                            required
                                        />
                                        {errors.selectedFile && (
                                            <div className="text-red-600 dark:text-red-400">
                                                {errors.selectedFile}
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-5">
                                        <button
                                            type="submit"
                                            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-green-800"
                                        >
                                            Upload Data
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
