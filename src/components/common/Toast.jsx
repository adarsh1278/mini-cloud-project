"use client";
import { toastContext } from "@/context/ToastContext";
import React, { useContext, useEffect } from "react";

const Toast = ({ msg }) => {
    const { setShowToastMsg } = useContext(toastContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowToastMsg(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [setShowToastMsg]);

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
            <div className="bg-white dark:bg-gray-800 px-5 py-4 rounded-lg shadow-lg border-l-4 border-blue-500 flex items-center space-x-3">
                <div className="flex-shrink-0 text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {msg}
                </div>
            </div>
        </div>
    );
};

export default Toast;
