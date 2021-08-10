import React, { useEffect, useState } from 'react'
import MathJax from 'react-mathjax-preview'


const ShowInput = ({ input_data }) => {
    const [systemShow,setSystemShow] = useState('')
    const [controllerShow,setControllerShow] = useState('')

    useEffect(() => {
        if(input_data) {
            let hnum = input_data.hnum
            let hden = input_data.hden
            let gnum = input_data.gnum
            let gden = input_data.gden

            const strToArray = (text) => {
                let array = []
                let value
                let myStr = text.split(',')
                for (let i = 0; i < myStr.length; i++){
                    value = parseFloat(myStr[i])
                    if(!isNaN(value)){
                        array.push(value)
                    }
                    continue
                }
                return array
            }
            const Hn = strToArray(hnum)
            const Hd = strToArray(hden)
            const Gn = strToArray(gnum)
            const Gd = strToArray(gden)     
            
            const formatMathExpression = (value) => {
                let mathExpression = ''
                let numberExpression = ''
                let power = value.length - 1 
                for(let i = 0; i < value.length; i++){ 
                    numberExpression = ` ${value[i]}s^${power} `   
                    if(value[i] === 0){
                        numberExpression = numberExpression.replace(`${value[i]}s^${power}`,'')
                    }                      
                    if(value[i] > 0 && i>0){ 
                        numberExpression = ` + ${value[i]}s^${power} `
                    }              
                    if(power === 1){
                        numberExpression = numberExpression.replace(`^${power}`,'')
                    }
                    if(Math.abs(value[0]) === 1 && value.length > 1){
                        numberExpression = numberExpression.replace(value[0],'')
                    }                     
                    mathExpression += numberExpression 
                    power--                      
                }
                
                mathExpression = mathExpression.replace('s^0','')
                console.log(mathExpression)
                return mathExpression
            }
            const system_num = formatMathExpression(Hn)
            const system_den = formatMathExpression(Hd)
           
            const controller_num = formatMathExpression(Gn)
            const controller_den = formatMathExpression(Gd)
            
            const system = `\`(${system_num})/(${system_den})\``
            const controller = `\`(${controller_num})/(${controller_den})\``

            const mathSystem = String.raw`${system}`
            const mathController = String.raw`${controller}`

            setSystemShow(mathSystem)
            setControllerShow(mathController)                
            

        }},[input_data])
    return (
        <div >
            <li className='form-text'>Processo</li>
            <div className="show-input">
                <MathJax math={systemShow} />
            </div>
            <li className='form-text'>Controlador</li>
            <div className="show-input">
                <MathJax math={controllerShow} />
            </div>
        </div>
    );
}

export default ShowInput