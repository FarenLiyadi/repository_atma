import NewAuthenticated from "@/Layouts/NewAuthenticated";
import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { toast } from "react-toastify";

export default function UploadData({ auth }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const maxSize = auth.user.upload_size * 1024 * 1024;
            console.log(maxSize);
            console.log(file.size);

            if (file.size > maxSize) {
                alert("Ukuran file tidak boleh melebihi batas maksimal.");
                event.target.value = ""; // reset input
                return;
            }

            setSelectedFile(event.target.files[0]);
        }
    };

    const [judul_data, setjudul_data] = useState("");
    const [tahun_data, settahun_data] = useState("");
    const [semester, setsemester] = useState(null);
    const [jenisdata, setjenisdata] = useState(null);
    // const [fakultas, setfakultas] = useState(null);
    // const [prodi, setprodi] = useState(null);
    const [permission, setpermission] = useState(null);
    const [loading, setisloading] = useState(false);
    const [errors, setErrors] = useState({});

    function change_semester(value) {
        setsemester(value);
    }
    function change_jenisdata(value) {
        setjenisdata(value);
    }
    function change_fakultas(value) {
        setfakultas(value);
    }
    function change_prodi(value) {
        setprodi(value);
    }
    function change_permission(value) {
        setpermission(value);
    }

    async function submitHandler(e) {
        e.preventDefault();
        setisloading(true);
        let errors = {};
        if (!jenisdata) {
            errors.jenisdata = "Harus Memilih jenis data.";
        }
        if (!judul_data.trim()) {
            errors.judul_data = "Judul data harus diisi.";
        }
        if (!tahun_data.trim()) {
            errors.tahun_data = "Tahun data harus diisi.";
        }
        if (!semester) {
            errors.semester = "Harus Memilih semester.";
        }
        // if (selectedFile.size > 10 * 1024 * 1024) {
        //     errors.selectedFile = "Ukuran file tidak boleh melebihi 10 MB.";
        // }

        if (Object.keys(errors).length === 0) {
            const isValidTahunData = /^(\d{4})\/(\d{4})$/.test(tahun_data);
            if (!isValidTahunData) {
                alert("Format tahun harus seperti 2023/2024");
                return;
            }

            const formData = new FormData();
            formData.append("judul_data", judul_data);
            formData.append("tahun_data", tahun_data);
            formData.append("semester", semester);
            formData.append("jenis_data", jenisdata);
            formData.append("fakultas", auth.user.fakultas);
            formData.append("prodi", auth.user.prodi);
            formData.append("permission", permission);
            formData.append("file", selectedFile);

            const controller = new AbortController(); // 🛑 Buat controller
            const timeoutId = setTimeout(() => {
                controller.abort(); // Batalkan upload

                toast.error(
                    "⏱️ Upload dibatalkan karena melebihi waktu 1 menit",
                    {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                        draggable: true,
                        theme: "light",
                    }
                );
                setisloading(false);
                return;
            }, 60 * 1000); // 60 detik

            try {
                const response = await axios.post("/upload-data", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    signal: controller.signal, // 🔌 Hubungkan dengan axios
                });

                clearTimeout(timeoutId); // ✅ Clear timeout kalau berhasil

                if (response.data.code !== 0) {
                    toast.error(response.data.msg, {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                        draggable: true,
                        theme: "light",
                    });
                    setisloading(false);
                    return;
                }

                localStorage.setItem(
                    "notif",
                    JSON.stringify({
                        type: "success",
                        msg: response.data.msg,
                    })
                );

                window.location.href = "/dashboard";
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log(
                        "❌ Upload dibatalkan secara otomatis setelah 1 menit."
                    );
                    setisloading(false);
                } else {
                    toast.error("Something Went Wrong!", {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                        draggable: true,
                        theme: "light",
                    });
                    setisloading(false);
                }
            }
        } else {
            setErrors(errors);
            setisloading(false);
        }
    }
    const generateTahunAjaran = () => {
        const start = 2007;
        const end = 2025;
        const list = [];
        for (let i = start; i <= end; i++) {
            list.push(`${i}/${i + 1}`);
        }
        return list;
    };
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
                        <div>
                            <form onSubmit={submitHandler}>
                                <div className="my-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="jenisdata"
                                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            Jenis Data
                                        </label>
                                        {auth.user.roles === 2 ? (
                                            <select
                                                id="jenisdata"
                                                required
                                                className="src_change w-full md:w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                value={jenisdata}
                                                onChange={(event) =>
                                                    change_jenisdata(
                                                        event.target.value
                                                    )
                                                }
                                            >
                                                <option disabled selected value>
                                                    Pilih jenis data
                                                </option>
                                                <option value="5">
                                                    Pendidikan & Pengajaran
                                                </option>
                                                <option value="2">
                                                    Penelitian
                                                </option>
                                                <option value="1">
                                                    Pengabdian
                                                </option>

                                                <option value="3">
                                                    Penunjang
                                                </option>
                                                <option value="4">
                                                    Pribadi
                                                </option>
                                            </select>
                                        ) : (
                                            <select
                                                id="jenisdata"
                                                required
                                                className="src_change w-full md:w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                value={jenisdata}
                                                onChange={(event) =>
                                                    change_jenisdata(
                                                        event.target.value
                                                    )
                                                }
                                            >
                                                <option disabled selected value>
                                                    Pilih jenis data
                                                </option>

                                                <option value="4">
                                                    Pribadi
                                                </option>
                                            </select>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="judul_data"
                                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            {jenisdata == 5
                                                ? "Aktivitas"
                                                : "Judul Data"}
                                        </label>
                                        <input
                                            type="text"
                                            id="judul_data"
                                            placeholder={
                                                jenisdata == 5
                                                    ? "Aktivitas"
                                                    : "Judul Data"
                                            }
                                            className="src_change w-full md:w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={judul_data}
                                            onChange={(event) =>
                                                setjudul_data(
                                                    event.target.value
                                                )
                                            }
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
                                            htmlFor="tahun_data"
                                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            Tahun Data
                                        </label>
                                        <select
                                            id="tahun_data"
                                            className="src_change w-full md:w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={tahun_data}
                                            onChange={(event) =>
                                                settahun_data(
                                                    event.target.value
                                                )
                                            }
                                            required
                                        >
                                            <option value="">
                                                Pilih Tahun
                                            </option>
                                            {generateTahunAjaran().map(
                                                (tahun) => (
                                                    <option
                                                        key={tahun}
                                                        value={tahun}
                                                    >
                                                        {tahun}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="semester"
                                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            Semester
                                        </label>
                                        <select
                                            id="semester"
                                            required
                                            className="src_change w-full md:w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={semester}
                                            onChange={(event) =>
                                                change_semester(
                                                    event.target.value
                                                )
                                            }
                                        >
                                            <option disabled selected value>
                                                Pilih semester
                                            </option>
                                            <option value="1">Awal</option>
                                            <option value="2">Akhir</option>
                                        </select>
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
                                            className="src_change w-full md:w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={permission}
                                            onChange={(event) =>
                                                change_permission(
                                                    event.target.value
                                                )
                                            }
                                        >
                                            <option disabled selected value>
                                                Choose permission
                                            </option>
                                            <option value="1">Show</option>
                                            <option value="2">Hide</option>
                                        </select>
                                    </div>

                                    <div>
                                        <div className=" flex ">
                                            <label
                                                htmlFor="selectedFile"
                                                className="block mb-2 font-medium text-gray-900 dark:text-white"
                                            >
                                                File yang akan di upload{" "}
                                            </label>
                                            <div className="text-red-600 pl-2 text-xs dark:text-red-400">
                                                *MAX SIZE FILE{" "}
                                                {auth.user.upload_size} MB
                                            </div>
                                        </div>

                                        <input
                                            type="file"
                                            id="selectedFile"
                                            className="src_change w-full md:w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            onChange={handleFileChange}
                                            required
                                        />

                                        {errors.selectedFile && (
                                            <div className="text-red-600 dark:text-red-400">
                                                {errors.selectedFile}
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-5 w-full md:col-span-2">
                                        <button
                                            disabled={setisloading}
                                            type="submit"
                                            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                        >
                                            {loading
                                                ? "progres"
                                                : "Upload Data"}
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

// <div>
// <label
//     htmlFor="fakultas"
//     className="block mb-2 font-medium text-gray-900 dark:text-white"
// >
//     Fakultas
// </label>

// <select
//     id="fakultas"
//     required
//     className="src_change w-full md:w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//     value={fakultas}
//     onChange={(event) =>
//         change_fakultas(
//             event.target.value
//         )
//     }
// >
//     <option disabled selected value>
//         Pilih fakultas
//     </option>

//     <option value="ekonomi dan bisnis">
//         Ekonomi dan bisnis
//     </option>
//     <option value="teknologi informasi">
//         Teknologi Informasi
//     </option>
//     <option value="hukum">Hukum</option>
//     <option value="psikologi">
//         Psikologi
//     </option>
//     <option value="pasca sarjana">
//         Pasca Sarjana
//     </option>
// </select>
// {errors.fakultas && (
//     <div className="text-red-600 dark:text-red-400">
//         {errors.fakultas}
//     </div>
// )}
// </div>
// {auth.user.roles === 2 ? (
// <div>
//     <label
//         htmlFor="prodi"
//         className="block mb-2 font-medium text-gray-900 dark:text-white"
//     >
//         Prodi
//     </label>
//     <select
//         id="prodi"
//         required
//         className="src_change w-full md:w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         value={prodi}
//         onChange={(event) =>
//             change_prodi(
//                 event.target.value
//             )
//         }
//     >
//         <option disabled selected value>
//             Pilih prodi
//         </option>

//         <option value="manajemen">
//             Manajemen
//         </option>
//         <option value="akuntansi">
//             Akuntansi
//         </option>
//         <option value="teknik informatika">
//             Teknik Informatika
//         </option>
//         <option value="sistem informasi">
//             Sistem informasi
//         </option>
//         <option value="ilmu hukum">
//             Ilmu Hukum
//         </option>
//         <option value="teknik mesin">
//             Teknik Mesin
//         </option>
//         <option value="teknik elektro">
//             Teknik Elektro
//         </option>
//         <option value="teknik sipil">
//             Teknik Sipil
//         </option>
//         <option value="psikologi">
//             Teknik Elektro
//         </option>
//         <option value="magister akuntansi">
//             Magister Akuntansi
//         </option>
//     </select>
//     {errors.prodi && (
//         <div className="text-red-600 dark:text-red-400">
//             {errors.prodi}
//         </div>
//     )}
// </div>
// ) : (
// ""
// )}
