import PropTypes from "prop-types";
import React, { useState } from "react";

const Headbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <a
                                href="/"
                                className="text-white text-lg font-bold"
                            >
                                MyApp
                            </a>
                        </div>
                        <div className="hidden md:flex space-x-4 ml-10">
                            <a
                                href="#"
                                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                            >
                                Home
                            </a>
                            <a
                                href="#"
                                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                            >
                                About
                            </a>
                            <a
                                href="#"
                                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                            >
                                Services
                            </a>
                            <a
                                href="#"
                                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a
                            href="#"
                            className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md"
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md"
                        >
                            About
                        </a>
                        <a
                            href="#"
                            className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md"
                        >
                            Services
                        </a>
                        <a
                            href="#"
                            className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Headbar;
