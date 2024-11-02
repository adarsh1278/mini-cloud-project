"use client";
import FileList from "@/components/file/FileList";
import AllFoldersList from "@/components/folder/AllFoldersList";
import { toastContext } from "@/context/ToastContext";
import { fetchSubFiles } from "@/services/fetchFiles";
import { fetchSubFolders } from "@/services/fetchFolders";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const FolderDetails = ({ params }) => {
    const { folderId } = params;
    const searchParams = useSearchParams();
    const folderName = searchParams.get("name");

    const { showToastMsg,setShowToastMsg } = useContext(toastContext);

    const session = useSession();
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);

    const router = useRouter();

    useEffect(() => {
        if (session.status === "unauthenticated") {
            router.push("/auth/login");
            setShowToastMsg("Login to continue.")
        }
    }, [session]);

    useEffect(() => {
        if (session.status === "authenticated") {
            getFolders();
            getFiles();
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

    return (
        <div>
            FolderDetails {folderName}
            <AllFoldersList folderName={folderName} folders={folders} />
            <FileList files={files} />
        </div>
    );
};

export default FolderDetails;
