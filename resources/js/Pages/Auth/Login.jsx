import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nidn: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
            // localStorage.removeItem("leaderList");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        // localStorage.removeItem("leaderList");
        post(
            route("login")
            // , {
            // onSuccess: (page) => {
            // console.log("Login successful!", page);
            // },
            // onError: (errors) => {
            //     console.log("Login failed!", errors);
            // },
            // }
        );
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="nidn" value="NIDN" />

                    <TextInput
                        id="nidn"
                        type="text"
                        name="nidn"
                        value={data.nidn}
                        className="mt-1 block w-full"
                        autoComplete="nidn"
                        isFocused={true}
                        onChange={(e) => setData("nidn", e.target.value)}
                    />

                    <InputError message={errors.nidn} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type={data.remember == true ? "text" : "password"}
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="mt-2 flex">
                    <TextInput
                        id="remember"
                        type="checkbox"
                        name="remember"
                        checked={data.remember}
                        className="mt-1  w-5 h-5 border-blue-500"
                        onChange={(e) => setData("remember", e.target.checked)}
                    />
                    <InputLabel className="mt-1 ml-2" value="Show Password" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
