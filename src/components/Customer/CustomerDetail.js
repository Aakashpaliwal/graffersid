import React, { Component } from "react";
import "./Customer.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../services/url";
import authService from "../../services/auth-service";
import Workbook from "react-excel-workbook";
export class CustomerDetail extends Component {
  constructor() {
    super();
    this.state = {
      userdata: [],
      userproductdata: []
    };
    // this.reqapproved = this.reqapproved.bind(this);
  }
  componentWillMount() {
    this.handleClick();
  }
  handleClick() {
    let Editid = this.props.match.params.id;
    axios
      .get(
        `${API_URL}user/more_detail/${Editid}`,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      )
      .then(response => {
        console.log("user detial view here");
        console.log(response.data.user_data);
        const data = response.data.user_data;
        this.state.userdata = data;
        console.log("userdata here", this.state.userdata);
        // this.setState({userdata : data})
        // if(response.data.success)
        // {
        // this.setState({ userdata : data})
        // // this.state.userdata = response.data.user_data
        // this.setState({ userproductdata : response.data.user_product_data})
        // }
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  render() {
    // let requirementdata;
    let serial = 0;
    //         if(this.state.userdata.length === 0)
    //         {
    //           requirementdata = (
    //             <div>
    //               <center><h4><strong>There is no user_data Yet.</strong></h4></center>
    //             </div>
    //           )
    //         }
    //         else{
    //           requirementdata = (
    //             <div>
    //                 <table className="table table-hover table-bordered table-responsive">
    //   <thead className="custom-table-head-color">
    //     <tr>
    //     <th scope="col">Sr. No.</th>
    //       <th scope="col">Product Name</th>
    //       <th scope = "col">Product Type</th>
    //       <th scope = "col">Quantity</th>
    //       <th scope = "col">Rate</th>
    //       <th scope = "col">Total Rate</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //   {
    //           this.state.userdata ?
    //           this.state.userdata.map(function(item, id) {
    //             return(

    //     <tr key = {id}>
    //     <td>{++serial}</td>
    //       <th scope="row">{item.product_name || "NO DATA"}</th>
    //       <td>{item.product_type_name || "NO DATA"}</td>
    //       <td>{item.quantity || "NO DATA"}</td>
    //       <td>{item.rate || "NO DATA"}</td>
    //       <td>{item.total_rate || "NO DATA"}</td>
    //     </tr>
    //   )
    //           }, this
    //   )
    //           :
    //           <span>Data is loading....</span>
    //         }
    //   </tbody>
    // </table>
    //             </div>
    //           )
    //         }
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
                        {/* {requirementdata} */}
                        <p>user_data table here</p>
                        <hr />
                        <table className="table table-hover table-bordered table-responsive-sm table-responsive-md">
                          <thead className="custom-table-head-color">
                            <tr>
                              <th scope="col">Sr. No.</th>
                              <th scope="col">Product Name</th>
                              <th scope="col">Product Type</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Rate</th>
                              <th scope="col">Total Rate</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.userdata.length ? (
                              this.state.userdata.map(function(item, id) {
                                return (
                                  <tr key={id}>
                                    <td>{++serial}</td>
                                    <th scope="row">
                                      {item.product_name || "NO DATA"}
                                    </th>
                                    <td>
                                      {item.product_type_name || "NO DATA"}
                                    </td>
                                    <td>{item.quantity || "NO DATA"}</td>
                                    <td>{item.rate || "NO DATA"}</td>
                                    <td>{item.total_rate || "NO DATA"}</td>
                                  </tr>
                                );
                              }, this)
                            ) : (
                              <tr className="text-center"><td colSpan="6"><div class="loading2"></div></td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      <div className="custom-table-product">
                        {/* <Link to="/ViewCustomer"> <button type="button" className="btn btn-info add-customer-btn"><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Add Requirement</button></Link> */}
                        <br />
                        <br />
                        {/* {requirementdata} */}
                        <p>user_product_data table here</p>
                        <hr />
                        <table className="table table-hover table-bordered table-responsive-sm table-responsive-md">
                          <thead className="custom-table-head-color">
                            <tr>
                              <th scope="col">Sr. No.</th>
                              <th scope="col">Product Name</th>
                              <th scope="col">Product Type</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Rate</th>
                              <th scope="col">Total Rate</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.userproductdata.length ? (
                              this.state.userproductdata.map(function(
                                item,
                                id
                              ) {
                                return (
                                  <tr key={id}>
                                    <td>{++serial}</td>
                                    <th scope="row">
                                      {item.product_name || "NO DATA"}
                                    </th>
                                    <td>
                                      {item.product_type_name || "NO DATA"}
                                    </td>
                                    <td>{item.quantity || "NO DATA"}</td>
                                    <td>{item.rate || "NO DATA"}</td>
                                    <td>{item.total_rate || "NO DATA"}</td>
                                  </tr>
                                );
                              },
                              this)
                            ) : (
                              <tr className="text-center"><td colSpan="6"><div class="loading2"></div></td></tr>
                            )}
                          </tbody>
                        </table>
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
                                    item,
                                    id
                                  ) {
                                    return (
                                      <tr key={id}>
                                        <th scope="row">{item.user_name}</th>
                                        <td>{item.user_location}</td>
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
export default CustomerDetail;
