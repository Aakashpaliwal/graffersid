import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Inventory.css";
import axios from "axios";
import { API_URL } from "../../services/url";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
export class ViewInventory extends Component {
  constructor() {
    super();
    this.state = {
      userdata: [],
      detailsdata: [],
      skip: 0,
      limit: 2,
      total: ""
    };
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
    this.props.history.push(`/ViewInventory/${this.props.match.params.id}`);
    this.forceUpdate();
    this.handleClick();
    // axios
    //   .get(
    //     `${API_URL}/inventory/view/${dataskip}/${limit}`,
    //     (axios.defaults.headers.common["w_auth"] = authService.getToken())
    //   )
    //   .then(response => {
    //     console.log(response.data.inventory_data[0]);
    //     const data = response.data.inventory_data[0];
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
    this.props.history.push(`/ViewInventory/${this.props.match.params.id}`);
    // console.log(`/ViewArea/${this.props.match.params.id}`);
    this.forceUpdate();
    this.handleClick();
    // axios
    //   .get(
    //     `${API_URL}/inventory/view/${dataskip}/${limit}`,
    //     (axios.defaults.headers.common["w_auth"] = authService.getToken())
    //   )
    //   .then(response => {
    //     console.log(response.data.inventory_data[0]);
    //     const data = response.data.inventory_data[0];
    //     this.setState({ userdata: data });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }
  componentWillMount() {
    this.handleClick();
  }

  handleClick() {
    let defaultskip = this.state.skip;
    let defaultlimit = this.state.limit;
    axios
      .get(
        `${API_URL}inventory/view/${defaultskip}/${defaultlimit}`,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      )
      .then(response => {
        console.log("inventory view");
        console.log(response);
        console.log(response.data.total.total);
        this.state.total = response.data.total.total;
        const data = response.data.inventory_data;
        if (response.data.success) {
          this.setState({ userdata: data });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    let prevbtndipsplay;
    let nextbtndisplay;
    let inventorytable;
    let sr = 0;
    if (this.state.userdata.length == 0) {
      inventorytable = (
        <div>
          <p>
            <center>
              <strong>There Is No Inventory Yet.</strong>
            </center>
          </p>
        </div>
      );
    } else {
      sr = this.state.skip;

      inventorytable = (
        <div>
          <table className="table table-responsive-sm table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Sr. No.</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">In Stock</th>
              </tr>
            </thead>
            <tbody>
              {this.state.userdata ? (
                this.state.userdata.map(function(item, id) {
                  return (
                    <tr key={id}>
                      <td>{++sr}</td>
                      <td>{item.product_name || "NO DATA"}</td>
                      <td>{item.product_type_name || "NO DATA"}</td>
                      <td>{item.quantity_level || "NO DATA"}</td>
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
                        <li className="breadcrumb-item">
                          <Link to="/">Home</Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          View Inventory
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
                            <div className="inventory-media-query-table">
                              {inventorytable}
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
export default ViewInventory;
