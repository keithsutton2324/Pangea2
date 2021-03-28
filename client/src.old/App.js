// NOTE: had to run 'npm i --save react' to get this to compile
//import React, { Component } from "react";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Members from "./pages/Members";
import logo from "./logo.svg";
import bkgd from "./pangea-world-map.jpg"; 
import "./App.css";

/////////////////////////
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Pangea Translator App</h2>
        </div>
        <p className="App-intro"></p>
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <p><Link to="/Signup" class="clickme">Signup</Link></p>
            </li>
            <li>
              <p><Link to="/Login" class="clickme">Login</Link></p>
            </li>
            <li>
              <p><Link to="/Members" class="clickme">Members</Link></p>
            </li>
            <li>
              <p><Link to="/Logout" class="clickme">Logout</Link></p>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/Signup">
            <Signup />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Members">
            <Members />
          </Route>
          <Route path="/Logout">
            <Logout />
          </Route>
        </Switch>
        <div>
          <img src={bkgd} className="App-background" alt="pangea map" />
        </div>
      </div>
    </Router>
  );
}
/////////////////////////
/*
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Pangaea Translator App</h2>
        </div>
        <p className="App-intro">
        </p>
        <noscript>
        <Signup />
        <Login />
        </noscript>
      </div>
    );
  }
}

export default App;
*/
