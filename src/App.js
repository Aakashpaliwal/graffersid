import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Redirect } from "react-router-dom";

import { Newarea } from "./components/Area/Newarea";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Route path={process.env.PUBLIC_URL + "/"} exact component={Home} />

        <Route
          exact
          path={process.env.PUBLIC_URL + "/newarea"}
          component={Newarea}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
