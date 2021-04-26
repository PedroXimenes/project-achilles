import { Link } from 'react-router-dom'
import {FaBars} from 'react-icons/fa'
import { AiOutlineClose, AiFillHome } from 'react-icons/ai'
import React, {useState} from 'react'
import {SidebarData} from './SidebarData'
import './Navbar.css'
import {IconContext} from 'react-icons'
import { Form } from 'react-bootstrap'


export const Navbar = ({ onSend }) => {
    // const [sidebar, setSidebar] = useState(false)
    const [hnum, setHnum] = useState('')
    const [hden, setHden] = useState('')
    const [gnum, setGnum] = useState('')
    const [gden, setGden] = useState('')
    const [load, setLoad] = useState(false)
    const [ok, setOk] = useState(false)
    // const showSidebar = () => setSidebar(!sidebar);

    const onSubmit = (e) => {
        e.preventDefault()

        if(!hnum) {
            alert('Por favor, digite um numerador para o processo')
            return
        }
        if(!hden) {
            alert('Por favor, digite um denominador para o processo')
            return
        }
        if(!gnum) {
            alert('Por favor, digite um numerador para o controlador')
            return
        }
        if(!gden) {
            alert('Por favor, digite um denominador para o controlador')
            return
        }

        if (!hnum.match(/[0-9]+$/)){
            alert('Por favor, digite apenas números.')
            return 
        } 
        if (!hden.match(/[0-9]+$/)){
            alert('Por favor, digite apenas números.')
            return 
        } 
        if (!gnum.match(/[0-9]+$/)){
            alert('Por favor, digite apenas números.')
            return 
        } 
        if (!gden.match(/[0-9]+$/)){
            alert('Por favor, digite apenas números.')
            return 
        } 

        onSend({ hnum, hden, gnum, gden, load })

        setHnum('')
        setHden('')
        setGnum('')
        setGden('')
    }
    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>     
                <div className="navbar">
                    {/* <Link to="/home" className='menu-bars'>
                        <AiFillHome onClick={showSidebar}/>
                    </Link> */}
                    {/* <li className="navbar-toggle">
                            <Link to="#" className='menu-bars'>
                                <AiOutlineClose />
                            </Link>
                        </li> */}
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.className}>
                                    <Link to={item.path}>
                                        {item.icon}
                            <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                </div>
                {/* <nav className={sidebar ? 'nav-menu-active' : 'nav-menu'}> */}
                <nav className='nav-menu-active'>

                    {/* <ul className='nav-menu-items' onClick={showSidebar}>
                    
                        <li className="navbar-toggle">
                            <Link to="#" className='menu-bars'>
                                <AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.className}>
                                    <Link to={item.path}>
                                        {item.icon}
                            <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                        </ul> */}
                    <h1 className="title-text">Nome do Projeto</h1> 
                        <ul className='nav-menu-items'>
                        
                        <form className="form" onSubmit={onSubmit}>
                            <h2 className='form-text2'>Processo</h2>
                            <div>
                                <li className='form-text'>Numerador</li>
                                <input className='input-bar' type="text" placeholder="Exemplo: 1,2" value={hnum} onChange={(e) => setHnum(e.target.value)}/>
                            </div>

                            
                            <div>
                                <li className='form-text'>Denominador</li>
                                <input className='input-bar' type="text" placeholder="Exemplo: 1,2,3" value={hden} onChange={(e) => setHden(e.target.value)}/>
                            </div>
                            
                            <div className="line"/>
                            <h2 className='form-text2'>Controlador</h2>
                            <div>
                                <li className='form-text'>Numerador</li>
                                <input className='input-bar' type="text" value={gnum} placeholder="Exemplo: 1,2" onChange={(e) => setGnum(e.target.value)}/>
                            </div>
                            

                            <div>
                                <li className='form-text'>Denominador</li>
                                <input className='input-bar' type="text" value={gden} placeholder="Exemplo: 1,2,3" onChange={(e) => setGden(e.target.value)}/>
                            </div>
                            <input type='submit' value='Enviar' className='btn' onClick={(e) => setLoad(true)}/> 
                        </form>
                    
                    </ul>
                </nav>
            </IconContext.Provider>
        </>

    )
}

export default Navbar