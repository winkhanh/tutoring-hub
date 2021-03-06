import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
// Import components
import Home from "./Sections/Home/Home";
import Profile from "./Sections/Profile/Profile";
import Review from "./Sections/Review/Review";
import AddTutor from "./Sections/AddTutor/AddTutor";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/tutor/:id" component={Profile} />
          <Route path="/tutor/:id/rate" component={Review} />
          <Route exact path="/addtutor" component={AddTutor} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
