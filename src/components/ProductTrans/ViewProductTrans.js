import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../services/url";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import Moment from "react-moment";
import Pagination from "react-js-pagination";
export class ViewProductTrans extends Component {
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
    let dataskip = --this.props.match.params.id;
    console.log(dataskip);
    this.props.match.params.id = dataskip;
    console.log(this.props.match.params.id * this.state.limit);
    this.props.history.push(`/ViewProductTrans/${this.props.match.params.id}`);
    this.forceUpdate();
    this.handleClick();
    // axios
    //   .get(
    //     `${API_URL}/product_in/view/${dataskip}/${limit}`,
    //     (axios.defaults.headers.common["w_auth"] = authService.getToken())
    //   )
    //   .then(response => {
    //     console.log(response.data.product_in_data);
    //     const data = response.data.product_in_data;
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
    this.props.history.push(`/ViewProductTrans/${this.props.match.params.id}`);
    // console.log(`/ViewArea/${this.props.match.params.id}`);
    this.forceUpdate();
    this.handleClick();
    // axios
    //   .get(
    //     `${API_URL}/product_in/view/${dataskip}/${limit}`,
    //     (axios.defaults.headers.common["w_auth"] = authService.getToken())
    //   )
    //   .then(response => {
    //     console.log(response.data.product_in_data);
    //     const data = response.data.product_in_data;
    //     this.setState({ userdata: data });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
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
    console.log(item.area_id);
    let stodoeet = item.area_id;
    if (window.confirm("Are You Sure You Want To Delete This Area?")) {
      axios
        .delete(
          `${API_URL}product_in/delete/${stodoeet}`,
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
    console.log(this.props.match.params.id);
    let defaultskip = this.props.match.params.id * this.state.limit;
    // let defaultskip = await (+this.props.match.params.id)* +this.state.limit;
    let defaultlimit = this.state.limit;
    // console.log(`${API_URL}area/view/${defaultskip}/${defaultlimit}`);
    axios
      .get(
        `${API_URL}product_in/view/${defaultskip}/${defaultlimit}`,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      )
      .then(response => {
        // console.log("Area view");
        console.log(response.data);
        console.log("total", response.data.total[0]);
        // this.setState({
        //   total: response.data.total[0].total
        // });
        this.state.total = response.data.total[0].total;
        console.log(this.state.total);
        const data = response.data.product_in_data;
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
            <strong>There is No Data.</strong>
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
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Quantity</th>
                <th scope="col">Cost Per Unit</th>
                <th scope="col">Total Cost</th>
                <th scope="col">Date of Coming</th>
              </tr>
            </thead>
            <tbody>
              {this.state.userdata ? (
                this.state.userdata.map(function(item, id) {
                  return (
                    <tr key={id}>
                      <td>{++sr}</td>
                      <td className="prod-trans-name">
                        {item.product_name || "NO DATA"}
                      </td>
                      <td className="prod-trans-name">
                        {item.product_type_name || "NO DATA"}
                      </td>
                      <td>
                        {item.product_in_quantity * item.piece_quantity ||
                          "NO DATA"}{" "}
                        Pieces
                      </td>
                      <td>{item.piece_price || "NO DATA"} &#x20b9;</td>
                      <td>{item.product_in_total_cost || 0} &#x20b9;</td>
                      <td>
                        <Moment format="LL">
                          {item.date_of_coming || "NO DATA"}
                        </Moment>
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
                            <Link to={process.env.PUBLIC_URL + "/ProductTrans"}>
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
                                &nbsp;&nbsp;&nbsp;Add Product Trans
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
export default withRouter(ViewProductTrans);
