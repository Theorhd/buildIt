import { Link, NavLink } from "react-router-dom";
import logo from "/buildit-logo.png";
import { useTranslation } from "react-i18next";
import IAModale from "../modale/IAModale";
import { useState } from "react";

import {
    ChevronLeftIcon,
    PlusIcon,
    ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Navbar from "./Navbar";
import Tooltip from "../Tooltip";
import { logout } from "../../utils/api_router";

export default function Header({
    isNavbarOpen,
    toggleNavbar,
}: {
    isNavbarOpen: boolean;
    toggleNavbar: () => void;
}) {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <header className="h-full bg-bgPrimary flex flex-col justify-between select-none">
            <div className="">
                <div className="flex items-center justify-between p-4">
                    <Link to="/" className="flex items-center">
                        <img src={logo} className="w-8" alt="BuildIT logo" />
                        <h1 className="text-2xl text-primary ml-2 font-bold font-montserrat">
                            BUILD<span className="text-secondary">IT</span>
                        </h1>
                    </Link>
                    <ChevronLeftIcon
                        onClick={() => {
                            toggleNavbar();
                        }}
                        className="w-4 h-4 cursor-pointer"
                    />
                </div>

                <div
                    className={`transition-opacity duration-300 ${
                        isNavbarOpen ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div className="w-40 border-b border-bgSecondary mb-2 mx-auto"></div>

                    <div className="flex justify-between items-center px-4 py-2">
                        <span className="font-semibold">
                            {t("Your projects")}
                        </span>
                        <Tooltip text="New project" position="top">
                            <PlusIcon
                                className="w-4 h-4 cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
                            />
                        </Tooltip>
                    </div>

                    <Navbar />
                </div>
            </div>
            <div className="p-4">
                <div className="w-40 border-b border-bgSecondary mb-5 mx-auto"></div>
                <div className="flex justify-between items-center px-4">
                    <NavLink
                        to="account"
                        className={({ isActive }) =>
                            isActive
                                ? "w-11 h-11 rounded-full bg-secondary flex justify-center items-center cursor-pointer text-sm"
                                : "w-11 h-11 rounded-full bg-bgPrimary border-2 border-bgSecondary flex justify-center items-center cursor-pointer text-sm"
                        }
                    >
                        <img
                            src="https://i.pravatar.cc/150?u=maelbelliard"
                            className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center"
                        />
                    </NavLink>
                    <Tooltip text="Logout" position="top">
                        <ArrowRightStartOnRectangleIcon
                            onClick={logout}
                            className="w-6 h-6 cursor-pointer text-red-600"
                        />
                    </Tooltip>
                </div>
            </div>
            {isModalOpen && (
                <IAModale
                    onSave={(data) => console.log(data)}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </header>
    );
}
