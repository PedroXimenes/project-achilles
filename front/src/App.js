import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import { Home, Inputs, Analysis, Help, About, Specifications } from "./screens";
import DataProvider from "./components/DataContext";

function App() {
  return (
    <DataProvider>
      <Router>
        <>
          <Switch>
            <Route component={Home} path="/" exact render />
            <Route component={Inputs} path="/inputs" exact render />
            <Route component={Analysis} path="/analysis" exact render />
            <Route component={Help} path="/help" exact render />
            <Route component={About} path="/about" exact render />
            <Route component={Specifications} path="/check" exact render />
          </Switch>
        </>
      </Router>
    </DataProvider>
  );
}

export default App;
