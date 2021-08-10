import React, { useState, useEffect } from 'react';
// import { apiBaseURL } from '../config/index';

import BodeDiagram from '../components/BodeDiagram'
import RootLocus from '../components/RootLocus'
import StepResponse from '../components/StepResponse'
import Sidebar from '../components/Sidebar'
import Loading from '../components/Loading'
import '../App.css'

import {useDataContext} from '../components/DataContext'
import api from '../services/api';

function Analysis() {
  const [showChartAnalysis, setShowChartAnalysis] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const {
    dataAnalysis, setDataAnalysis,
  } = useDataContext()


  const loadAnalysis = async () => {
    try {
      const response = await api.get('/analysis')
      console.log('Response: ', response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadAnalysis()
  }, []);

  const sendInfoOL = async (system) => {
    console.log(system)
    if(system.load === true){
      setShowChartAnalysis(false)
      setShowLoading(true)
    }
    
    try {
      const {data} = await api.post('/analysis',{
        ...system
      })
      console.log('Response: ', data)
        
      setShowLoading(false)

      setDataAnalysis(data)
      setShowChartAnalysis(true)

    } catch (error) {
      console.error(error)
    }
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
