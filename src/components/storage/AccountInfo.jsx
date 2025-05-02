"use client";
import { loadingContext } from "@/context/LoadingContext";
import { toastContext } from "@/context/ToastContext";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useContext, useEffect } from "react";

const AccountInfo = () => {
    const ss = useSession();
    const { data: session } = useSession();

    const { setShowToastMsg } = useContext(toastContext);

    const { setLoading } = useContext(loadingContext);
    useEffect(() => {
        if (ss.status === 'loading') {
            setLoading(true);
        }
        else {
            setLoading(false);
        }
    }, [session])

    const handleLogout = (e) => {
        e.preventDefault();
        signOut();
        setShowToastMsg("Signing out");
    };

    return (
        <div>
            {session ? (
                <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <div className="relative">
                            <Image
                                src={session.user.image}
                                alt="user-image"
                                width={44}
                                height={44}
                                className="rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
                            />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-700 rounded-full"></span>
                        </div>
                        <div>
                            <h2 className="text-[15px] font-semibold text-gray-800 dark:text-gray-200">
                                {session.user.name}
                            </h2>
                            <h2 className="text-[13px] text-gray-500 dark:text-gray-400">
                                {session.user.email}
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                        aria-label="Sign Out"
                        title="Sign Out"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.7}
                            stroke="currentColor"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                            />
                        </svg>
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default AccountInfo;
