import React from "react";
import FileItem from "./FileItem";
import Link from "next/link";

const FileList = ({ files }) => {
    const demofiles = [
        {
            id: 1,
            name: "UX Principal.docx",
            type: "docx",
            size: "6272 kB",
            modifiedAt: "2020-09-09",
        },
        {
            id: 2,
            name: "Data Structure.pdf",
            type: "pdf",
            size: "672 kB",
            modifiedAt: "2020-09-09",
        },
        {
            id: 3,
            name: "smaple Image.png",
            type: "image",
            size: "400 kB",
            modifiedAt: "2020-09-09",
        },
        {
            id: 4,
            name: "React Principal.docx",
            type: "docx",
            size: "6272 kB",
            modifiedAt: "2020-09-09",
        },
    ];

    return (
        <div className="p-5 mt-5 bg-[#2a323c]">
            <h2 className="font-bold text-lg md:text-xl text-[#a6adba] flex items-center justify-between">
                Recent Files
                <Link
                    href="/myfiles"
                    className="text-sm text-[#8b919d] cursor-pointer "
                >
                    View all
                </Link>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 text-[13px] font-semibold border-b-[1px] pb-2 mt-3 border-gray-300 text-gray-400">
                <h2>Name</h2>
                <div className="grid grid-cols-3 ">
                    <h2>Modified</h2>
                    <h2>Size</h2>
                    <h2></h2>
                </div>
            </div>

            {files.length === 0 ? (
                <h1 className="font-bold mt-5 text-center text-lg md:text-xl text-[#eeeeeedb]">
                    Upload a new file
                </h1>
            ) : (
                files.map((item, index) => (
                    <div key={index}>
                        <FileItem file={item} key={index} />
                    </div>
                ))
            )}
        </div>
    );
};

export default FileList;
