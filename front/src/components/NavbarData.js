import React from 'react'
import { AiFillHome, AiOutlineQuestionCircle, AiOutlineInfoCircle } from 'react-icons/ai'

export const NavbarData = [
    {
        title: 'Início',
        path: '/',
        icon: <AiFillHome className="nav-icon"/>,
        className: 'nav-text'
    },
    {
        title: 'Ajuda',
        path: '/help',
        icon: <AiOutlineQuestionCircle className="nav-icon"/>,
        className: 'nav-text'
    },
    {
        title: 'Sobre',
        path: '/about',
        icon: <AiOutlineInfoCircle className="nav-icon"/>,
        className: 'nav-text'
    },
]