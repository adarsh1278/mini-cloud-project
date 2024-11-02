import React from "react";
import AccountInfo from "./AccountInfo";
import StorageInfo from "./StorageInfo";
import { useRouter } from "next/navigation";

const Storage = () => {
    const router = useRouter();
    return (
        <div>
            <AccountInfo />
            <StorageInfo />
            <div className="p-3 bg-[#2a323c] rounded-lg text-center mt-5 bottom-0">
                <h2 className="font-semibold text-[17px] text-[#a6adba]">
                    Need More Space?
                </h2>
                <h2 className="text-[13px] text-[#eeeeee]">
                    Get more space my upgrading the plan
                </h2>
                <button
                    className="bg-blue-500 p-2 px-4 text-[14px] rounded-lg mt-3"
                    onClick={() => router.push("/plans")}
                >
                    Upgrade Plan
                </button>
            </div>
        </div>
    );
};

export default Storage;
