"use client";
import { loadingContext } from "@/context/LoadingContext";
import { toastContext } from "@/context/ToastContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

const StargedPage = () => {
    const session = useSession();
    const router = useRouter();
    const {showToastMsg, setShowToastMsg} = useContext(toastContext)

    const { setLoading } = useContext(loadingContext);
    useEffect(() => {
        if(session.status === 'loading') {
            setLoading(true);
        }
        else {
            setLoading(false);
        }
    }, [session])

    useEffect(() => {
        if (session.status === "unauthenticated") {
            router.push("/auth/login");
            setShowToastMsg("Login to continue.")
        }
    }, [session]);

    return (
        <div className="flex flex-col items-center mt-52 text-[#eeeeee]">
            <h1 className="text-lg md:text-2xl font-medium">This feature is under development.</h1>
            <h2 className="text-md md:text-xl">It will be added soon.</h2>
        </div>
    );
};

export default StargedPage;
