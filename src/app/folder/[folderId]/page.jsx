"use client";
import FileList from "@/components/file/FileList";
import AllFoldersList from "@/components/folder/AllFoldersList";
import { toastContext } from "@/context/ToastContext";
import { fetchSubFiles } from "@/services/fetchFiles";
import { fetchSubFolders } from "@/services/fetchFolders";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/config/Firebase";

const FolderDetails = ({ params }) => {
    const { folderId } = params;
    const searchParams = useSearchParams();
    const folderName = searchParams.get("name");

    const { showToastMsg, setShowToastMsg } = useContext(toastContext);

    const session = useSession();
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [parentFolderId, setParentFolderId] = useState(null);
    const db = getFirestore(app);
    const router = useRouter();

    useEffect(() => {
        if (session.status === "unauthenticated") {
            router.push("/auth/login");
            setShowToastMsg("Login to continue.");
        }
    }, [session]);

    useEffect(() => {
        if (session.status === "authenticated") {
            getFolders();
            getFiles();
            getParentFolderId();
        }
    }, [session, params, folderId, showToastMsg]);

    const getFolders = async () => {
        const data = await fetchSubFolders(session.data, folderId);
        setFolders(data);
    };

    const getFiles = async () => {
        const data = await fetchSubFiles(session.data, folderId);
        setFiles(data);
    };

    // Get the parent folder ID to enable folder navigation
    const getParentFolderId = async () => {
        try {
            const folderRef = doc(db, "folders", folderId);
            const folderSnap = await getDoc(folderRef);

            if (folderSnap.exists()) {
                const folderData = folderSnap.data();
                // Set parent folder ID if it exists, otherwise null (which will navigate to home)
                setParentFolderId(folderData.parentFolderId || null);
            }
        } catch (error) {
            console.error("Error fetching parent folder:", error);
        }
    };

    return (
        <div className="p-4">
            <AllFoldersList
                folderName={folderName}
                folders={folders}
                parentFolderId={parentFolderId}
            />
            <FileList files={files} />
        </div>
    );
};

export default FolderDetails;
