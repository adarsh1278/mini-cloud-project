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
        // router.push(item.)
    };

    return (
        <div className="w-[100px] md:w-[200px] bg-[#1d232a] h-screen sticky top-0 z-10 shadow-gray-700 shadow-md p-5">
            {/* Logo */}
            <div className="flex justify-center">
                <Image
                    src={cloud_icon}
                    alt="logo"
                    className="cursor-pointer"
                    width={50}
                    height={60}
                    onClick={() => {
                        router.push("/");
                        setActiveIndex(0);
                    }}
                />
            </div>
            {/* Add New FIle button */}
            <button
                disabled={session.status === "unauthenticated"}
                onClick={() => window.upload_file.showModal()}
                className="flex disabled:cursor-not-allowed gap-2 items-center text-[13px] bg-blue-500 p-2 text-white rounded-md px-3
        hover:scale-105 transition-all mt-5 w-full justify-center"
            >
                <span className="hidden md:inline">Add File</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>
            {/* Create new Folder button */}
            {/* <button className="btn" >open modal</button> */}
            <button
                disabled={session.status === "unauthenticated"}
                onClick={() => window.create_folder_modal.showModal()}
                className="flex disabled:cursor-not-allowed gap-2 items-center text-[13px] bg-sky-500 p-2 text-white rounded-md px-3 hover:scale-105 transition-all mt-3 w-full justify-center"
            >
                <span className="hidden md:inline">Add Folder</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                    />
                </svg>
            </button>
            {/* Nav Menu */}
            <div className="mt-5 w-full bg-[#a6adba] h-[1px]" />
            <menu>
                {sideMenu.map((item, index) => (
                    <Link key={index} href={item.url}>
                        <h2
                            onClick={() => onMenuClick(item, index)}
                            className={`flex gap-2 items-center p-2 mt-3 justify-center md:justify-start text-gray-500 rounded-md cursor-pointer
                hover:bg-blue-500 hover:text-white ${
                    activeIndex == index ? "bg-blue-500 text-white" : null
                }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d={item.logo}
                                />
                            </svg>
                            <span className="hidden md:inline">
                                {item.name}
                            </span>
                        </h2>
                    </Link>
                ))}
            </menu>

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
