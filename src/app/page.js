"use client";
import SearchBar from "@/components/common/SearchBar";
import FileList from "@/components/file/FileList";
import FolderList from "@/components/folder/FolderList";
import { loadingContext } from "@/context/LoadingContext";
import { toastContext } from "@/context/ToastContext";
import { fetchFiles } from "@/services/fetchFiles";
import { fetchFolders } from "@/services/fetchFolders";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
    const session = useSession();
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const { showToastMsg, setShowToastMsg } = useContext(toastContext);
    
    const router = useRouter();
    
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
            setShowToastMsg("Login to continue.");
        }
    }, [session]);

    useEffect(() => {
        if (session.status === "authenticated") {
            getFolders();
            getFiles();
        }
    }, [session, showToastMsg]);

    const getFolders = async () => {
        let data = await fetchFolders(session.data);
        data = data.reverse().slice(0, Math.min(5, data.length));
        setFolders(data);
    };

    const getFiles = async () => {
        let data = await fetchFiles(session.data);
        data = data.reverse().slice(0, Math.min(5, data.length));
        setFiles(data);
    };

    return (
        <div className="p-5">
            <SearchBar />
            <FolderList folders={folders} />
            <FileList files={files} />
        </div>
    );
}
