"use client";
import { createContext, useState } from "react";

export const toastContext = createContext(null);


const ToastContext = ({ children }) => {
    const [showToastMsg, setShowToastMsg] = useState(null);
    return (
        <toastContext.Provider value={{ showToastMsg, setShowToastMsg }}>
            {children}
        </toastContext.Provider>
    );
};

export default ToastContext;
