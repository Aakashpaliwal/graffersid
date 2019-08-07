import React, { Component } from "react";
import "./Area.css";
import ReactTable from "react-table";
// import "react-table/react-table.css"
export class Newarea extends Component {
  constructor() {
    super();
    this.state = {
      search_input: "",
      time: new Date().toLocaleString()
    };
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleString()
    });
  }

  render() {
    const data = [
      {
        jobno: "#061",
        date: "28-07-2019",
        carriername: "David Transfer Co.",
        pickuptime: "14-02-2019",
        deliverytime: "16-12-18",
        deliveryontime: "90 %",
        status: "delivered"
      },
      {
        jobno: "#065",
        date: "28-12-2019",
        carriername: "john Transfer Co.",
        pickuptime: "14-08-2019",
        deliverytime: "16-12-19",
        deliveryontime: "70 %",
        status: "In-progress"
      },
      {
        jobno: "#070",
        date: "28-02-2019",
        carriername: "AVN Transfer Co.",
        pickuptime: "14-08-2019",
        deliverytime: "16-07-18",
        deliveryontime: "85 %",
        status: "Pending"
      },
      {
        jobno: "#095",
        date: "28-06-2019",
        carriername: "DC Transfer Co.",
        pickuptime: "14-07-2019",
        deliverytime: "16-01-18",
        deliveryontime: "65 %",
        status: "Cancelled"
      },
      {
        jobno: "#076",
        date: "28-03-2019",
        carriername: "White Elephant Co.",
        pickuptime: "25-09-2019",
        deliverytime: "16-12-19",
        deliveryontime: "90 %",
        status: "Delivered"
      },
      {
        jobno: "#044",
        date: "28-07-2019",
        carriername: "David Transfer Co.",
        pickuptime: "14-02-2019",
        deliverytime: "16-12-18",
        deliveryontime: "90 %",
        status: "delivered"
      },
      {
        jobno: "#061",
        date: "28-07-2019",
        carriername: "David Transfer Co.",
        pickuptime: "14-02-2019",
        deliverytime: "16-12-18",
        deliveryontime: "90 %",
        status: "delivered"
      }
    ];
    const columns = [
      {
        Header: <strong>Job No</strong>,
        accessor: "jobno",
        Cell: props => (
          <span className="number">
            <center>{props.value}</center>
          </span>
        )
      },
      {
        Header: <strong>Date</strong>,
        accessor: "date",
        Cell: props => (
          <span className="number">
            <center>{props.value}</center>
          </span>
        )
      },
      {
        Header: <strong>Carrier Name</strong>,
        accessor: "carriername",
        Cell: props => (
          <span className="number">
            <center>{props.value}</center>
          </span>
        )
      },
      {
        Header: <strong>Pick Up Time</strong>,
        accessor: "pickuptime",
        Cell: props => (
          <span className="number">
            <center>{props.value}</center>
          </span>
        )
      },
      {
        Header: <strong>Delivery Time</strong>,
        accessor: "deliverytime",
        Cell: props => (
          <span className="number">
            <center>{props.value}</center>
          </span>
        )
      },
      {
        Header: <strong>Delivery On Time</strong>,
        accessor: "deliveryontime",
        Cell: props => (
          <span className="number">
            <center>{props.value}</center>
          </span>
        )
      },
      {
        Header: <strong>Status</strong>,
        accessor: "status",
        Cell: props => (
          <span className="number">
            <center>{props.value}</center>
          </span>
        )
      }
    ];
    return (
      <React.Fragment>
        <div>
          <div className="skin-blue fixed-layout">
            <div className="page-wrapper">
              <div className="container-fluid">
                <div className="row page-titles">
                  <div
                    className="col-md-5 align-self-center"
                    style={{ marginTop: "70px" }}
                  >
                    {/* <h4 className="text-themecolor">Forms</h4> */}
                    <nav aria-label="breadcrumb">
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                          <a href="#">Orders</a>
                        </li>
                        <li
                          class="breadcrumb-item active"
                          aria-current="page"
                          style={{ color: "#edbf00" }}
                        >
                          All
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
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 text-center center-block">
                            <ul class="list-inline">
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center">
                                  <i class="fa fa-clone" aria-hidden="true" />
                                  &nbsp;&nbsp;Copy{" "}
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center">
                                  <i class="fa fa-trash-o" aria-hidden="true" />
                                  &nbsp;&nbsp;Delete
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center">
                                  <i
                                    class="fa fa-download"
                                    aria-hidden="true"
                                  />
                                  &nbsp;&nbsp;Download
                                </a>
                              </li>

                              <li class="list-inline-item">
                                <div class="form-group">
                                  <select
                                    class="form-control"
                                    id="exampleFormControlSelect1"
                                  >
                                    <option>All Customer</option>
                                    <option>VIP</option>
                                    <option>VIP</option>
                                  </select>
                                </div>
                              </li>
                            </ul>
                          </div>

                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="side-content">
                              <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                  <p style={{ paddingTop: "10px" }}>
                                    {this.state.search_input}
                                  </p>
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                  <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                      <span
                                        class="input-group-text"
                                        id="basic-addon1"
                                      >
                                        <i
                                          class="fa fa-search"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </div>
                                    <input
                                      type="text"
                                      class="form-control"
                                      aria-label="Username"
                                      aria-describedby="basic-addon1"
                                      value={this.state.search_input}
                                      name="search_input"
                                      onChange={e => this.change(e)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <p style={{ paddingTop: "10px" }}>
                              {this.state.time}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <ReactTable
                              data={data}
                              columns={columns}
                              defaultPageSize={5}
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
        </div>
      </React.Fragment>
    );
  }
}

export default Newarea;
