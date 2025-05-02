import { app } from "@/config/Firebase";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from "firebase/firestore";

export const fetchFiles = async (session) => {
    try {
        const db = getFirestore(app);

        const q = query(
            collection(db, "files"),
            where("createdBy", "==", session.user.email)
        );

        const querySnapshot = await getDocs(q);

        const files = [];
        querySnapshot.forEach((doc) => {
            files.push(doc.data());
        });

        return files;
    } catch (error) {
        console.error("Error fetching files:", error);
        return []; // Optional: return empty array on error
    }
};

export const fetchSubFiles = async (session, id) => {
    try {
        const db = getFirestore(app);

        const q = query(
            collection(db, "files"),
            where("createdBy", "==", session.user.email),
            where("parentFolderId", "==", id)
        );

        const querySnapshot = await getDocs(q);

        const files = [];
        querySnapshot.forEach((doc) => {
            files.push(doc.data());
        });

        return files;
    } catch (error) {
        console.error(`Error fetching sub-files for folder ${id}:`, error);
        return []; // Optional: return empty array on error
    }
};
