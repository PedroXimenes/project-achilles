import React, { useState, useEffect } from 'react';
import { apiBaseURL } from '../config/index';

import BodeDiagram from '../components/BodeDiagram'
import RootLocus from '../components/RootLocus'
import StepResponse from '../components/StepResponse'
import Sidebar from '../components/Sidebar'
import Loading from '../components/Loading'
import '../App.css'

import useDataContext from '../components/DataContext'

function Analysis() {
  const [dataAnalysis, setDataAnalysis] = useState([]);
  const [showChartAnalysis, setShowChartAnalysis] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  // const {
  //   dataAnalysis, setDataAnalysis,
  // } = useDataContext()

  useEffect(() => {
    fetch(`${apiBaseURL}/analysis`).then(res => res.json());
  }, []);

  const sendInfoOL = async (system) => {
    console.log(system)
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

    sessionStorage.setItem("x_axis_cl", data.x_axis_cl);
    sessionStorage.setItem("y_axis_cl", data.y_axis_cl);
    sessionStorage.setItem("overshoot", data.step_info.Overshoot2);
    sessionStorage.setItem("PeakTime", data.step_info.PeakTime);
    sessionStorage.setItem("SteadyStateValue", data.step_info.SteadyStateValue);
    sessionStorage.setItem("Peak", data.step_info.Peak);
    sessionStorage.setItem("RiseTime", data.step_info.RiseTime);
    sessionStorage.setItem("SettlingTime", data.step_info.SettlingTime);
    sessionStorage.setItem("Yss", data.yss);

    setDataAnalysis(data)
    setShowChartAnalysis(true)
  }
  
  return (
     
      <>
        <Sidebar onSend={sendInfoOL}/>
        { showLoading === true && <Loading />}
        { showChartAnalysis === true && <StepResponse input_data={dataAnalysis} className="test"/>}
        { showChartAnalysis === true && <BodeDiagram input_data={dataAnalysis} className="test"/>}
        { showChartAnalysis === true && <RootLocus input_data={dataAnalysis} className="test"/>}
      </>
   
  );
}

export default Analysis;
