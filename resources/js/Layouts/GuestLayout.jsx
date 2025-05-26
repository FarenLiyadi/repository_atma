import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div className="flex w-full justify-center flex-col">
                <Link href="/">
                    <img src="/img/uajm.png" className="w-28  mx-auto" alt="" />
                </Link>
                <p className="text-center  text-black text-3xl mt-3 font-bold">
                    Repository Universitas Atma Jaya Makassar
                </p>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
// bg-[url('/path-to-your-image.jpg')] bg-cover bg-center bg-opacity-50
