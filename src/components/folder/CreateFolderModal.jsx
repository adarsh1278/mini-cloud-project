"use client";
import { app } from "@/config/Firebase";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { toastContext } from "@/context/ToastContext";
import { usePathname } from "next/navigation";
import { loadingContext } from "@/context/LoadingContext";

const CreateFolderModal = () => {
    const [folderName, setFolderName] = useState("");
    const db = getFirestore(app);
    const docId = Date.now().toString();

    const { data: session } = useSession();
    const { setShowToastMsg } = useContext(toastContext);
    const {setLoading} = useContext(loadingContext);

    const [folderId, setFolderId] = useState(0);
    const pathname = usePathname();
    useEffect(() => {
        if (pathname.startsWith("/folder")) {
            const id = pathname.split("/").at(-1);
            setFolderId(id);
        } else {
            setFolderId(0);
        }
    }, [pathname]);

    const onCreate = async () => {
        setLoading(true);
        await setDoc(doc(db, "Folders", docId), {
            name: folderName,
            createdBy: session.user.email,
            id: docId,
            createdAt: Date.now(),
            parentFolderId: folderId,
        });

        setLoading(false);
        setFolderName("");
        setShowToastMsg("Folder created");
    };

    return (
        <div>
            <form
                method="dialog"
                onSubmit={onCreate}
                className="modal-box p-9 items-center"
            >
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => console.log("first")}>
                    ✕
                </button>
                <div className="w-full items-center flex flex-col justify-center gap-3">
                    <Image
                        src="/folder.png"
                        alt="folder"
                        width={50}
                        height={50}
                    />
                    <input
                        type="text"
                        value={folderName}
                        required={true}
                        placeholder="Folder Name"
                        className="p-2 border-[1px] outline-none rounded-md"
                        onChange={(e) => setFolderName(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white  rounded-md p-2 px-3 w-full"
                        // onClick={onCreate}
                        type="submit"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateFolderModal;
