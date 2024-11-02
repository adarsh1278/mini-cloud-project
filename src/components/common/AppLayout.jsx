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
    const {loading} = useContext(loadingContext)
    return (
        <SessionProvider>
            <div className="flex relative">
                <RingLoader
                    loading={loading}
                    cssOverride={{
                        // border: "1px solid white",
                        position: "absolute",
                        top: "0",
                        bottom: "0",
                        left: "0",
                        right: "0",
                        margin: "auto",
                        zIndex: "12",
                        width: "100px",
                    }}
                    color="#ffffff"
                    size={100}
                />
                <SideNavBar />
                <div className="grid grid-cols-1 lg:grid-cols-3 w-full bg-[#1d232a]">
                    <div className="col-span-2">
                        <div className="relative">{children}</div>
                    </div>
                    <div className=" p-5 order-first md:order-last space-y-5">
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
