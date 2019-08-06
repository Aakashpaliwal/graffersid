import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Customer.css";
import axios from "axios";
import { API_URL } from "../../services/url";
// import { api_url } from '../../services/url';
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import getCurrentPosition from "react-geolocation";
import latitude from "react-geolocation";
import longitude from "react-geolocation";
import SimpleReactValidator from "simple-react-validator";
export class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ui_name: "",
      ui_owner_name: "",
      ui_mobile: "",
      ui_email: "",
      ui_location: "",
      ui_latitude: null,
      ui_longitude: null,
      userdata: [],
      ui_area: ""
    };
    this.validator = new SimpleReactValidator();
  }
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
    this.handleClick();
  }
  handleClick() {
    axios
      .get(
        `${API_URL}area/view`,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      )
      .then(response => {
        console.log("Area view");
        console.log(response.data.area_data);
        const data = response.data.area_data;
        if (response.data.success) {
          this.setState({ userdata: data });
        }
      })
      .catch(error => {
        console.log(error);
      });
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
    if (this.validator.allValid()) {
      try {
        Number.prototype.toRad = function() {
          return (this * Math.PI) / 180;
        };

        var lat2 = 42.741;
        var lon2 = -71.3161;
        var lat1 = this.state.ui_latitude;
        var lon1 = this.state.ui_longitude;
        // console.log('latitude',this.state.ui_latitude)

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

        console.log(this.state);
        const response = await axios.post(
          `${API_URL}user/add`,
          this.state,
          (axios.defaults.headers.common["authorization"] =
            "Bearer " + authService.getToken())
        );
        //   .then(console.log(this.state));
        // .then(function(response){
        //     console.log('reposnse here' ,response)
        console.log(response);
        if (response.data.success) {
          alert(response.data.msg);
          this.props.history.push("/ViewCustomer");
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

  fileSelectedHandler = e => {
    e.preventDefault();
    let files = e.target.files;
    console.log("data", files[0]);
  };
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
                      Master Shop
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
                    <h3>Shop</h3>
                    <br />
                  </div>
                </div>

                <form className="custom-content-form" autoComplete="OFF">
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputCategory">Enter Shop Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="ui_name"
                        value={this.state.ui_name}
                        onChange={e => this.change(e)}
                      />
                       <span className="text-danger">
                        {this.validator.message(
                          "Shop Name",
                          this.state.ui_name,
                          "required|alpha_space"
                        )}
                      </span>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputSubcategory">
                        Enter Shop Owner Name
                      </label>
                      <br />
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="ui_owner_name"
                        value={this.state.ui_owner_name}
                        onChange={e => this.change(e)}
                      />
                       <span className="text-danger">
                        {this.validator.message(
                          "Shop Owner Name",
                          this.state.ui_owner_name,
                          "required|alpha_space"
                        )}
                      </span>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputSubcategory">Enter Mobile Number</label>
                      <br />
                      <input
                        type="number"
                        className="form-control"
                        placeholder=""
                        value={this.state.ui_mobile}
                        name="ui_mobile"
                        onChange={e => this.change(e)}
                      />
                       <span className="text-danger">
                        {this.validator.message(
                          "Mobile Number",
                          this.state.ui_mobile,
                          "required|numeric|min:10|max:10"
                        )}
                      </span>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputSubcategory">Enter E - Mail</label>
                      <br />
                      <input
                        type="email"
                        className="form-control"
                        name="ui_email"
                        value={this.state.ui_email}
                        onChange={e => this.change(e)}
                      />
                    </div>
                    <div class="form-group col-md-12">
                      <label for="inputSubcategory">Enter Shop Area</label>
                      <br />
                      <select
                        className="form-control"
                        name="ui_area"
                        value={this.state.ui_area}
                        onChange={e => this.change(e)}
                      >
                        <option value="No Choice">Choose....</option>
                        {this.state.userdata ? (
                          this.state.userdata.map(function(item, id) {
                            return (
                              <option value={item.area_id} key={id}>
                                {item.area_name}
                              </option>
                            );
                          }, this)
                        ) : (
                          <span>Data is loading....</span>
                        )}
                      </select>
                      <span className="text-danger">
                        {this.validator.message(
                          "Area",
                          this.state.ui_area,
                          "required"
                        )}
                      </span>
                    </div>
                    <div class="form-group col-md-12">
                      <label for="inputSubcategory">Enter Shop Location</label>
                      <br />
                      <textarea
                        className="form-control"
                        value={this.state.ui_location}
                        name="ui_location"
                        onChange={e => this.change(e)}
                      />
                       <span className="text-danger">
                        {this.validator.message(
                          "Shop Location",
                          this.state.ui_location,
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Customer;
