import React from 'react'

const ShowInput = ({ input_data }) => {
    if(input_data !== "") {
        var hnum = input_data.hnum
        var hden = input_data.hden
        var gnum = input_data.gnum
        var gden = input_data.gden
        console.log(hnum,hden)
        const strToArray = (text) => {
            let array = []
            var value
            var myStr = text.split(',')
            for (var i = 0; i < myStr.length; i++){
                value = parseFloat(myStr[i])
                if(!isNaN(value)){
                    array.push(value)
                }
                continue
            }
            return array
        }
        var Hn = strToArray(hnum)
        var Hd = strToArray(hden)
        var Gn = strToArray(gnum)
        var Gd = strToArray(gden)

        console.log(Hn, Hd, Gn, Gd)
        
        const formatMathExpression = (value) => {
            var mathExpression = ''
            var numberExpression = ''
            for(var i = 0; i < value.length; i++){
                numberExpression = ` ${value[i]} `
                if(value[i] > 0){
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

        var system = `${system_num}/${system_den}`
        var controller = `${controller_num}/${controller_den}`
    }
    return (
        <div className="show-input">
            {/* <MathJax math={system}/> */}
            {system}
            {controller}
        </div>
    );
}

export default ShowInput