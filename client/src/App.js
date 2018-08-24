import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
