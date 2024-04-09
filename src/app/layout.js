import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast"
import "../styles/global.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  manifest: "/manifest.json",
  title: 'DOP Leave Manager',
  description: 'Department of Post Leave Manager',
  icons: {
    icon: '/logo/logo.svg'
  }
}

export const viewport = {
  themeColor: "#2a3447",
}

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
