import React, { useState } from 'react';

import SidebarSp from '../components/SidebarSp'

import '../App.css'
import StepCLTemplate from '../components/StepCLTemplate';
import Loading from '../components/Loading';
import {useDataContext} from '../components/DataContext'
import api from '../services/api';

function Specifications() {
  const [inputs, setInputs] = useState('')
  const [showChartAnalysis, setShowChartAnalysis] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const {
    dataAnalysis
  } = useDataContext()

  console.log('chegou em sp: ', dataAnalysis)

  const sendInfoCL = async (system) => {
    console.log('system', system)
    if(system.load === true){
      setShowChartAnalysis(false)
      setShowLoading(true)
    }

    try {
      const {data} = await api.post('/check',{
        ...system
      })
      console.log('Response: ', data)

      setInputs(system)
      setShowLoading(false)
      setShowChartAnalysis(true)
    }catch(error){
      console.error(error)
    }

  }

  return (
     
      <>
        <SidebarSp onSend={sendInfoCL}/>
        { showLoading === true && <Loading />}
        { showChartAnalysis === true && <StepCLTemplate input_data={dataAnalysis} specifications={inputs} className="test"/>}
      </>
   
  );
}

export default Specifications;