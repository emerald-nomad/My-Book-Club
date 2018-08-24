import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
