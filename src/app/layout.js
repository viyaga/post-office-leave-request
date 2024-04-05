import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast"
import "../styles/global.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DOP Tech Blazers",
  description: " Simplifying Employee Management for Post Office Administrators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
