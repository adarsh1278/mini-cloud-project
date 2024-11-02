"use client";

import Image from "next/image";
import moment from "moment/moment";
import React, { useContext } from "react";
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/config/Firebase";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { toastContext } from "@/context/ToastContext";
import { useSession } from "next-auth/react";
import { loadingContext } from "@/context/LoadingContext";

const FileItem = ({ file }) => {
    const fileType =
        file.type === "jpg" || file.type === "png" || file.type === "jpeg"
            ? "img"
            : file.type;

    const image = "/" + fileType + ".png";
    const db = getFirestore(app);
    const storage = getStorage(app);
    const docId = Date.now();
    const { setShowToastMsg } = useContext(toastContext);
    const { data: session } = useSession();
    const {setLoading} = useContext(loadingContext)

    const deleteFile = async (file) => {
        setLoading(true);
        // sent file to trash
        await setDoc(doc(db, "trash", docId.toString()), {
            name: file.name,
            type: file.name.split(".").at(-1),
            size: file.size,
            createdAt: Date.now(),
            createdBy: session.user.email,
        });

        const desertRef = ref(storage, "files/" + file.name);
        // Delete the file
        deleteObject(desertRef)
            .then(async () => {
                await deleteDoc(doc(db, "files", file.id.toString()));
                setShowToastMsg("File deleted");
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setShowToastMsg("Server error");
                setLoading(false);
            });
    };

    const deleteFileClick = (e) => {
        e.stopPropagation();
        console.log("hello");
        // deleteFile(file);
    };

    return (
        <div
            onClick={() => window.open(file.fileUrl)}
            className="grid grid-cols-1 md:grid-cols-2 justify-between cursor-pointer text-[#eeeeee] hover:bg-gray-800 p-3 rounded-md"
        >
            <div className="flex gap-2 items-center">
                <Image
                    src={image}
                    alt="file-icon"
                    width={26}
                    height={20}
                    on="true"
                />
                <h2 className="text-[15px] truncate">{file.name}</h2>
            </div>
            <div className="grid grid-cols-3 place-content-start ">
                <h2 className="text-[15px]">
                    {/* {moment(file.modifiedAt).format("MMMM DD, YYYY")} */}
                    {moment(file.modifiedAt).format("MMMM DD, YYYY")}
                </h2>

                <h2 className="text-[15px]">
                    {/* {(file.size / 1024 ** 2).toFixed(2) + " MB"} */}
                    {(file.size / 1024 ** 2).toFixed(2) + " MB"}
                </h2>
                <div>
                    <div className=" flex items-center justify-around">
                        <a
                            onClick={(e) => e.stopPropagation()}
                            href={file.fileUrl}
                            download="Example-PDF-document"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 hover:text-blue-500 hover:scale-110 transition-all"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                />
                            </svg>
                        </a>

                        <svg
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteFile(file);
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 float-right text-red-500 hover:scale-110 transition-all"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileItem;
