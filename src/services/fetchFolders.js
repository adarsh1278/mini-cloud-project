import { app } from "@/config/Firebase";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from "firebase/firestore";

export const fetchFolders = async (session) => {
    let folders = [];

    const db = getFirestore(app);

    const q = query(
        collection(db, "Folders"),
        where("createdBy", "==", session.user.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        folders.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
    });
    return folders;
};

export const fetchSubFolders = async (session, id) => {
    let folders = [];

    const db = getFirestore(app);

    const q = query(
        collection(db, "Folders"),
        where("createdBy", "==", session.user.email),
        where("parentFolderId", "==", id)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        folders.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
    });
    return folders;
};
