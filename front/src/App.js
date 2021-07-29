import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
import './App.css';

import Analysis from './screens/Analysis'
import Help from './screens/Help';
import About from './screens/About';
import Specifications from './screens/Specifications';
import DataProvider from './components/DataContext';


function App() {

  return (
    <DataProvider>
     <Router >
     <div className="page">
       <Switch>
          <Route component={Analysis} path='/' exact render/>
          <Route component={Help} path='/help' exact render/>
          <Route component={About} path='/about' exact render/>
          <Route component={Specifications} path='/check' exact render/>

       </Switch>
       </div>
   </Router>
   </DataProvider>

  );
}

export default App;