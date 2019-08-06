import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Employe.css";
import axios from "axios";
import { API_URL } from "../../services/url";
import authService from "../../services/auth-service";
import SimpleReactValidator from "simple-react-validator";
export class Employe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ui_employe_name: "",
      ui_employe_alias: "",
      ui_area_id: 1,
      userdata: [],
      userdatalength: "",
      ui_email: "",
      ui_mobile: "",
      ui_user_name: "",
      ui_password: ""
    };
    this.validator = new SimpleReactValidator();
  }
  componentWillMount() {
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
        console.log("employe view area");
        console.log(response.data.area_data);
        const data = response.data.area_data;
        this.setState({ userdata: data });
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
        console.log(this.state);
        const response = await axios.post(
          `${API_URL}employe/add`,
          this.state,
          (axios.defaults.headers.common["authorization"] =
            "Bearer " + authService.getToken())
        );
        //   .then(console.log(this.state))
        console.log(response);
        if (response.data.success === true) {
          alert(response.data.msg);

          this.props.history.push("/ViewEmploye");
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
    const equipmentss = [...this.state.userdata];
    console.log("after render");
    console.log(equipmentss);
    // let userdatalength;
    let locationdata = null;
    // console.log(this.state.userdata)
    if (equipmentss.length === 0) {
      locationdata = (
        <div>
          <select
            className="form-control"
            value={this.state.ui_area_id}
            name="ui_area_id"
            onChange={e => this.change(e)}
            disabled
          >
            <option value="choose..">Choose....</option>
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
          <small>Area Has Not Been Addedd Yet For Location </small>
        </div>
      );
    } else {
      locationdata = (
        <select
          className="form-control"
          value={this.state.ui_area_id}
          name="ui_area_id"
          onChange={e => this.change(e)}
        >
          <option value="choose..">Choose....</option>
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
      );
    }

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
                      Master Employe
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
                    <h3>Employe</h3>
                    <br />
                  </div>
                </div>

                <form className="custom-content-form">
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputCategory">Enter Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="ui_employe_name"
                        value={this.state.ui_employe_name}
                        onChange={e => this.change(e)}
                      />
                       <span className="text-danger">
                        {this.validator.message(
                          "Employe Name",
                          this.state.ui_employe_name,
                          "required|alpha_space"
                        )}
                      </span>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputCategory">Enter Alias</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="ui_employe_alias"
                        value={this.state.ui_employe_alias}
                        onChange={e => this.change(e)}
                      />
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputCategory">Enter Email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="ui_email"
                        value={this.state.ui_email}
                        onChange={e => this.change(e)}
                      />
                       <span className="text-danger">
                        {this.validator.message(
                          "Email",
                          this.state.ui_email,
                          "required|email"
                        )}
                      </span>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputCategory">Enter Mobile Nmber</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="ui_mobile"
                        value={this.state.ui_mobile}
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
                      <label for="inputCategory">Enter User Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="ui_user_name"
                        value={this.state.ui_user_name}
                        onChange={e => this.change(e)}
                      />
                       <span className="text-danger">
                        {this.validator.message(
                          "User Name",
                          this.state.ui_user_name,
                          "required|aplha_num_space"
                        )}
                      </span>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputCategory">Enter Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder=""
                        name="ui_password"
                        value={this.state.ui_password}
                        onChange={e => this.change(e)}
                      />
                       <span className="text-danger">
                        {this.validator.message(
                          "Password",
                          this.state.ui_password,
                          "required"
                        )}
                      </span>
                    </div>

                    <div class="form-group col-md-12">
                      <label for="inputSubcategory">Enter Location</label>
                      <br />
                      {locationdata}
                      <span className="text-danger">
                        {this.validator.message(
                          "Location",
                          this.state.ui_area_id,
                          "required"
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

export default withRouter(Employe);
