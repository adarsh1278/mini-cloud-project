"use client";
import { app } from "@/config/Firebase";
import { loadingContext } from "@/context/LoadingContext";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";

const StorageInfo = () => {
    const session = useSession();
    const db = getFirestore(app);

    const [totalSizeUsed, setTotalSizeUsed] = useState(0);
    const [percentUsed, setPercentUsed] = useState(0);
    let totalSize = 0;
    const storageLimit = 100; // MB

    const { setLoading } = useContext(loadingContext);

    useEffect(() => {
        if (session.status === "loading") {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [session]);

    useEffect(() => {
        if (session.status === "authenticated") {
            getAllFiles();
        }
    }, [session]);

    const getAllFiles = async () => {
        const q = query(
            collection(db, "files"),
            where("createdBy", "==", session.data.user.email)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            totalSize = totalSize + doc.data()["size"];
        });

        const usedSizeMB = (totalSize / 1024 ** 2).toFixed(2);
        setTotalSizeUsed(usedSizeMB);
        setPercentUsed((usedSizeMB / storageLimit) * 100);
    };

    // Determine the progress bar color based on usage percentage
    const getProgressColor = () => {
        if (percentUsed < 50) return 'bg-blue-500';
        if (percentUsed < 80) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-base font-medium text-gray-700 dark:text-gray-300">Storage</h2>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {totalSizeUsed} MB <span className="text-gray-500 dark:text-gray-400 font-normal">of {storageLimit} MB</span>
                </span>
            </div>

            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div
                    className={`h-2.5 rounded-full ${getProgressColor()}`}
                    style={{ width: `${percentUsed}%` }}
                ></div>
            </div>

            <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    {percentUsed.toFixed(1)}% used
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    {(storageLimit - totalSizeUsed).toFixed(2)} MB free
                </span>
            </div>

            <div className="mt-4">
                <div className="flex items-center space-x-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-300">Documents</span>
                </div>
                <div className="flex items-center space-x-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-300">Images</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-300">Other Files</span>
                </div>
            </div>
        </div>
    );
};

export default StorageInfo;
