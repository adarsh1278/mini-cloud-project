"use client";
import { toastContext } from "@/context/ToastContext";
import React, { useContext, useEffect } from "react";

const Toast = ({ msg }) => {
    const { setShowToastMsg, setShowToast } = useContext(toastContext);
    
    useEffect(() => {
        setTimeout(() => {
            setShowToastMsg(null);
        }, 2000);
    }, [setShowToast]);

    return (
        <div className="toast">
            <div className="alert alert-info">
                <span>{msg}</span>
            </div>
        </div>
    );
};

export default Toast;
