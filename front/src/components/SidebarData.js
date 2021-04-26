import React from 'react'
import {FaBars, FaCartPlus} from 'react-icons/fa'
import {IoIosPaper} from 'react-icons/io'
import { AiOutlineClose, AiFillHome, AiOutlineQuestion,AiOutlineQuestionCircle, AiOutlineInfoCircle } from 'react-icons/ai'

export const SidebarData = [
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