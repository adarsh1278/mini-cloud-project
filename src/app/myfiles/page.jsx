"use client";

import FileList from "@/components/file/FileList";
import AllFoldersList from "@/components/folder/AllFoldersList";

import { toastContext } from "@/context/ToastContext";
import { fetchSubFiles } from "@/services/fetchFiles";
import { fetchSubFolders } from "@/services/fetchFolders";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const MyFilesPage = () => {
    const demofolders = [
        {
            id: 1,
            name: "Folder 1 ",
        },
        {
            id: 2,
            name: "Folder 2",
        },
        {
            id: 3,
            name: "Folder 3",
        },
        {
            id: 4,
            name: "Folder 4",
        },
        {
            id: 5,
            name: "Folder 5",
        },
    ];

    const session = useSession();
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const { showToastMsg, setShowToastMsg } = useContext(toastContext);

    useEffect(() => {
        if (session.status === "authenticated") {
            getFolders();
            getFiles();
        }
    }, [session, showToastMsg]);

    const router = useRouter();

    useEffect(() => {
        if (session.status === "unauthenticated") {
            router.push("/auth/login");
            setShowToastMsg("Login to continue.");
        }
    }, [session]);

    const getFiles = async () => {
        const data = await fetchSubFiles(session.data, 0);
        setFiles(data);
    };

    const getFolders = async () => {
        const data = await fetchSubFolders(session.data, 0);
        setFolders(data);
    };

    return (
        <div className="p-5">
            <AllFoldersList folderName="Home" folders={folders} />
            <FileList files={files} />
        </div>
    );
};

export default MyFilesPage;
