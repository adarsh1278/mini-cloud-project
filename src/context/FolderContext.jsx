"use client";
import React, { createContext, useState } from "react";

export const folderContext = createContext(null);

const FolderContext = ({ children }) => {
    const [folderId, setFolderId] = useState(null);

    return (
        <folderContext.Provider value={{ folderId, setFolderId }}>
            {children}
        </folderContext.Provider>
    );
};

export default FolderContext;
