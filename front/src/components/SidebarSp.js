import { Link } from 'react-router-dom'
import React, {useState} from 'react'
import {NavbarData} from './NavbarData'
import '../index.css'
import {IconContext} from 'react-icons'

export const SidebarSp = ({ onSend }) => {
    const [overshoot, setOvershoot] = useState('')
    const [settlingTime, setSettlingTime] = useState('')
    const [varSteadyState, setVarSteadyState] = useState('')
    const [load, setLoad] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!overshoot) {
            alert('Por favor, digite um overshoot máximo para o sistema')
            return
        }
        if(!settlingTime) {
            alert('Por favor, digite um tempo de acomodação máximo para o sistema')
            return
        }
        if(!varSteadyState) {
            alert('Por favor, digite a maior variação permitida em regime permanente')
            return
        }

        if (!overshoot.match(/[0-9]+$/)){
            alert('Por favor, digite apenas números.')
            return 
        } 
        if (!settlingTime.match(/[0-9]+$/)){
            alert('Por favor, digite apenas números.')
            return 
        } 
        if (!varSteadyState.match(/[0-9]+$/)){
            alert('Por favor, digite apenas números.')
            return 
        } 
        onSend({ overshoot, settlingTime, varSteadyState, load })  
        
        setOvershoot('')
        setSettlingTime('')
        setVarSteadyState('')      


    }


    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>     
            <div className="navbar">
                {NavbarData.map((item, index) => {
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
        <nav className='nav-menu-active'>
            <h1 className="title-text">Project Achilles</h1> 
                <ul className='nav-menu-items'>
                
                <form className="form" onSubmit={onSubmit}>
                    <h2 className='form-text2'>Especificações</h2>
                    <div>
                        <li className='form-text'>Overshoot (%)</li>
                        <input className='input-bar' type="text" placeholder="Exemplo: 12.5" value={overshoot} onChange={(e) => setOvershoot(e.target.value)}/>
                    </div>

                    
                    <div>
                        <li className='form-text'>Tempo de acomodação (s)</li>
                        <input className='input-bar' type="text" placeholder="Exemplo: 4.5" value={settlingTime} onChange={(e) => setSettlingTime(e.target.value)}/>
                    </div>
                    
                    <div>
                        <li className='form-text'>Variação permitida em regime permanente (%)</li>
                        <input className='input-bar' type="text" placeholder="Exemplo: 1" value={varSteadyState} onChange={(e) => setVarSteadyState(e.target.value)}/>
                    </div>

                    <input type='submit' value='Enviar' className='btn' onClick={() => setLoad(true)}/> 
                                    
                </form>
            </ul>
        </nav>
            </IconContext.Provider>
        </>

    )
}

export default SidebarSp