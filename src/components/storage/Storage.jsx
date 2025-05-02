import React from "react";
import AccountInfo from "./AccountInfo";
import StorageInfo from "./StorageInfo";
import { useRouter } from "next/navigation";

const Storage = () => {
    const router = useRouter();
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5">
            <AccountInfo />
            <StorageInfo />

            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-5 border border-blue-100 dark:border-blue-900/30">
                <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                    Need More Space?
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Get more storage by upgrading your plan
                </p>
                <button
                    className="btn btn-primary mt-4 w-full"
                    onClick={() => router.push("/plans")}
                >
                    Upgrade Plan
                </button>
            </div>
        </div>
    );
};

export default Storage;
