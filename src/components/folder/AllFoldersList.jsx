import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AllFoldersList = ({ folders, folderName, parentFolderId }) => {
    const router = useRouter();

    const navigateBack = () => {
        // If parentFolderId exists, navigate to that folder
        if (parentFolderId) {
            router.push(`/folder/${parentFolderId}`);
        } else {
            // Otherwise navigate to root/home
            router.push('/');
        }
    };

    return (
        <div className="p-5 mt-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg md:text-xl text-gray-800 dark:text-gray-200">
                    / {folderName}
                </h2>
                <button
                    onClick={navigateBack}
                    className="flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-700 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    Back
                </button>
            </div>

            <div className="mt-3">
                {folders.length === 0 ? (
                    <div className="text-center py-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-gray-400 mb-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                        </svg>
                        <h1 className="font-medium text-lg text-gray-600 dark:text-gray-300">
                            No folders yet
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">Create a folder to organize your files</p>
                    </div>
                ) : (
                    folders.map((item) => (
                        <AllFolderItem key={item.id} folder={item} />
                    ))
                )}
            </div>
        </div>
    );
};

export default AllFoldersList;

const AllFolderItem = ({ folder }) => {
    return (
        <Link
            href={{
                pathname: `/folder/${folder.id}`,
                query: { name: folder.name },
            }}
        >
            <div className="w-full mt-3 flex items-center px-4 gap-3 cursor-pointer rounded-lg py-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-blue-500 dark:text-blue-400"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                    />
                </svg>
                <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200">
                    {folder.name}
                </h3>
            </div>
        </Link>
    );
};
