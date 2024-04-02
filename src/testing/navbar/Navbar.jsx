"use client"

import { usePathname } from "next/navigation";
import "./navbar.scss";

import ToggleMenuBtn from "./toggleMenuBtn/ToggleMenuBtn";


const Navbar = () => {
    const pathname = usePathname()
    return (
        <div className="navbar">
            <h2 className="title"></h2>
            <div className="icons">
                <ToggleMenuBtn />
            </div>
        </div>
    );
};

export default Navbar;
