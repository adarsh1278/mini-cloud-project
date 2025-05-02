"use client";
import { SessionProvider } from "next-auth/react";
import SideNavBar from "./SideNavBar";
import Storage from "../storage/Storage";
import Toast from "./Toast";
import { toastContext } from "@/context/ToastContext";
import { useContext } from "react";
import { BeatLoader, RingLoader } from "react-spinners";
import { loadingContext } from "@/context/LoadingContext";
import AboutDeveloper from "./AboutDeveloper";

const AppLayout = ({ children }) => {
    const { showToastMsg } = useContext(toastContext);
    const { loading } = useContext(loadingContext);

    return (
        <SessionProvider>
            <div className="flex relative min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Loading overlay */}
                {loading && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <RingLoader
                            loading={loading}
                            color="#3b82f6"
                            size={80}
                        />
                    </div>
                )}

                {/* Sidebar */}
                <SideNavBar />

                {/* Main content */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                    <div className="lg:col-span-2">
                        <div className="w-full">{children}</div>
                    </div>

                    <div className="space-y-6">
                        <Storage />
                        <AboutDeveloper />
                    </div>
                </div>
            </div>

            {showToastMsg && <Toast msg={showToastMsg} />}
        </SessionProvider>
    );
};

export default AppLayout;
