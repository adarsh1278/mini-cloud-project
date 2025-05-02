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
            <div className="flex flex-col items-center justify-center p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:border-blue-200 dark:hover:border-blue-900 cursor-pointer">
                <div className="w-14 h-14 flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 rounded-xl mb-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 text-blue-500 dark:text-blue-400"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                        />
                    </svg>
                </div>
                <h3 className="text-sm font-medium text-center text-gray-800 dark:text-gray-200 line-clamp-2 max-w-[120px]">
                    {folder.name}
                </h3>
            </div>
        </Link>
    );
};

export default FolderItem;
