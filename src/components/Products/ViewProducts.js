import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import axios from "axios";
import { API_URL } from "../../services/url";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";

const new_data_skip = 0;
export class ViewProducts extends Component {
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
    this.nextpagehandler = this.nextpagehandler.bind(this);
    this.prevpagehandler = this.prevpagehandler.bind(this);
  }
  prevpagehandler() {
    console.log("paginationhandler");
    // this.setState({
    //   skip: this.state.skip + this.state.limit
    // });\
    this.state.skip = this.state.skip - this.state.limit;
    let limit = this.state.limit;
    let dataskip = this.state.skip;
    console.log(dataskip);
    console.log(
      axios.get(
        `${API_URL}product/view/${dataskip}/${limit}`,
        (axios.defaults.headers.common["w_auth"] = authService.getToken())
      )
    );
    axios
      .get(
        `${API_URL}product/view/${dataskip}/${limit}`,
        (axios.defaults.headers.common["w_auth"] = authService.getToken())
      )
      .then(response => {
        console.log(response.data.product_data);
        const data = response.data.product_data;
        this.setState({ userdata: data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  nextpagehandler() {
    console.log("paginationhandler");
    // this.setState({
    //   skip: this.state.skip + this.state.limit
    // });\
    this.state.skip = this.state.skip + this.state.limit;
    console.log(this.state.skip)
    let limit = this.state.limit;
    let dataskip = this.state.skip;
    this.new_data_skip = dataskip
    // console.log(dataskip);
    console.log(`${API_URL}/product/view/${dataskip}/${limit}`);
    axios
      .get(
        `${API_URL}product/view/${dataskip}/${limit}`,
        (axios.defaults.headers.common["w_auth"] = authService.getToken())
      )
      .then(response => {
        console.log(response)
        console.log(response.data.product_data);
        const data = response.data.product_data;
        this.setState({ userdata: data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  // printDocument() {
  //   const input = document.getElementById('divToPrint');
  //   html2canvas(input)
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF();
  //       pdf.addImage(imgData, 'JPEG', 20, 20);
  //       // pdf.output('dataurlnewwindow');
  //       pdf.save("download.pdf");
  //     })
  //   ;
  // }
  handleCheck(item) {
    
    let stodoeet = item.product_id;
    if (window.confirm("Are You Sure You Want To Delete This Product?")) {
      axios
        .delete(
          `${API_URL}product/delete/${stodoeet}`,
          (axios.defaults.headers.common["authorization"] =
            "Bearer " + authService.getToken())
        )
        .then(response => {
          console.log(response);
          if (response.data.success === true) {
            // console.log('Area delete view');
            alert(response.data.msg);
            //window.location.reload();
            this.handleClick();
          } else {
            console.log(response.data.msg);
          }
        })
        .catch(error => {
          alert(error.response.data.msg);
          //console.log(error);
        });
    }
  }
  componentWillMount() {
    this.handleClick();
  }
  handleClick() {
    let defaultskip = this.state.skip;
    let defaultlimit = this.state.limit;
    console.log(`${API_URL}product/view/${defaultskip}/${defaultlimit}`);
    axios
      .get(
        `${API_URL}product/view/${defaultskip}/${defaultlimit}`,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      )
      .then(response => {
        console.log("Area view");
        console.log(response.data);
        console.log("total", response.data.total[0]);
        // this.setState({
        //   total: response.data.total[0].total
        // });
        this.state.total = response.data.total[0].total;
        console.log(this.state.total);
        const data = response.data.product_data;
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
    let areatableshow;
    let sr = 0;
    if (this.state.userdata.length == 0) {
      areatableshow = (
        <div>
          <center>
            <strong>There is No Product</strong>
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
                <th scope="col">Product Name</th>
                <th scope="col">Product Description</th>
                <th scope="col">Product Type</th>
                <th scope="col">Product Type Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.userdata ? (
                this.state.userdata.map(function(item, id) {
                  return (
                    <tr key={id}>
                      <td>{++sr}</td>
                      <td>{item.product_name || "NO DATA"}</td>
                      <td>{item.product_description || "NO DATA"}</td>
                      <td>{item.product_type_name || "NO DATA"}</td>
                      <td>{item.product_type_description || "NO DATA"}</td>
                      <td>
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
    }
    //next btn logic
    if (this.state.limit == this.state.total) {
      nextbtndisplay = (
        <div>
          <button
            type="button"
            className="btn btn-info"
            onClick={this.nextpagehandler.bind(this)}
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
    if (this.state.skip == 0) {
      prevbtndipsplay = (
        <div>
          <button
            type="button"
            className="btn btn-info"
            onClick={this.prevpagehandler.bind(this)}
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
                          View Area
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
                            <Link to={process.env.PUBLIC_URL + "/Products"}>
                              {" "}
                              <button
                                type="button"
                                className="btn btn-info"
                                style={{ float: "right" }}
                              >
                                <i
                                  className="fa fa-plus-circle"
                                  aria-hidden="true"
                                />
                                &nbsp;&nbsp;&nbsp;Add Product
                              </button>
                            </Link>
                            <br />
                            <br />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            {areatableshow}
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
export default ViewProducts;
