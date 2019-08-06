import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Employe.css";
import axios from "axios";
import { API_URL } from "../../services/url";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
export class ViewEmploye extends Component {
  constructor() {
    super();
    this.state = {
      userdata: [],
      detailsdata: [],
      skip: 0,
      limit: 4,
      total: ""
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.detailCheck = this.detailCheck.bind(this);
    this.allocateemp = this.allocateemp.bind(this);
    this.backallocate = this.backallocate.bind(this);
    this.nextpagehandler = this.nextpagehandler.bind(this);
    this.prevpagehandler = this.prevpagehandler.bind(this);
  }
  prevpagehandler() {
    console.log("paginationhandler");
    // this.setState({
    //   skip: this.state.skip + this.state.limit
    // });\
    let dataskip = --this.props.match.params.id;
    console.log(dataskip);
    this.props.match.params.id = dataskip;
    console.log(this.props.match.params.id * this.state.limit);
    this.props.history.push(`/ViewEmploye/${this.props.match.params.id}`);
    this.forceUpdate();
    this.handleClick();
    // axios
    //   .get(
    //     `${API_URL}/employe/view/${dataskip}/${limit}`,
    //     (axios.defaults.headers.common["authorization"] =
    //     "Bearer " + authService.getToken())
    //   )
    //   .then(response => {
    //     console.log(response.data.employe_data[0]);
    //     const data = response.data.employe_data[0];
    //     this.setState({ userdata: data });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }
  nextpagehandler() {
    console.log("paginationhandler");
    // this.setState({
    //   skip: this.state.skip + this.state.limit
    // });\
    let dataskip = ++this.props.match.params.id;
    console.log(dataskip);
    this.props.match.params.id = dataskip;
    console.log(this.props.match.params.id * this.state.limit);
    // this.history.push(`${API_URL}/area/view/${dataskip}`)
    this.props.history.push(`/ViewEmploye/${this.props.match.params.id}`);
    // console.log(`/ViewArea/${this.props.match.params.id}`);
    this.forceUpdate();
    this.handleClick();
    // axios
    //   .get(
    //     `${API_URL}/employe/view/${dataskip}/${limit}`,
    //     (axios.defaults.headers.common["authorization"] =
    //     "Bearer " + authService.getToken())
    //   )
    //   .then(response => {
    //     console.log(response.data.employe_data[0]);
    //     const data = response.data.employe_data[0];
    //     this.setState({ userdata: data });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }
  handleCheck(todo) {
    console.log(todo.employe_id);
    let sitemeet = todo.employe_id;
    if (window.confirm("Are You Sure You Want To Delete This Employe?")) {
      axios
        .delete(
          `${API_URL}employe/delete/${sitemeet}`,
          (axios.defaults.headers.common["authorization"] =
            "Bearer " + authService.getToken())
        )
        .then(response => {
          console.log(response);
          if (response.data.success === true) {
            // console.log('Employee Bas Been Deleted');
            // alert('Employee Bas Been Deleted');
            alert(response.data.msg);
            //  window.location.reload();
            this.handleClick();
          } else {
            console.log(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  detailCheck(todo) {
    // console.log(item.admin_id);
    let sitemeet = todo.employe_id;
    axios
      .get(
        `${API_URL}employe/detail/${sitemeet}`,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      )
      .then(response => {
        console.log("employe details view");
        console.log(response.data.employe_data);
        const detailsdata = response.data.employe_data;
        this.setState({ detailsdata: detailsdata });
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentWillMount() {
    this.handleClick();
  }
  handleClick() {
    let defaultskip = this.props.match.params.id * this.state.limit;
    // let defaultskip = await (+this.props.match.params.id)* +this.state.limit;
    let defaultlimit = this.state.limit;
    axios
      .get(
        `${API_URL}employe/view/${defaultskip}/${defaultlimit}`,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      )
      .then(response => {
        console.log("employe view");
        console.log(response);
        this.state.total = response.data.total[0].total;
        const data = response.data.employe_data;
        if (response.data.success) {
          this.setState({ userdata: data });
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  allocateemp(item) {
    console.log(item.employe_name);

    this.props.history.push(`/EmpAlloc/${item.employe_id}`);
    localStorage.setItem("employe_name", item.employe_name);
    localStorage.setItem("employe_id", item.employe_id);
  }
  backallocate(item) {
    console.log(item.employe_name);
    this.props.history.push(`/BackAllocDetail/${item.employe_id}`);
    localStorage.setItem("employe_name", item.employe_name);
  }
  render() {
    let prevbtndipsplay;
    let nextbtndisplay;
    let employeshowtable;
    let sr = 0;
    if (this.state.userdata.length == 0) {
      employeshowtable = (
        <div>
          <center>
            <strong>There is No employees</strong>
          </center>
        </div>
      );
    } else {
      sr = this.state.skip;
      employeshowtable = (
        <div>
          <table className="table table-hover table-bordered custom-employe-table-here table-responsive-sm">
            <thead className="custom-table-head-color">
              <tr>
                <th scope="col">Sr. No.</th>
                <th scope="col">Employe Name</th>
                <th scope="col">Employe Alias</th>
                <th scope="col">Employe Email</th>
                <th scope="col">Employe Mobile</th>
                <th scope="col">Area Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.userdata ? (
                this.state.userdata.map(function(item, id) {
                  return (
                    <tr key={id}>
                      <td>{++sr}</td>
                      <th scope="row">{item.employe_name}</th>
                      <td>{item.employe_alias}</td>
                      <td>{item.employe_email}</td>
                      <td>{item.employe_mobile}</td>
                      <td className="area-name-td">{item.area_name}</td>
                      <td>
                        <Link to={`/EditEmploye/${item.employe_id}`}>
                          <span
                            class="tooltip-toggle"
                            aria-label="Edit"
                            tabindex="0"
                          >
                            <button className="btn btn-warning custom-edit-btn btn-sm">
                              <i class="fa fa-pencil" aria-hidden="true" />
                            </button>
                          </span>
                        </Link>

                        <span
                          class="tooltip-toggle"
                          aria-label="Suspend"
                          tabindex="0"
                        >
                          <button
                            className="btn btn-danger custom-edit-btn btn-sm"
                            onClick={this.handleCheck.bind(this, item)}
                          >
                            <i class="fa fa-trash-o" aria-hidden="true" />
                          </button>
                        </span>
                        <span
                          class="tooltip-toggle"
                          aria-label="Details"
                          tabindex="0"
                        >
                          <button
                            className="btn btn-success custom-edit-btn btn-sm"
                            onClick={this.detailCheck.bind(this, item)}
                            data-toggle="modal"
                            data-target=".bd-example-modal-lg"
                          >
                            <i class="fa fa-eye" aria-hidden="true" />
                          </button>
                        </span>
                        <Link to={`/EmpAlloc/${item.employe_id}`}>
                          <span
                            class="tooltip-toggle"
                            aria-label="Allocate"
                            tabindex="0"
                          >
                            <button
                              className="btn btn-info custom-edit-btn btn-sm"
                              onClick={this.allocateemp.bind(this, item)}
                            >
                              <i className="fa fa-map-pin" aria-hidden="true" />
                            </button>
                          </span>
                        </Link>

                        <span
                          class="tooltip-toggle"
                          aria-label="BackAllocation"
                          tabindex="0"
                        >
                          <button
                            className="btn btn-dark custom-edit-btn btn-sm"
                            onClick={this.backallocate.bind(this, item)}
                          >
                            <i className="fa fa-random" aria-hidden="true" />
                          </button>
                        </span>
                      </td>
                    </tr>
                  );
                }, this)
              ) : (
                <span>Data is loading....</span>
              )}
            </tbody>
          </table>
        </div>
      );
    }
    //next btn logic
    if (+this.props.match.params.id > +this.state.total / +this.state.limit) {
      nextbtndisplay = (
        <div>
          <button type="button" className="btn btn-info" disabled>
            <i className="fa fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
      );
    } else {
      nextbtndisplay = (
        <div>
          <button
            type="button"
            className="btn btn-info"
            onClick={this.nextpagehandler.bind(this)}
          >
            <i className="fa fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
      );
    }
    //prev bt logic
    if (+this.props.match.params.id === 0) {
      prevbtndipsplay = (
        <div>
          <button
            type="button"
            className="btn btn-info"
            // onClick={this.prevpagehandler.bind(this)}
            disabled
          >
            <i className="fa fa-chevron-left" aria-hidden="true" />
          </button>
        </div>
      );
    } else {
      prevbtndipsplay = (
        <div>
          <button
            type="button"
            className="btn btn-info"
            onClick={this.prevpagehandler.bind(this)}
          >
            <i className="fa fa-chevron-left" aria-hidden="true" />
          </button>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div>
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
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          View Employees
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="custom-table-here">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="custom-table-product">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <Link to="/Employe">
                              {" "}
                              <button
                                type="button"
                                className="btn btn-info add-employe-btn"
                              >
                                <i
                                  className="fa fa-plus-circle"
                                  aria-hidden="true"
                                />
                                &nbsp;&nbsp;&nbsp;Add Employe
                              </button>
                            </Link>
                            <br />
                            <br />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="employe-responsive-custom-table-here">
                              {employeshowtable}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-3 offset-lg-3 offset-md-3 col-md-3 col-sm-12 col-xs-12 text-center">
                            {prevbtndipsplay}
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 text-center">
                            {nextbtndisplay}
                          </div>
                        </div>
                      </div>
                      {/* details modal here */}
                      <div
                        class="modal fade bd-example-modal-lg"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="myLargeModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-lg">
                          <div class="modal-content">
                            <table className="table table-hover table-bordered ">
                              <thead className="custom-table-head-color">
                                <tr>
                                  <th scope="col">Employe Name</th>
                                  <th scope="col">Employe Alias</th>
                                  <th scope="col">Area Name</th>
                                  <th scope="col">Employe Email</th>
                                  <th scope="col">Employe Mobile</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.detailsdata ? (
                                  this.state.detailsdata.map(function(
                                    item,
                                    id
                                  ) {
                                    return (
                                      <tr key={id}>
                                        <th scope="row">{item.employe_name}</th>
                                        <td>{item.employe_alias}</td>
                                        <td>{item.area_name}</td>
                                        <td>{item.employe_email}</td>
                                        <td>{item.employe_mobile}</td>
                                      </tr>
                                    );
                                  },
                                  this)
                                ) : (
                                  <span>Data is loading....</span>
                                )}
                              </tbody>
                            </table>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default ViewEmploye;
