import { app } from "@/config/Firebase";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from "firebase/firestore";

export const fetchFiles = async (session) => {
    let files = [];

    const db = getFirestore(app);

    const q = query(
        collection(db, "files"),
        where("createdBy", "==", session.user.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        files.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
    });
    return files;
};

export const fetchSubFiles = async (session, id) => {
    let files = [];

    const db = getFirestore(app);

    const q = query(
        collection(db, "files"),
        where("createdBy", "==", session.user.email),
        where("parentFolderId", "==", id)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        files.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
    });
    return files;
};
