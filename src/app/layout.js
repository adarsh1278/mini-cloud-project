import AppLayout from "@/components/common/AppLayout";
import "./globals.css";
import { Inter } from "next/font/google";
import ToastContext from "@/context/ToastContext";
import FolderContext from "@/context/FolderContext";
import { BeatLoader, RingLoader } from "react-spinners";
import LoadingContext from "@/context/LoadingContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Pocket Cloud",
    description: "Cloud file manager build on Next.js",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} relative bg-[#1d232a]`}>
                <LoadingContext>
                    <ToastContext>
                        <FolderContext>
                            <AppLayout>{children}</AppLayout>
                        </FolderContext>
                    </ToastContext>
                </LoadingContext>
            </body>
        </html>
    );
}
