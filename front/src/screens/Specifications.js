import React, { useEffect, useState } from 'react';
import { apiBaseURL } from '../config/index';

import SidebarSp from '../components/SidebarSp'

import '../App.css'
import StepCLTemplate from '../components/StepCLTemplate';
import Loading from '../components/Loading';

function Specifications() {
  const [dataStorage, setDataStorage] = useState('')
  const [inputs, setInputs] = useState('')

  const [showChartAnalysis, setShowChartAnalysis] = useState(false);
  const [showLoading, setShowLoading] = useState(false);


  useEffect(() => {

    const x_axis_cl = sessionStorage.getItem("x_axis_cl");
    const y_axis_cl = sessionStorage.getItem("y_axis_cl");
    const overshoot = sessionStorage.getItem("overshoot");
    const peakTime = sessionStorage.getItem("PeakTime");
    const steadyStateValue = sessionStorage.getItem("SteadyStateValue");
    const peak = sessionStorage.getItem("Peak")
    const riseTime = sessionStorage.getItem("RiseTime");
    const settlingTime = sessionStorage.getItem("SettlingTime");
    const yss = sessionStorage.getItem("Yss")

    setDataStorage({x_axis_cl, y_axis_cl, overshoot, peak, steadyStateValue, peakTime, riseTime, settlingTime, yss})
  }, []);
  
  console.log("oq chega: ", dataStorage)

  const sendInfoCL = async (system) => {
    console.log(system.load)
    if(system.load === true){
      setShowChartAnalysis(false)
      setShowLoading(true)
    }

    await fetch( `${apiBaseURL}/check`,{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(system)
    })
    
    setInputs(system)
    setShowLoading(false)
    setShowChartAnalysis(true)

  }

  return (
     
      <>
        <SidebarSp onSend={sendInfoCL}/>
        { showLoading === true && <Loading />}
        { showChartAnalysis === true && <StepCLTemplate data={{dataStorage, inputs}} className="test"/>}
      </>
   
  );
}

export default Specifications;