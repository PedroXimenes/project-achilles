import React, { useState, useEffect } from 'react';
import { apiBaseURL } from '../config/index';

import BodeDiagram from '../components/BodeDiagram'
import RootLocus from '../components/RootLocus'
import StepResponse from '../components/StepResponse'
import Sidebar from '../components/Sidebar'
import Loading from '../components/Loading'

import '../App.css'

function Analysis() {
  const [systemAnalysis, setSystemAnalysis] = useState([]);
  const [showChartAnalysis, setShowChartAnalysis] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    fetch(`${apiBaseURL}/home`).then(res => res.json());
  }, []);

  const sendInfoOL = async (system) => {
    if(system.load === true){
      setShowChartAnalysis(false)
      setShowLoading(true)
    }

    const res = await fetch( `${apiBaseURL}/analysis`,{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(system)
    })
    
    const data = await res.json()
    console.log('Data: ' + data)
    setShowLoading(false)

    var input_data = []
    data.x_axis_ol.forEach((element, index) => {
      input_data[index] = {"x": element, "y": data.y_axis_ol[index]}
    });

    setSystemAnalysis(data)
    setShowChartAnalysis(true)
  }

  return (
     
      <>
        <Sidebar onSend={sendInfoOL}/>
        { showLoading === true && <Loading />}
        { showChartAnalysis === true && <StepResponse input_data={systemAnalysis} className="test"/>}
        { showChartAnalysis === true && <BodeDiagram input_data={systemAnalysis} className="test"/>}
        { showChartAnalysis === true && <RootLocus input_data={systemAnalysis} className="test"/>}
      </>
   
  );
}

export default Analysis;