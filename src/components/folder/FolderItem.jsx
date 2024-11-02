import Link from "next/link";
import React from "react";

const FolderItem = ({ folder }) => {
    return (
        <Link
            href={{
                pathname: `/folder/${folder.id}`,
                query: { name: folder.name },
            }}
        >
            <div className="w-full space-y-1 flex flex-col items-center justify-center cursor-pointer rounded-lg py-5 shadow shadow-[#1d232a] hover:scale-105 hover:shadow-md">
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
                        d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                    />
                </svg>
                <h3 className="line-clamp-1 text-sm text-[#eeeeee]">
                    {folder.name}
                </h3>
            </div>
        </Link>
    );
};

export default FolderItem;
