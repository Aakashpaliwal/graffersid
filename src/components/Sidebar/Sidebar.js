import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import axios from "axios";
import { API_URL } from "../../services/url";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      userdata: []
    };
  }

  componentDidMount() {
    this.handleClick();
  }
  handleClick() {
    axios
      .get(
        `${API_URL}profile/detail`,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      )
      .then(response => {
        console.log(response);
        console.log(response.data.company_data);
        const data = response.data.company_data;
        this.setState({ userdata: data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="skin-blue">
        <div className="left-sidebar">
          <div className="scroll-sidebar custom-scroll-sidebar-bg">
            <nav className="sidebar-nav">
              <ul id="sidebarnav">
                {/* <li>
                         <a className="has-arrow waves-effect waves-dark" href="#company" data-toggle="collapse" data-target="#company"><i className="fa fa-cubes" aria-hidden="true"></i><span className="hide-menu">Master Company</span></a>
                            <ul aria-expanded="false" className="collapse" id="company">
                            <Link to ="/ViewCompany"><li><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Company</li></Link>
                            </ul>
                        </li> */}
                <li>
                  <a
                    className="has-arrow waves-effect waves-dark"
                    href="#submenu4"
                    data-toggle="collapse"
                    data-target="#submenu4"
                  >
                   <i class="fa fa-truck" aria-hidden="true"></i>
                    <span className="hide-menu"> Orders</span>
                  </a>
                  <ul aria-expanded="false" className="collapse" id="submenu4">
                    <Link to={process.env.PUBLIC_URL + "/newarea"}>
                      <li>
                        <i className="fa fa-cube" aria-hidden="true" />
                        &nbsp;&nbsp;All
                      </li>
                    </Link>
                    <Link to={process.env.PUBLIC_URL + "/newarea"}>
                      <li>
                        <i className="fa fa-stop-circle-o" aria-hidden="true" />
                        &nbsp;&nbsp;Pending
                      </li>
                    </Link>
                    <Link to={process.env.PUBLIC_URL + "/newarea"}>
                      <li>
                        <i class="fa fa-ravelry" aria-hidden="true" />
                        &nbsp;&nbsp;In-Progress
                      </li>
                    </Link>
                    <Link to={process.env.PUBLIC_URL + "/newarea"}>
                      <li>
                        <i class="fa fa-envelope-open" aria-hidden="true" />
                        &nbsp;&nbsp;Delivered
                      </li>
                    </Link>
                    <Link to={process.env.PUBLIC_URL + "/newarea"}>
                      <li>
                        <i class="fa fa-times" aria-hidden="true" />
                        &nbsp;&nbsp;Cancelled
                      </li>
                    </Link>
                    <Link to={process.env.PUBLIC_URL + "/newarea"}>
                      <li>
                        <i class="fa fa-clone" aria-hidden="true" />
                        &nbsp;&nbsp;Draft
                      </li>
                    </Link>
                  </ul>
                </li>

                <li>
                  <a
                    className=" waves-effect waves-dark"
                    href="#submenu5"
                    data-toggle="collapse"
                    data-target="#submenu5"
                  >
                    <i class="fa fa-cog" aria-hidden="true" />
                    <span className="hide-menu"> Settings</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
