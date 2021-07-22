import React, { useEffect, useState } from 'react'
import MathJax from 'react-mathjax-preview'


const ShowInput = ({ input_data }) => {
    const [ascii,setAscii] = useState('')
    useEffect(() => {
        if(input_data) {
            let hnum = input_data.hnum
            let hden = input_data.hden
            let gnum = input_data.gnum
            let gden = input_data.gden
            console.log(hnum,hden)
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
            console.log(Hn, Hd, Gn, Gd)
            
            const formatMathExpression = (value) => {
                let mathExpression = ''
                let numberExpression = ''
                for(let i = 0; i < value.length; i++){
                    numberExpression = ` ${value[i]} `
                    if(value[i] > 0 && i>0){
                        numberExpression = ` + ${value[i]} `
                    }
                    mathExpression += numberExpression
                }
                console.log(mathExpression)
                return mathExpression
            }
            const system_num = formatMathExpression(Hn)
            const system_den = formatMathExpression(Hd)
            const controller_num = formatMathExpression(Gn)
            const controller_den = formatMathExpression(Gd)

            const system = `(${system_num})/(${system_den})`
            const controller = `${controller_num}/${controller_den}`

            const asciimath = `\`${system}\``
            const mathSystem = String.raw`  
            ${asciimath}`
            setAscii(mathSystem)

        }},[input_data])
    return (
        <div className="show-input">
            {/* <MathJax math={system}/> */}
            {/* {system}
            {controller} */}
            <MathJax math={ascii} />

        </div>
    );
}

export default ShowInput