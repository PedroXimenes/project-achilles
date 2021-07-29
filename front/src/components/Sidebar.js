import { Link } from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import {NavbarData} from './NavbarData'
import '../index.css'
import {IconContext} from 'react-icons'
import ShowInput from './ShowInput'
import {useDataContext} from './DataContext'

export const Sidebar = ({ onSend }) => {
    const [hnum, setHnum] = useState('')
    const [hden, setHden] = useState('')
    const [gnum, setGnum] = useState('')
    const [gden, setGden] = useState('')
    const [load, setLoad] = useState(false)
    const [dataForShow, setDataForShow] = useState('')
    const {
       input, setInput,
    } = useDataContext()

    useEffect(()=>{
        setHnum(input.hnum || '')
        setHden(input.hden || '')
        setGnum(input.gnum || '')
        setGden(input.gden || '')
        console.log('dataAnalysis',input)
    },[input])

    const onSubmit = (e) => {
        e.preventDefault()

        console.log('tipo: ', typeof hnum, 'hnum: ', hnum)


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
        
        setDataForShow({hnum, hden, gnum, gden})
    
        setInput({hnum, hden, gnum, gden})

        onSend({hnum, hden, gnum, gden, load})  


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
        </IconContext.Provider>
        <nav className='nav-menu-active'>
            <h1 className="title-text">Project Achilles</h1> 
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
                    <input type='submit' value='Enviar' className='btn' onClick={() => setLoad(true)}/> 
                    <div className="line"/>
                <ShowInput input_data={dataForShow}/>                    
                </form>
            </ul>
        </nav>
        </>

    )
}

export default Sidebar