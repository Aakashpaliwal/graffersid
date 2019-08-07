import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
class Home extends Component {
  render() {
    return (
      <div className="skin-blue fixed-layout">
        <div className="page-wrapper">
          <div className="container-fluid">
            <div className="row page-titles">
              <div className="col-md-5 align-self-center">
                <h4 className="text-themecolor">Dashboard </h4>
              </div>
              <div className="col-md-7 align-self-center text-right">
                <div className="d-flex justify-content-end align-items-center">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="javascript:void(0)">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Dashboard </li>
                  </ol>
                  {/* <button type="button" className="btn btn-info d-none d-lg-block m-l-15"><i className="fa fa-plus-circle"></i> Create New</button> */}
                </div>
              </div>
            </div>

            <div className="card-group">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-flex no-block align-items-center">
                        <div>
                          <h3>
                            <i
                              className="fa fa-shopping-basket"
                              aria-hidden="true"
                            />
                          </h3>
                          <p className="text-muted">TOTAL SHOPS</p>
                          <p className="text-muted">LAST ACTIVE SHOPS</p>
                        </div>
                        <div className="ml-auto">
                          <h2 className="counter text-primary">23</h2>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="progress">
                        <div
                          className="progress-bar bg-primary custom-ap-style"
                          role="progressbar"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-flex no-block align-items-center">
                        <div>
                          <h3>&#x20b9;</h3>
                          <p className="text-muted">TOTAL COLLECTION</p>
                          <p className="text-muted">TODAY'S COLLECTION</p>
                        </div>
                        <div className="ml-auto">
                          <h2 className="counter text-cyan">169</h2>
                          <h2 className="counter text-cyan">169</h2>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="progress">
                        <div
                          className="progress-bar bg-cyan custom-ap-style"
                          role="progressbar"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-flex no-block align-items-center">
                        <div>
                          <h3>
                            <i className="fa fa-user-o" aria-hidden="true" />
                          </h3>
                          <p className="text-muted">MY EMPLOYEES</p>
                          <p className="text-muted">ACTIVE EMPLOYEES</p>
                        </div>
                        <div className="ml-auto">
                          <h2 className="counter text-purple">157</h2>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="progress">
                        <div
                          className="progress-bar bg-purple custom-ap-style"
                          role="progressbar"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-flex no-block align-items-center">
                        <div>
                          <h3>
                            <i className="fa fa-suitcase" aria-hidden="true" />
                          </h3>
                          <p className="text-muted">DUE PAYMENT</p>
                        </div>
                        <div className="ml-auto">
                          <h2 className="counter text-success">431</h2>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="progress">
                        <div
                          className="progress-bar bg-success custom-ap-style"
                          role="progressbar"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
