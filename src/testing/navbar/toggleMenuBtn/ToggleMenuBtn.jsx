"use client"

import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import './toggleMenuBtn.scss'

const ToggleMenuBtn = () => {
    const toggleMenu = (toggle) => {
        const menuContainer = document.querySelector(".menuContainer");
        if (toggle) {
            menuContainer?.classList.add("menu-active")
        } else {
            menuContainer?.classList.remove("menu-active")
        }
        console.log(toggle);
    }
    return (
        <>
            <HiMenuAlt4 fontSize={28} className="hiMenu" onClick={() => toggleMenu(true)} />
            <AiOutlineClose fontSize={28} className="closeMenu" onClick={() => toggleMenu(false)} />
        </>
    )
}

export default ToggleMenuBtn