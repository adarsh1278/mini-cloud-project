"use client";
import { cloud_icon } from "@/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { sideMenu } from "@/data";
import CreateFolderModal from "../folder/CreateFolderModal";
import Link from "next/link";
import UploadFileModal from "../file/UploadFileModal";
import { useSession } from "next-auth/react";

const SideNavBar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();
    const session = useSession();

    const onMenuClick = (item, index) => {
        setActiveIndex(index);
    };

    return (
        <div className="w-[100px] md:w-[250px] bg-white dark:bg-gray-900 h-screen sticky top-0 z-10 shadow-lg p-6 transition-all">
            {/* Logo */}
            <div className="flex justify-center mb-8">
                <Image
                    src={cloud_icon}
                    alt="logo"
                    className="cursor-pointer hover:scale-105 transition-all"
                    width={60}
                    height={60}
                    onClick={() => {
                        router.push("/");
                        setActiveIndex(0);
                    }}
                />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
                <button
                    disabled={session.status === "unauthenticated"}
                    onClick={() => window.upload_file.showModal()}
                    className="btn btn-primary flex items-center justify-center gap-2 w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    <span className="hidden md:inline font-medium">Add File</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>

                <button
                    disabled={session.status === "unauthenticated"}
                    onClick={() => window.create_folder_modal.showModal()}
                    className="btn btn-secondary flex items-center justify-center gap-2 w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    <span className="hidden md:inline font-medium">Add Folder</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                        />
                    </svg>
                </button>
            </div>

            {/* Nav Menu */}
            <div className="w-full h-px bg-gray-200 dark:bg-gray-700 mb-6"></div>
            <nav className="space-y-2">
                {sideMenu.map((item, index) => (
                    <Link key={index} href={item.url}>
                        <div
                            onClick={() => onMenuClick(item, index)}
                            className={`sidebar-item ${activeIndex === index ? "sidebar-item-active" : ""
                                }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.7}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d={item.logo}
                                />
                            </svg>
                            <span className="hidden md:block font-medium">
                                {item.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </nav>

            <dialog id="upload_file" className="modal">
                <UploadFileModal
                    closeModal={() => window.upload_file.close()}
                />
            </dialog>
            <dialog
                id="create_folder_modal"
                className="modal modal-bottom sm:modal-middle"
            >
                <CreateFolderModal />
            </dialog>
        </div>
    );
};

export default SideNavBar;
