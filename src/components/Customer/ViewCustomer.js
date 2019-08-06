import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Customer.css";
import axios from "axios";
import { API_URL } from "../../services/url";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import getCurrentPosition from "react-geolocation";
import latitude from "react-geolocation";
import longitude from "react-geolocation";
import PropTypes from "prop-types";
export class ViewCustomer extends Component {
  constructor() {
    super();
    this.state = {
      _isMounted : true,
      userdata: [],
      detailsdata: [],
      ui_from_date: "",
      ui_to_date: "",
      tableondate: [],
      userlatitude: "",
      userlongitude: "",
      tableondatestate: false,
      skip: 0,
      limit: 4,
      total: ""
    };
    this.handlepagenumber = this.handlepagenumber.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.detailCheck = this.detailCheck.bind(this);
    this.nextpagehandler = this.nextpagehandler.bind(this);
    this.prevpagehandler = this.prevpagehandler.bind(this);
  }
  handlepagenumber(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  handleCheck(item) {
    console.log(item.user_id);
    let sitemeet = item.user_id;
    axios
      .delete(
        `${API_URL}user/delete/${sitemeet}`,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      )
      .then(response => {
        console.log(response);
        if (response.data.success === true) {
          // console.log('Shop has been deleted')
          // alert('Shop has been deleted');
          alert(response.data.msg);
          //window.location.reload();
          this.handleClick();
        } else {
          console.log(response.data.msg);
        }
      })
      .catch(error => {
        console.log(error.response);
      });
    // fetch(`user/delete/${sitemeet}`,{
    //            method : 'DELETE',
    //            headers : {
    //
    //              "Content-Type" : "application/json"
    //          }
    //          })
    //          .then(function(response){
    //                  return response.json();})
    //              .then(function(json){
    //                   if(json.success===true){
    //                  //   console.log(json);
    //                  alert("Customer has been deleted");
    //                 //  window.location.reload()
    //                 const customerssss = [...this.state.userdata];
    //                 customerssss.splice(item, 1);
    //                 this.setState({
    //                     userdata:customerssss
    //                 })

    //              }
    //              else{
    //                console.log(json);
    //            }
    //            }.bind(this))
  }
  detailCheck(item) {
    // Number.prototype.toRad = function() {
    //           return this * Math.PI / 180;
    //        }

    //        var lat2 = 42.741;
    //   var lon2 = -71.3161;
    //   var lat1 = this.state.userlatitude;
    //   var lon1 = this.state.userlongitude;

    //   var R = 6371; // km
    //   //has a problem with the .toRad() method below.
    //   var x1 = lat2-lat1;
    //   var dLat = x1.toRad();
    //   var x2 = lon2-lon1;
    //   var dLon = x2.toRad();
    //   var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    //                   Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
    //                   Math.sin(dLon/2) * Math.sin(dLon/2);
    //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    //   var d = R * c;

    //   console.log('distance here', d);

    console.log(item.admin_id);
    let sitemeet = item.user_id;
    axios
      .get(
        `${API_URL}user/detail/${sitemeet}`,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      )
      .then(response => {
        console.log("Customer /Shop Detail view");
        console.log(response.data.user_data);
        // console.log(response.data.user_data[0].user_latitude)
        // console.log(response.data.user_data[0].user_longitude)
        this.state.userlatitude = response.data.user_data[0].user_latitude;
        this.state.userlongitude = response.data.user_data[0].user_longitude;
        console.log(this.state.userlatitude);
        const detailsdata = response.data.user_data;
        if (response.data.success) {
          this.setState({ detailsdata: detailsdata });
        }
      })
      .catch(error => {
        console.log(error.response);
      });
    //       Number.prototype.toRad = function() {
    //         return this * Math.PI / 180;
    //      }

    //      var lat2 = 42.741;
    // var lon2 = -71.3161;
    // var lat1 = this.state.userlatitude;
    // var lon1 = this.state.userlongitude;

    // var R = 6371; // km
    // //has a problem with the .toRad() method below.
    // var x1 = lat2-lat1;
    // var dLat = x1.toRad();
    // var x2 = lon2-lon1;
    // var dLon = x2.toRad();
    // var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    //                 Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
    //                 Math.sin(dLon/2) * Math.sin(dLon/2);
    // var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    // var d = R * c;

    // console.log('distance here', d);
  }
  componentWillMount() {
    this.handleClick();
  }
  handleClick() {
    let defaultskip = this.props.match.params.id * this.state.limit;
    // let defaultskip = await (+this.props.match.params.id)* +this.state.limit;
    let defaultlimit = this.state.limit;
    if(this.state._isMounted)
    {
    axios
      .get(
        `${API_URL}user/view//${defaultskip}/${defaultlimit}`,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      )
      .then(response => {
        console.log("Shop / Customer view");
        console.log(response);
        console.log(response.data.user_data);
        const data = response.data.user_data;
        if (response.data.success) {
          this.setState({ userdata: data });
        }
      })
      .catch(error => {
        console.log(error.response);
      });
    }
  }
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  getWebsite = () => {
    fetch("/");
  };
  onSubmit = e => {
    e.preventDefault();
    this.setState({
      tableondatestate: true
    });
    console.log(this.state);
    axios
      .post(
        `${API_URL}product_user/search`,
        this.state,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      )
      //   .then(console.log(this.state));
      .then(
        function(response) {
          console.log(response);
          //  console.log('shop on data on date')
          //  console.log(response.data.product_user_data)
          console.log(response.data.product_user_data);
          const data = response.data.product_user_data;
          if (response.data.success) {
            this.setState({ tableondate: data });
          }
        }.bind(this)
      )
      .catch(error => {
        console.log(error.response);
      });
  };
  changestate = e => {
    this.setState({
      tableondatestate: false,
      ui_from_date: "",
      ui_to_date: ""
    });
  };
  prevpagehandler() {
    console.log("paginationhandler");
    // this.setState({
    //   skip: this.state.skip + this.state.limit
    // });\
    let dataskip = --this.props.match.params.id;
    console.log(dataskip);
    this.props.match.params.id = dataskip
   console.log(this.props.match.params.id * this.state.limit)
    this.props.history.push(`/ViewCustomer/${this.props.match.params.id}`)
    this.forceUpdate();
    this.handleClick();
    // if(this.state._isMounted)
    // {
    // axios
    //   .get(
    //     `${API_URL}user/view/${dataskip}/${limit}`,
    //     (axios.defaults.headers.common["w_auth"] = authService.getToken())
    //   )
    //   .then(response => {
    //     console.log(response.data.user_data);
    //     const data = response.data.user_data;
    //     this.setState({ userdata: data });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // }
  }
  nextpagehandler() {
    console.log("paginationhandler");
    // this.setState({
    //   skip: this.state.skip + this.state.limit
    // });\
    let dataskip = ++this.props.match.params.id;
    console.log(dataskip);
    this.props.match.params.id = dataskip
   console.log(this.props.match.params.id * this.state.limit)
    // this.history.push(`${API_URL}/area/view/${dataskip}`)
    this.props.history.push(`/ViewCustomer/${this.props.match.params.id}`)
    // console.log(`/ViewArea/${this.props.match.params.id}`);
    this.forceUpdate();
    this.handleClick();
    // if(this.state._isMounted)
    // {
    // axios
    //   .get(
    //     `${API_URL}user/view/${dataskip}/${limit}`,
    //     (axios.defaults.headers.common["w_auth"] = authService.getToken())
    //   )
    //   .then(response => {
    //     console.log(response.data.user_data);
    //     const data = response.data.user_data;
    //     this.setState({ userdata: data });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // }
  }
  componentWillUnmount() {
    this.setState({
      _isMounted : false
    })
  }
  render() {
    let prevbtndipsplay;
    let nextbtndisplay;
    let areatableshow;
    let sr = 0;
    if (this.state.tableondatestate === true) {
      areatableshow = (
        <div>
                 <table className="table table-responsive-sm table-bordered">
            <thead className="thead-dark">
              <tr>
                 {/* <th scope="col">Sr. No.</th> */}
                 <th scope="col">Shop Name</th>
                                <th scope="col">Shop Contact Number</th>
                                <th scope="col">Owner's Detail</th>
                                <th scope="col">Shop Location</th>
                                <th scope="col">Action</th>
                                {/* <th scope="col">Brand</th>
       <th scope="col">Model</th>
       <th scope="col">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {this.state.userdata ? (
                this.state.userdata.map(function(item, id) {
                  return (
                    <tr key={id}>
            {/* <th scope="row">{++serial}</th> */}
            <th scope="row">{item.user_name}</th>
            <td>{item.user_mobile}</td>
            <td>
              {item.user_name || "NO NAME"} <br />
              {item.user_email || "NO E - MAIL ID"}
            </td>
            <td className="user-location-td">{item.user_location}</td>
            <td>
              <Link
                to={process.env.PUBLIC_URL + `/EditCustomer/${item.user_id}`}
              >
                <span class="tooltip-toggle" aria-label="Edit" tabindex="0">
                  <button className="btn btn-warning custom-edit-btn btn-sm">
                    <i class="fa fa-pencil" aria-hidden="true" />
                  </button>
                </span>
              </Link>
              <span class="tooltip-toggle" aria-label="Suspend" tabindex="0">
                <button
                  className="btn btn-danger custom-edit-btn btn-sm"
                  onClick={this.handleCheck.bind(this, item)}
                >
                  <i class="fa fa-trash-o" aria-hidden="true" />
                </button>
              </span>

              <Link
                to={process.env.PUBLIC_URL + `/CustomerDetail/${item.user_id}`}
              >
                <span class="tooltip-toggle" aria-label="Details" tabindex="0">
                  <button className="btn btn-success custom-edit-btn btn-sm">
                    <i class="fa fa-eye" aria-hidden="true" />
                  </button>
                </span>
              </Link>
              <Link
                to={
                  process.env.PUBLIC_URL +
                  `/CustomerRequirement/${item.user_id}`
                }
              >
                <span
                  class="tooltip-toggle"
                  aria-label="Requirement"
                  tabindex="0"
                >
                  <button className="btn btn-info custom-edit-btn btn-sm">
                    <i className="fa fa-life-ring" aria-hidden="true" />
                  </button>
                </span>
              </Link>
              <Link
                to={process.env.PUBLIC_URL + `/CustomerHistory/${item.user_id}`}
              >
                <span class="tooltip-toggle" aria-label="History" tabindex="0">
                  <button className="btn btn-info custom-edit-btn btn-sm">
                    <i className="fa fa-history" aria-hidden="true" />
                  </button>
                </span>
              </Link>
            </td>
          </tr>
                  );
                }, this)
              ) : (
                <span>No Data Present....</span>
              )}
            </tbody>
          </table>
        </div>
      );
    } else {
      sr = this.state.skip;
      // if(this.state.userdata.length === 0)
      // {
      //   areatableshow = (
      //     <div>
      //       <h3>There Is No Data.</h3>
      //     </div>
      //   )
      // }
      areatableshow = (
        <div>
          <table className="table table-responsive-sm table-bordered">
            <thead className="thead-dark">
              <tr>
                {/* <th scope="col">Sr. No.</th> */}
                <th scope="col">Shop Name</th>
                                <th scope="col">Shop Contact Number</th>
                                <th scope="col">Owner's Detail</th>
                                <th scope="col">Shop Location</th>
                                <th scope="col">Action</th>
                                {/* <th scope="col">Brand</th>
       <th scope="col">Model</th>
       <th scope="col">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {this.state.userdata.length ? (
                this.state.userdata.map(function(item, id) {
                  return (
                    <tr key={id}>
            {/* <th scope="row">{++serial}</th> */}
            <th scope="row">{item.user_name}</th>
            <td>{item.user_mobile}</td>
            <td>
              {item.user_name || "NO NAME"} <br />
              {item.user_email || "NO E - MAIL ID"}
            </td>
            <td className="user-location-td">{item.user_location}</td>
            <td className="media-query-btn">
              <Link
                to={process.env.PUBLIC_URL + `/EditCustomer/${item.user_id}`}
              >
                <span class="tooltip-toggle" aria-label="Edit" tabindex="0">
                  <button className="btn btn-warning custom-edit-btn btn-sm">
                    <i class="fa fa-pencil" aria-hidden="true" />
                  </button>
                </span>
              </Link>
              <span class="tooltip-toggle" aria-label="Suspend" tabindex="0">
                <button
                  className="btn btn-danger custom-edit-btn btn-sm"
                  onClick={this.handleCheck.bind(this, item)}
                >
                  <i class="fa fa-trash-o" aria-hidden="true" />
                </button>
              </span>

              <Link
                to={process.env.PUBLIC_URL + `/CustomerDetail/${item.user_id}`}
              >
                <span class="tooltip-toggle" aria-label="Details" tabindex="0">
                  <button className="btn btn-success custom-edit-btn btn-sm">
                    <i class="fa fa-eye" aria-hidden="true" />
                  </button>
                </span>
              </Link>
              <Link
                to={
                  process.env.PUBLIC_URL +
                  `/CustomerRequirement/${item.user_id}`
                }
              >
                <span
                  class="tooltip-toggle"
                  aria-label="Requirement"
                  tabindex="0"
                >
                  <button className="btn btn-info custom-edit-btn btn-sm">
                    <i className="fa fa-life-ring" aria-hidden="true" />
                  </button>
                </span>
              </Link>
              <Link
                to={process.env.PUBLIC_URL + `/CustomerHistory/${item.user_id}`}
              >
                <span class="tooltip-toggle" aria-label="History" tabindex="0">
                  <button className="btn btn-info custom-edit-btn btn-sm">
                    <i className="fa fa-history" aria-hidden="true" />
                  </button>
                </span>
              </Link>
            </td>
          </tr>
                  );
                }, this)
              ) : (
                <tr>
                  {" "}
                  <td colSpan="5">
                    <center>
                      <span>No Data Present</span>
                    </center>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
    }
     //next btn logic
     if (+this.props.match.params.id >  (+this.state.total/ +this.state.limit)) {
      nextbtndisplay = (
        <div>
          <button
            type="button"
            className="btn btn-info"
            disabled
          >
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
                          View Shops
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
                        <form
                          className="custom-content-form"
                          autoComplete="OFF"
                        >
                          <div class="form-row">
                            <div class="form-group col-md-6">
                              <label for="inputCategory">Enter From Date</label>
                              <input
                                type="text"
                                className="form-control"
                                name="ui_from_date"
                                value={this.state.ui_from_date}
                                onChange={e => this.change(e)}
                                placeholder="YYYY-MM-DD"
                                required
                                pattern="([0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01]))"
                                title="Enter a date in this format YYYY/MM/DD"
                              />
                            </div>

                            <div class="form-group col-md-6">
                              <label for="inputSubcategory">
                                Enter To Date
                              </label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="ui_to_date"
                                value={this.state.ui_to_date}
                                onChange={e => this.change(e)}
                                placeholder="YYYY-MM-DD"
                                required
                                pattern="([0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01]))"
                                title="Enter a date in this format YYYY/MM/DD"
                              />
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
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="custom-table-product">
                        <Link to="/Customer">
                          {" "}
                          <button
                            type="button"
                            className="btn btn-info add-customer-btn"
                          >
                            <i
                              className="fa fa-plus-circle"
                              aria-hidden="true"
                            />
                            &nbsp;&nbsp;&nbsp;Add Shop
                          </button>
                        </Link>
                        <br />
                        <br />
                        <div className="custom-shop-table-here-media">
                        {areatableshow}
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
                            <table className="table table-hover table-bordered">
                              <thead className="custom-table-head-color">
                                <tr>
                                  <th scope="col">Shop Name</th>
                                  <th scope="col">Shop Contact Number</th>
                                  <th scope="col">E-mail</th>
                                  <th scope="col">Shop Location</th>
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
                                        <th scope="row">
                                          {item.user_name || "NO DATA"}
                                        </th>
                                        <td>{item.user_mobile || "NO DATA"}</td>
                                        <td>{item.user_email || "NO DATA"}</td>
                                        <td>
                                          {item.user_location || "NO DATA"}
                                        </td>
                                        {/* <td>{item.brand}</td>
      <td>{item.model}</td>
      <td>
      <Link to ={`/EditMasterEquipment/${item.equipment_master_id}`}> 
      <span class="tooltip-toggle" aria-label="Edit" tabindex="0">
      <button className="btn btn-warning custom-edit-btn btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></button>
              </span>
      </Link>
      <span class="tooltip-toggle" aria-label="Suspend" tabindex="0">
          <button  className="btn btn-danger custom-edit-btn btn-sm" onClick={this.handleCheck.bind(this, item)}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
              </span>

               <span class="tooltip-toggle" aria-label="Details" tabindex="0">
          <button className="btn btn-success custom-edit-btn btn-sm" onClick={this.detailCheck.bind(this, item)} data-toggle="modal" data-target=".bd-example-modal-lg"><i class="fa fa-eye" aria-hidden="true"></i></button>
                </span>
          </td> */}
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

export default ViewCustomer;
