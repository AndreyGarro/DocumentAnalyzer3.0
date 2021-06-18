import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Main from './pages/Main';
import Login from './pages/Login';
import Upload from './components/NavBar/UploadMenu';
import Progress from './components/NavBar/ProgressMenu';
import DocuConsult from './components/NavBar/WorkersMenu';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact> <Login/> </Route>
        <Route path="/Main" exact> <Main /> </Route>
        <Route path="/Upload" exact> <Upload /> </Route>
        <Route path="/Progress" excet> <Progress /> </Route>
        <Route path="/DocuConsult" exact> <DocuConsult /> </Route>
      </Switch>
    </Router>
  );
}

export default App;
