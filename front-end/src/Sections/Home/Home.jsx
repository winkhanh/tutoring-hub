import React, { Component } from "react";
import "./Home.css";

// Import components
import NavBarSearchable from "../../Components/NavBarSearchable/NavBarSearchable";
import Title from "../../Components/Title/Title";
import Tutors from "../../Components/Tutors/Tutors";
import Filter from "../../Components/Filter/Filter";
import AddTutorBox from "../../Components/AddTutorBox/AddTutorBox";

import loadingIcon from '../../Assets/loading-icon.png';
import tutorNotFound from '../../Assets/tutor-not-found.png';

class Home extends Component {

  state = {
    tutors: [],
    isLoading: true,
    searchField: "",
    courses: [],
    title: "All tutors",
  };

  componentDidMount() {
      fetch('http://localhost:3001/')
      .then(response => response.json())
      .then(data => {
          this.setState({
              tutors: [...this.state.tutors, ...data],
              isLoading: false,
              courses: this.getCourses([...data])
          });
      })
      .catch((error) => {
          console.log(error);
      }); 
  }

  handleSearch = (event) => {
    this.setState({
      searchField: event.target.value
    })
  }

  updateTutorState = (queryTutors, filterTitle) => {
    this.setState({
      tutors: [...queryTutors],
      title: `TUTORS FOR ${filterTitle}`
    })
  }

  getCourses = (tutors) => {
    let coursesSet = new Set();
    tutors.forEach(tutor => {
      tutor.courses.forEach(course => {
        coursesSet.add(course);
      });
    });
    return [...coursesSet];
  }

  render() {
    //Display the Loading Icon while waiting for loading.
    if (this.state.isLoading) {
        return(
          <div className={"tutors-component--loading"}>
              <img src={loadingIcon} alt=""/>
          </div>
        ) 
    }

    const filterTutors = this.state.tutors.filter(tutor => {
      return (tutor.firstName + " " + tutor.lastName).toLowerCase().includes(this.state.searchField.toLowerCase());
    });
    //
    this.getCourses(this.state.tutors);
    return (
      <div className="home-section">
        <NavBarSearchable handleSearch={this.handleSearch} />
        <div className="home-section--wrapper">
          <Title title={this.state.title.toUpperCase()} />
          <Filter coursesSet={this.state.courses} updateTutorState = {this.updateTutorState}/>
          {
            (filterTutors.length === 0) ? 
            <div className={"home-section--wrapper__notfound"}>
              <img src={tutorNotFound} alt=""/>
              <p>Sorry, we couldn't find your tutor <a href="/">Do you want to add a tutor?</a> </p>
            </div> :
            <Tutors tutors = {filterTutors} />
          }
          <AddTutorBox/>
        </div>
      </div>
    );
  }
}

export default Home;
