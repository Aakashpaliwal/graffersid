import React, { Component } from "react";
import "./Customer.css";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../services/url";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import Moment from "react-moment";
export class ProductOnShop extends Component {
  constructor() {
    super();
    this.state = {
      userdata: [],
      detailsdata: [],
      skip: 0,
      limit: 4,
      total: ""
    };
    this.detailhandler = this.detailhandler.bind(this);
    this.reqapproved = this.reqapproved.bind(this);
    this.handlepagenumber = this.handlepagenumber.bind(this);
    this.nextpagehandler = this.nextpagehandler.bind(this);
    this.prevpagehandler = this.prevpagehandler.bind(this);
  }
  handlepagenumber(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  detailhandler(item) {
    console.log("props passess", item.user_product_master_id);
    let productid = item.user_product_master_id;
    this.props.history.push(`/ProductOnShopDetail/${productid}`);
  }
  reqapproved(todo) {
    console.log(todo.user_order_id);
    let stodoeet = todo.user_order_id;
    axios
      .put(
        `${API_URL}user_order/update/${stodoeet}`,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      )
      .then(response => {
        console.log(response);
        if (response.data.success === true) {
          console.log("Requirement Has Been Approved");
          alert("Requirement Has Been Approved");
          window.location.reload();
        } else {
          console.log(response.data.msg);
        }
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
        `${API_URL}product_user/view/${defaultskip}/${defaultlimit}`,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      )
      .then(response => {
        console.log("USer Order view");
        this.state.total = response.data.total[0].total;
        console.log(this.state.total);
        console.log(response.data.product_user_data);
        const data = response.data.product_user_data;
        if (response.data.success) {
          this.setState({ userdata: data });
        }
      })
      .catch(error => {
        console.log(error.response);
      });
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
    this.props.history.push(`/ProductOnShop/${this.props.match.params.id}`);
    this.forceUpdate();
    this.handleClick();
    // axios
    //   .get(
    //     `${API_URL}/product_user/view/${dataskip}/${limit}`,
    //     (axios.defaults.headers.common["w_auth"] = authService.getToken())
    //   )
    //   .then(response => {
    //     console.log(response.data.product_user_data);
    //     const data = response.data.product_user_data;
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
    this.props.history.push(`/ProductOnShop/${this.props.match.params.id}`);
    // console.log(`/ViewArea/${this.props.match.params.id}`);
    this.forceUpdate();
    this.handleClick();
    // axios
    //   .get(
    //     `${API_URL}/product_user/view/${dataskip}/${limit}`,
    //     (axios.defaults.headers.common["w_auth"] = authService.getToken())
    //   )
    //   .then(response => {
    //     console.log(response.data.product_user_data);
    //     const data = response.data.product_user_data;
    //     this.setState({ userdata: data });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }
  render() {
    let prevbtndipsplay;
    let nextbtndisplay;
    let areatableshow;
    let sr = 0;
    if (this.state.userdata.length == 0) {
      areatableshow = (
        <div>
          <center>
            <strong>There is No Data</strong>
          </center>
        </div>
      );
    } else {
      sr = this.state.skip;
      areatableshow = (
        <div>
          <table className="table table-responsive-sm table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Sr. No.</th>
                <th scope="col">Employe Detail</th>
                {/* <th scope="col">Employe Mobile</th>
     <th scope="col">Employe E - Mail</th> */}
                <th scope="col">Shop Detail</th>
                {/* <th scope="col">Owner Name</th>
     <th scope="col">Owner's Mobile</th>
     <th scope="col">Shop's Location</th> */}
                <th scope="col">Total Payment</th>
                <th scope="col">Date Of Delivery</th>
                {/* <th scope="col">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {this.state.userdata ? (
                this.state.userdata.map(function(item, id) {
                  return (
                    <tr key={id}>
                      <td>{++sr}</td>
                      <td>{item.employe_detail || "NO DATA"}</td>
                      <td>{item.shop_detail || "NO DATA"}</td>
                      <td>{item.total_payment || "NO DATA"}</td>
                      <td>
                        <Moment format="dddd, MMMM Do YYYY">
                          {item.date_of_delivery || "NO DATA"}
                        </Moment>
                      </td>
                      {/* <td>
                <span class="tooltip-toggle" aria-label="Approved" tabindex="0">
           <button className="btn btn-success custom-edit-btn btn-sm" onClick={this.reqapproved.bind(this, todo)}><i className="fa fa-check" aria-hidden="true"></i></button>
                 </span>
           </td> */}
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
                        <li className="breadcrumb-todo">
                          <Link to="/">Home</Link>
                        </li>
                        <li
                          className="breadcrumb-todo active"
                          aria-current="page"
                        >
                          View Shop Requirement
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
                        {/* <Link to="/ViewCustomer"> <button type="button" className="btn btn-info add-customer-btn"><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Add Requirement</button></Link> */}
                        <br />
                        <br />
                        {areatableshow}
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
                                  <th scope="col">Customer Name</th>
                                  <th scope="col">Customer Location</th>
                                  {/* <th scope="col">Brand</th>
      <th scope="col">Model</th>
      <th scope="col">Action</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.detailsdata ? (
                                  this.state.detailsdata.map(function(
                                    todo,
                                    id
                                  ) {
                                    return (
                                      <tr key={id}>
                                        <th scope="row">{todo.user_name}</th>
                                        <td>{todo.user_location}</td>
                                        {/* <td>{todo.brand}</td>
      <td>{todo.model}</td>
      <td>
      <Link to ={`/EditMasterEquipment/${todo.equipment_master_id}`}> 
      <span class="tooltip-toggle" aria-label="Edit" tabindex="0">
      <button className="btn btn-warning custom-edit-btn btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></button>
              </span>
      </Link>
      <span class="tooltip-toggle" aria-label="Suspend" tabindex="0">
          <button  className="btn btn-danger custom-edit-btn btn-sm" onClick={this.handleCheck.bind(this, todo)}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
              </span>

               <span class="tooltip-toggle" aria-label="Details" tabindex="0">
          <button className="btn btn-success custom-edit-btn btn-sm" onClick={this.detailCheck.bind(this, todo)} data-toggle="modal" data-target=".bd-example-modal-lg"><i class="fa fa-eye" aria-hidden="true"></i></button>
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

export default withRouter(ProductOnShop);
