import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import NewAuthenticated from "@/Layouts/NewAuthenticated";
import { toast } from "react-toastify";

export default function updateVisitor({ auth, detailPenelitian, people }) {
    // console.log(people);

    const [undangan, setUndangan] = useState(people);
    const [kode_sandi, setkode_sandi] = useState(detailPenelitian.kode_sandi);
    const [percobaan, setpercobaan] = useState(detailPenelitian.percobaan);
    const [guest_mode, setguest_mode] = useState(detailPenelitian.guest_mode);
    const [errors, setErrors] = useState({});

    const [todos, setTodos] = useState(JSON.parse(detailPenelitian.visitor));

    const handleTodoChange = (e, i) => {
        e.preventDefault;

        const winner = undangan.filter((item) => item.id === e.target.value);
        // console.log("yes", winner);

        const exists = todos.some((item) => item.nidn == winner[0].nidn);
        if (exists) {
            return alert("user sudah ada!");
        }

        const field = e.target.name;
        const newTodos = [...todos];
        newTodos[i][field] = winner[0].username;
        newTodos[i]["nidn"] = winner[0].nidn ?? "";
        newTodos[i]["id"] = winner[0].id ?? "";
        console.log(newTodos);

        setTodos(newTodos);
    };

    const handleAddTodo = () => {
        let error = {};
        if (todos.length == undangan.length) {
            return alert("user sudah maximal");
        }

        setTodos([...todos, { username: "", nidn: "" }]);
        setErrors(error);
    };

    const handleDeleteTodo = (i) => {
        const isConfirmed = window.confirm(
            "Anda yakin ingin menghapus visitor ini?"
        );
        if (isConfirmed) {
            const newTodos = [...todos];
            newTodos.splice(i, 1);
            setTodos(newTodos);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(todos);
        setTodos([]);
    };

    const path = window.location.pathname;
    const parts = path.split("/");
    const itemId = parts[2];
    // console.log(itemId);

    async function submitHandler(e) {
        e.preventDefault();

        let errors = {};

        if (Object.keys(errors).length === 0) {
            const data = {
                item_id: itemId,
                visitor: JSON.stringify(todos),
                percobaan: percobaan ?? 0,
                kode_sandi: kode_sandi,
                guest_mode: guest_mode,
            };

            try {
                console.log(data);
                const response = await axios.post(
                    "/update-pengajaran-visitor",
                    data
                );
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
                // Untuk Nofitikasi
                localStorage.setItem(
                    "notif",
                    JSON.stringify({
                        type: "success",
                        msg: response.data.msg,
                    })
                );
                window.location.href = `/list-pengajaran`;
            } catch (error) {
                toast.error(error, {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                    theme: "light",
                });
                throw error;
            }
        } else {
            setErrors(errors);
        }
    }

    return (
        <NewAuthenticated>
            <Head title="Update Visitor" />

            <div className="pt-5 overflow-auto">
                <div className="flex justify-between items-baseline my-auto sm:px-6 lg:px-8 space-y-6">
                    <h2 className="text-2xl font-bold">Update Visitor</h2>
                </div>
            </div>

            <div className="py-5">
                <div className="mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div>
                            <form onSubmit={submitHandler}>
                                <div className="my-2 grid grid-cols-2 justify-center gap-4">
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="nama_hadiah"
                                            className="capitalize block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            Judul :{" "}
                                            {detailPenelitian.judul_data}
                                        </label>
                                    </div>
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="nama_hadiah"
                                            className="capitalize block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            Tahun :{" "}
                                            {detailPenelitian.tahun_data}
                                        </label>
                                    </div>
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="nama_hadiah"
                                            className="capitalize block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            Semester :{" "}
                                            {detailPenelitian.semester == 1
                                                ? "Awal"
                                                : "Akhir"}
                                        </label>
                                    </div>
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="nama_hadiah"
                                            className="capitalize block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            Permission :{" "}
                                            {detailPenelitian.permission == 2
                                                ? "Hide"
                                                : "Publik"}
                                        </label>
                                    </div>
                                    <div className="">
                                        <label
                                            htmlFor="judul_data"
                                            className="block mb-2 font-medium text-gray-900 dark:text-white"
                                        >
                                            Sharing tamu
                                        </label>
                                        <select
                                            className="rounded-lg"
                                            name=""
                                            id=""
                                            defaultValue={guest_mode}
                                            onChange={(e) =>
                                                setguest_mode(e.target.value)
                                            }
                                        >
                                            <option value={1}>On</option>
                                            <option value={0}>Off</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2 flex">
                                        <div className="w-full">
                                            <label
                                                htmlFor="kode_sandi"
                                                className="block mb-2 font-medium text-gray-900 dark:text-white"
                                            >
                                                Kode Sandi
                                            </label>
                                            <input
                                                type="text"
                                                id="kode_sandi"
                                                placeholder={"kode sandi"}
                                                className="src_change w-full md:w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                value={kode_sandi}
                                                onChange={(event) =>
                                                    setkode_sandi(
                                                        event.target.value
                                                    )
                                                }
                                                required={guest_mode}
                                            />
                                            {errors.kode_sandi && (
                                                <div className="text-red-600 dark:text-red-400">
                                                    {errors.kode_sandi}
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-full">
                                            <label
                                                htmlFor="judul_data"
                                                className="block mb-2 font-medium text-gray-900 dark:text-white"
                                            >
                                                Jumlah percobaan
                                            </label>
                                            <input
                                                type="number"
                                                id="percobaan"
                                                placeholder={0}
                                                className="src_change w-full md:w-96 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                value={percobaan}
                                                onChange={(event) =>
                                                    setpercobaan(
                                                        event.target.value
                                                    )
                                                }
                                                required
                                            />
                                            {errors.percobaan && (
                                                <div className="text-red-600 dark:text-red-400">
                                                    {errors.percobaan}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {todos.map((todo, index) => (
                                        <div
                                            key={index}
                                            className="col-span-2 flex"
                                        >
                                            <div className="w-full">
                                                <label
                                                    htmlFor="username"
                                                    className="capitalize block mb-2 font-medium text-gray-900 dark:text-white"
                                                >
                                                    People {index + 1}
                                                </label>
                                                <select
                                                    value={todo.id ?? ""}
                                                    className="w-full  bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    name="username"
                                                    onChange={(e) =>
                                                        handleTodoChange(
                                                            e,
                                                            index
                                                        )
                                                    }
                                                    required
                                                >
                                                    <option disabled value="">
                                                        Add People
                                                    </option>
                                                    {undangan.map(
                                                        (e, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={e.id}
                                                                >
                                                                    {e.username}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                            </div>
                                            <div className="ml-2 flex w-full">
                                                <div className="w-full">
                                                    <label
                                                        htmlFor="nama"
                                                        className="capitalize block mb-2 font-medium text-gray-900 dark:text-white"
                                                    >
                                                        NIDN
                                                    </label>
                                                    <input
                                                        type="text"
                                                        disabled
                                                        placeholder="NIDN"
                                                        name="nidn"
                                                        value={todo.nidn}
                                                        className="src_change w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
                                                        onChange={(e) =>
                                                            handleTodoChange(
                                                                e,
                                                                index
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>

                                                <div
                                                    className="  ml-2 px-2 rounded-lg text-black"
                                                    onClick={() =>
                                                        handleDeleteTodo(index)
                                                    }
                                                >
                                                    X
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div
                                        className="bg-blue-400 w-1/2 text-center text-white p-2 mt-4 rounded-lg"
                                        onClick={handleAddTodo}
                                    >
                                        + People
                                    </div>

                                    {errors.todos && (
                                        <div className="text-red-600 dark:text-red-400">
                                            {errors.todos}
                                        </div>
                                    )}
                                    <div className="pt-5 col-span-2">
                                        <button
                                            type="submit"
                                            className="w-full capitalize text-white dark:text-blue-400 bg-blue-800 dark:bg-blue-800 hover:text-blue-200 dark:hover:text-blue-300 focus:outline-none transition ease-in-out duration-150 font-bold py-2 px-4 rounded-lg"
                                        >
                                            Update Visitor
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
