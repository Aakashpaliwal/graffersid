import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Area.css";
import axios from "axios";
import ImageUploader from "react-images-upload";
// import { api_url } from '../../services/url';
import { API_URL } from "../../services/url";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
// import {geolocated} from 'react-geolocated';
import Geolocation from "react-geolocation";
import getCurrentPosition from "react-geolocation";
import latitude from "react-geolocation";
import longitude from "react-geolocation";
import PropTypes from "prop-types";
import SimpleReactValidator from "simple-react-validator";
export class Area extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ui_area_name: "",
      // pictures: [],
      ui_latitude: null,
      ui_longitude: null,
      deg: ""
      // image :""
    };
    //    this.onDrop = this.onDrop.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.validator = new SimpleReactValidator();
    // this.distancekm = this.distancekm.bind(this)
    // this.deg2rad = this.deg2rad.bind(this)
  }
  // onDrop(picture) {
  //     this.setState({
  //         pictures: this.state.pictures.concat(picture),
  //     });
  // }
  deg2rad = deg => {
    deg.preventDefault();
    // var deg
    // var degree =  this.state.deg * (Math.PI/180)
    // console.log(degree)

    Number.prototype.toRad = function() {
      return (this * Math.PI) / 180;
    };

    var lat2 = 42.741;
    var lon2 = -71.3161;
    var lat1 = 42.806911;
    var lon1 = -71.290611;

    var R = 6371; // km
    //has a problem with the .toRad() method below.
    var x1 = lat2 - lat1;
    var dLat = x1.toRad();
    var x2 = lon2 - lon1;
    var dLon = x2.toRad();
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1.toRad()) *
        Math.cos(lat2.toRad()) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    console.log("distance here", d);
  };
  // distancekm () {
  //   var lat1 = this.state.ui_latitude
  //   var lon1 = this.state.ui_longitude
  //   var lat2, lon2
  //   // var deg2rad
  //   var R = 6371; // Radius of the earth in km
  //   var dLat = deg2rad(lat2-lat1);  // deg2rad below
  //   var dLon = deg2rad(lon2-lon1);
  //   var a =
  //     Math.sin(dLat/2) * Math.sin(dLat/2) +
  //     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
  //     Math.sin(dLon/2) * Math.sin(dLon/2)
  //     ;
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  //   var d = R * c; // Distance in km
  //   return d;

  //   console.log(d)
  // }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          ui_latitude: position.coords.latitude,
          ui_longitude: position.coords.longitude
        });
      },
      err => console.log(err)
    );

    // this.distancekm()
    // this.deg2rad()
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  getWebsite = () => {
    fetch("/");
  };
  async onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    if (this.validator.allValid()) {
      let body = {
        ui_area_name: this.state.ui_area_name
      };
      try {
        const response = await axios.post(
          `${API_URL}area/add`,
          body,
          (axios.defaults.headers.common["authorization"] =
            "Bearer " + authService.getToken())
        );
        //   .then(console.log(this.state));

        console.log(response);
        if (response.data.success) {
          alert(response.data.msg);
          this.props.history.push("/ViewArea");
        } else {
          alert(response.data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  }

  getCurrentPosition() {
    console.log(this.prop.latitude);
    //   {this.props.getCurrentPosition}
  }

  //   fileSelectedHandler = e => {
  //       e.preventDefault();
  //     let files = e.target.files;
  //     console.log('data',files[0]);
  //   }
  //   onchange = e => {
  //         let files  = e.target.files
  //         console.warn('data file', files)
  //         let reader = new FileReader();
  //         reader.readAsDataURL(files[0])
  //         reader.onload = (e) => {
  //                 console.warn('image data' ,e.target.result)
  //         }
  //   }
  render() {
    return (
      <div className="skin-blue fixed-layout">
        <div className="page-wrapper">
          <div className="container-fluid">
            <div className="row page-titles">
              <div className="col-md-5 align-self-center">
                {/* <h4 className="text-themecolor">Forms</h4> */}
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Master Area
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>

          {/*Form content begin */}

          <div className="product-form-upper">
            <div className="container">
              <div className="below-custom-form below-custom-blog-form">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h3>Area</h3>
                    <br />
                  </div>
                </div>

                <form className="custom-content-form">
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label for="inputSubcategory">Enter Location</label>
                      <br />
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.ui_area_name}
                        name="ui_area_name"
                        onChange={e => this.change(e)}
                      />
                      <span className="text-danger">
                        {this.validator.message(
                          "Area Name",
                          this.state.ui_area_name,
                          "required|alpha_space"
                        )}
                      </span>
                    </div>
                  </div>

                  <button
                    class="btn btn-primary"
                    onClick={e => this.onSubmit(e)}
                  >
                    Submit
                  </button>

                  {/* <br />
  <input type="text" className="form-control" value={this.state.deg} name="deg" onChange = {e => this.change(e)}/>
  <br />
  <button class="btn btn-primary" onClick = {deg => this.deg2rad(deg)}>Submit</button> */}
                </form>
                <br />
                {/* <Geolocation 
  lazy 
  render={({getCurrentPosition, fetchingPosition}) => (
    <div>
      <button onClick={getCurrentPosition}>Get Current Position</button>
      <div>Fetching Position: {fetchingPosition}</div>
    </div>
  )}
/> */}
                {/* <Geolocation
  lazy render={({
    fetchingPosition,
    position: { coords: { latitude, longitude } = {} } = {},
    error,
    getCurrentPosition
  }) =>
    <div>
      <button onClick={getCurrentPosition}>Get Position</button>
      {error &&
        <div>
          {error.message}
        </div>}
      <pre>
        latitude: {latitude}
        longitude: {longitude}
      </pre>
      <pre>
        new lo:{this.state.ui_longitude}
        new la:{this.state.ui_latitude}
      </pre>
    </div>}
/> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Area;
