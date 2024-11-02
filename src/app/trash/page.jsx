'use client'
import { app } from "@/config/Firebase";
import { toastContext } from "@/context/ToastContext";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const TrashPage = () => {
    // const files = [
    //     {
    //         id: 1,
    //         name: "UX Principal.docx",
    //         type: "docx",
    //         size: "6272 kB",
    //         modifiedAt: "2020-09-09",
    //     },
    //     {
    //         id: 2,
    //         name: "Data Structure.pdf",
    //         type: "pdf",
    //         size: "672 kB",
    //         modifiedAt: "2020-09-09",
    //     },
    //     {
    //         id: 3,
    //         name: "smaple Image.png",
    //         type: "image",
    //         size: "400 kB",
    //         modifiedAt: "2020-09-09",
    //     },
    //     {
    //         id: 4,
    //         name: "React Principal.docx",
    //         type: "docx",
    //         size: "6272 kB",
    //         modifiedAt: "2020-09-09",
    //     },
    // ];

    const [files, setFiles] = useState([]) 
    const session = useSession();
    const router = useRouter();
    const {showToastMsg, setShowToastMsg} = useContext(toastContext)

    useEffect(() => {
        if(session.status === 'unauthenticated') {
            router.push('/auth/login')
            setShowToastMsg("Login to continue.")
        }
    }, [session])

    useEffect(() => {
        if(session.status === 'authenticated') {
            fetchTrashFiles();
        }
    }, [session]);

    const db = getFirestore(app);
    const fetchTrashFiles = async () => {

        let files = [];
        const q = query(
            collection(db, "trash"),
            where("createdBy", "==", session.data.user.email),
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            files.push(doc.data());
        });
        setFiles(files);
    }


    return (
        <div className="p-5 mt-5 bg-[#2a323c]">
            <h2 className="font-bold text-lg md:text-xl text-[#a6adba] ">
                Deleted Files
                
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 text-[13px] font-semibold border-b-[1px] pb-2 mt-3 border-gray-300 text-gray-400">
                <h2>Name</h2>
                <div className="grid grid-cols-3 ">
                    <h2>Modified</h2>
                    <h2>Size</h2>
                    <h2></h2>
                </div>
            </div>

            {files &&
                files.map((item, index) => (
                    <div key={index}>
                        <FileItem file={item} key={index} />
                    </div>
                ))}
        </div>
    );
};

const FileItem = ({file}) => {

    const fileType =
        file.type === "jpg" || file.type === "png" || file.type === "jpeg"
            ? "img"
            : file.type;

    const image = "/" + fileType + ".png";


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 justify-between cursor-pointer hover:bg-gray-800 p-3 rounded-md">
            <div className="flex gap-2 items-center">
                <Image
                    src="/image.png"
                    alt="file-icon"
                    width={26}
                    height={20}
                    on="true"
                />
                <h2
                    className="text-[15px] truncate"
                >
                    {file.name}
                </h2>
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
                </div>
            </div>
        </div>
    )
}

export default TrashPage;
