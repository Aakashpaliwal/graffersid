import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
class Sidebar extends Component {
  render() {
    return (
      <div className="skin-blue">
        <div className="left-sidebar">
          <div className="scroll-sidebar custom-scroll-sidebar-bg">
            <nav className="sidebar-nav">
              <ul id="sidebarnav">
                <li>
                  <a
                    className="has-arrow waves-effect waves-dark"
                    href="#submenu4"
                    data-toggle="collapse"
                    data-target="#submenu4"
                  >
                    <i class="fa fa-truck" aria-hidden="true" />
                    <span className="hide-menu"> Orders</span>
                  </a>
                  <ul aria-expanded="false" className="collapse" id="submenu4">
                    <Link to={process.env.PUBLIC_URL + "/order"}>
                      <li>
                        <i className="fa fa-cube" aria-hidden="true" />
                        &nbsp;&nbsp;All
                      </li>
                    </Link>
                    <Link to={process.env.PUBLIC_URL + "/order"}>
                      <li>
                        <i className="fa fa-stop-circle-o" aria-hidden="true" />
                        &nbsp;&nbsp;Pending
                      </li>
                    </Link>
                    <Link to={process.env.PUBLIC_URL + "/order"}>
                      <li>
                        <i class="fa fa-ravelry" aria-hidden="true" />
                        &nbsp;&nbsp;In-Progress
                      </li>
                    </Link>
                    <Link to={process.env.PUBLIC_URL + "/order"}>
                      <li>
                        <i class="fa fa-envelope-open" aria-hidden="true" />
                        &nbsp;&nbsp;Delivered
                      </li>
                    </Link>
                    <Link to={process.env.PUBLIC_URL + "/order"}>
                      <li>
                        <i class="fa fa-times" aria-hidden="true" />
                        &nbsp;&nbsp;Cancelled
                      </li>
                    </Link>
                    <Link to={process.env.PUBLIC_URL + "/order"}>
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
