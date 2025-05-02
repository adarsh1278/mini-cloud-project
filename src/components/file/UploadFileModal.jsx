"use client";
import { toastContext } from "@/context/ToastContext";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { app } from "@/config/Firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { loadingContext } from "@/context/LoadingContext";

const UploadFileModal = ({ closeModal }) => {
    const { data: session } = useSession();
    const [folderId, setFolderId] = useState(0);
    const [dragActive, setDragActive] = useState(false);
    const pathname = usePathname();
    const { setShowToastMsg } = useContext(toastContext);
    const { setLoading } = useContext(loadingContext);

    useEffect(() => {
        if (pathname.startsWith("/folder")) {
            const id = pathname.split("/").at(-1);
            setFolderId(id);
        } else {
            setFolderId(0);
        }
    }, [pathname]);

    const db = getFirestore(app);
    const storage = getStorage(app);
    const docId = Date.now();

    const onFileUpload = async (file) => {
        setLoading(true);
        const fileRef = ref(storage, "/files/" + file.name);
        uploadBytes(fileRef, file)
            .then((snapshot) => {
                console.log("Uploaded a blob or file!");
            })
            .then((res) => {
                getDownloadURL(fileRef).then(async (downloadURL) => {
                    await setDoc(doc(db, "files", docId.toString()), {
                        id: docId,
                        name: file.name,
                        type: file.name.split(".").at(-1),
                        size: file.size,
                        modifiedAt: file.lastModified,
                        createdBy: session.user.email,
                        parentFolderId: folderId,
                        fileUrl: downloadURL,
                    });

                    closeModal(true);
                    setShowToastMsg("File uploaded successfully");
                    setLoading(false);
                });
            });
    };

    // Handle drag events
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // Triggers when file is dropped
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileUpload(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="modal-content">
            <form
                method="dialog"
                className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl max-w-md w-full mx-auto"
                onDragEnter={handleDrag}
            >
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    onClick={closeModal}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Upload File</h3>

                <div
                    className={`w-full flex flex-col items-center justify-center border-2 ${dragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'} border-dashed rounded-xl p-8 transition-all`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                        <svg
                            className="w-10 h-10 text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                    </div>

                    <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <span className="font-bold">Click to upload</span> or drag and drop
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        PDF, DOC, JPG, PNG or any other file type
                    </p>

                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={(e) => onFileUpload(e.target.files[0])}
                    />

                    <button
                        type="button"
                        onClick={() => document.getElementById('file-upload').click()}
                        className="btn btn-primary mt-6"
                    >
                        Select File
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UploadFileModal;
