import React, { useEffect, useState } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export const CheckBounds = () => { 
    const [checkBounds, setCheckBounds] = useState(false)
    const [screenShow, setScreenShow] = useState('')
    const checkBoundsButton = [
    {
        title: 'Check Bounds',
        icon: <AiOutlineCheckCircle className="checkBounds-icon"/>,
        className: 'checkBounds-text',
        path: '/check'
    },
    ]
    // useEffect(()=> {
    //     if(checkBounds === true){
    //         setScreenShow("screenBox")
    
    //     }
    //     else{

    //         setScreenShow("")
    //     }
    // },[checkBounds])
   

    return(
        <>
            {screenShow}
            <div className="checkBoundsButton" onClick={() => setCheckBounds(!checkBounds)}>
                {checkBoundsButton.map((item, index) => {
                    return (
                        <li key={index} className={item.className}>
                            <Link to={item.path}>
                                {item.icon}
                    <span className="span2">{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </div>
        </>
    )
}

export default CheckBounds