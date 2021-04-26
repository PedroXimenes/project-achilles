import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom' 

import Header from './components/Header'
import BodeDiagram from './components/BodeDiagram'
import RootLocus from './components/RootLocus'
import Footer from './components/Footer'
import StepResponse from './components/StepResponse'
import SetInfo from './components/SetInfo';
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

import './App.css';
import Loading from './components/Loading';
//import Switch from 'react-bootstrap/esm/Switch';

function App() {
  // const [placeholder, setPlaceholder] = useState('Hi');
  // const [placeholder2, setPlaceholder2] = useState('Hello');
  const [systemArrayOL, setSystemArrayOL] = useState([]);
  const [showChartAnalysis, setShowChartAnalysis] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  // const [systemArrayCL, setSystemArrayCL] = useState([]);
  // const [showChartProject, setShowChartProject] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/home').then(res => res.json()).then(data => {
      //fetch('http://34.66.118.33:5000/home').then(res => res.json()).then(data => {
      //setPlaceholder(data.result);
    });
  }, []);
  useEffect(() => {
      //fetch('http://34.66.118.33:5000/help').then(res => res.json()).then(data => {
      fetch('/help').then(res => res.json()).then(data => {
      //setPlaceholder2(data.result);
    });
  }, []);

  const sendInfoOL = async (system) => {
    //const res = await fetch('http://34.66.118.33:5000/analysis',{

      console.log(system)
      if(system.load === true){
        setShowChartAnalysis(false)
        setShowLoading(true)
      }

      const res = await fetch('http://localhost:5000/analysis',{
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(system)
    })
    
    const data = await res.json()
    console.log(data)
    setShowLoading(false)

    var input_data = []
    data.x_axis_ol.forEach((element, index) => {
      input_data[index] = {"x": element, "y": data.y_axis_ol[index]}
    });
    //
    setSystemArrayOL(data)
    setShowChartAnalysis(true)
  }

  // const sendInfoCL = async (system) => {
  //   // const res = await fetch('http://34.66.118.33:5000/project',{
  //     const res = await fetch('http://localhost:5000/project',{
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json'
  //       },
  //       body: JSON.stringify(system)
  //   })
    
  //   const data = await res.json()
   
  //   setSystemArrayCL(data)
  //   setShowChartProject(true)
  // }

  return (
    // <Router>
    //   {/* <div className="container"> */}
    //   <div>
    //     <Header />
    //     <Route path='/' exact render={(props) => (
    //       <>
    //         <p>Sistema a ser Controlado: {placeholder}</p>
    //         <Link to="/analysis" className="btn">Começar</Link>
    //       </>
    //     )}/>
    //     <Route path='/analysis' exact render={(props) => (
    //       <>
    //         <p>Sistema a ser Controlado:</p>
    //         <SetInfo onSend={sendInfoOL}/>
    //        { showChartAnalysis === true && <StepResponse input_data={systemArrayOL} className="test"/>}
    //       </>
    //     )}/>
    //     <Route path='/project' exact render={(props) => (
    //       <>
    //       <p>Controlador:</p>
    //       <SetInfo onSend={sendInfoCL}/>
    //       {showChartProject === true && <StepResponse input_data={systemArrayCL} />}
    //       {showChartProject === true && <BodeDiagram input_data={systemArrayCL}/>}
    //       {showChartProject === true && <RootLocus input_data={systemArrayCL}/>}
    //     </>
    //     )}/>
    //     <Navbar />
    //     <Switch>
    //       <Route path='/help' exact render={(props) => (
    //         <>

    //           {/* <p>Aqui é {placeholder2}</p> */}
    //         </>
    //       )}/>
    //     </Switch>
    //     {/* <Footer /> */}
    //   </div>
    // </Router>
     <Router >
     <div className="page">
       <Switch>
         <Route path='/' exact render={(props) => (
           <>
           <Navbar onSend={sendInfoOL}/>
           { showLoading === true && <Loading />}
           { showChartAnalysis === true && <StepResponse input_data={systemArrayOL} className="test"/>}
           { showChartAnalysis === true && <BodeDiagram input_data={systemArrayOL} className="test"/>}
           { showChartAnalysis === true && <RootLocus input_data={systemArrayOL} className="test"/>}
           </>
           
         )}/>
    
       </Switch>
       </div>
       {/* <Footer /> */}
   </Router>

  );
}

export default App;