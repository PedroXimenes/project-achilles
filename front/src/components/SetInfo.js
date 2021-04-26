import { useState } from 'react'

const SetInfo = ({ onSend }) => {
    const [num, setNum] = useState('')
    const [den, setDen] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!num) {
            alert('Por favor, digite um numerador')
            return
        }
        if(!den) {
            alert('Por favor, digite um denominador')
            return
        }

        let hnum = sessionStorage.getItem("@control/hnum")
        let hden = sessionStorage.getItem("@control/hden")
        onSend({ num, den, hnum, hden })

        setNum('')
        setDen('')
    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
           <div className='form-control'>
                <label>Numerador</label>
                <input type='text' placeholder='Adicionar Numerador' value={num} onChange={(e) => setNum(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Denominador</label>
                <input type='text' placeholder='Adicionar Denominador' value={den} onChange={(e) => setDen(e.target.value)}/>
            </div> 

            <input type='submit' value='Enviar' className='btn btn-block'></input>  
        </form>
    )
}

export default SetInfo
