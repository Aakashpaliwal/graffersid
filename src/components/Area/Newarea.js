import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import "./Area.css";
// import Griddle, { plugins, RowDefinition, ColumnDefinition, LocalPlugin} from 'griddle-react';
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
        // friend: {
        //   name: "Jason Maurer",
        //   age: 23
        // }
      },
      {
        jobno: "#065",
        date: "28-12-2019",
        carriername: "john Transfer Co.",
        pickuptime: "14-08-2019",
        deliverytime: "16-12-19",
        deliveryontime: "70 %",
        status: "In-progress"
        // friend: {
        //   name: "Jason Maurer",
        //   age: 23
        // }
      },
      {
        jobno: "#070",
        date: "28-02-2019",
        carriername: "AVN Transfer Co.",
        pickuptime: "14-08-2019",
        deliverytime: "16-07-18",
        deliveryontime: "85 %",
        status: "Pending"
        // friend: {
        //   name: "Jason Maurer",
        //   age: 23
        // }
      },
      {
        jobno: "#095",
        date: "28-06-2019",
        carriername: "DC Transfer Co.",
        pickuptime: "14-07-2019",
        deliverytime: "16-01-18",
        deliveryontime: "65 %",
        status: "Cancelled"
        // friend: {
        //   name: "Jason Maurer",
        //   age: 23
        // }
      },
      {
        jobno: "#076",
        date: "28-03-2019",
        carriername: "White Elephant Co.",
        pickuptime: "25-09-2019",
        deliverytime: "16-12-19",
        deliveryontime: "90 %",
        status: "Delivered"
        // friend: {
        //   name: "Jason Maurer",
        //   age: 23
        // }
      },
      {
        jobno: "#044",
        date: "28-07-2019",
        carriername: "David Transfer Co.",
        pickuptime: "14-02-2019",
        deliverytime: "16-12-18",
        deliveryontime: "90 %",
        status: "delivered"
        // friend: {
        //   name: "Jason Maurer",
        //   age: 23
        // }
      },
      {
        jobno: "#061",
        date: "28-07-2019",
        carriername: "David Transfer Co.",
        pickuptime: "14-02-2019",
        deliverytime: "16-12-18",
        deliveryontime: "90 %",
        status: "delivered"
        // friend: {
        //   name: "Jason Maurer",
        //   age: 23
        // }
      }
    ];
    const columns = [
      {
        Header: <strong>Job No</strong>,
        accessor: "jobno", // String-based value accessors!
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
        ) // Custom cell components!
      },
      {
        Header: <strong>Carrier Name</strong>,
        accessor: "carriername",
        Cell: props => (
          <span className="number">
            <center>{props.value}</center>
          </span>
        ) // Custom cell components!
      },
      {
        Header: <strong>Pick Up Time</strong>,
        accessor: "pickuptime",
        Cell: props => (
          <span className="number">
            <center>{props.value}</center>
          </span>
        ) // Custom cell components!
      },
      {
        Header: <strong>Delivery Time</strong>,
        accessor: "deliverytime",
        Cell: props => (
          <span className="number">
            <center>{props.value}</center>
          </span>
        ) // Custom cell components!
      },
      {
        Header: <strong>Delivery On Time</strong>,
        accessor: "deliveryontime",
        Cell: props => (
          <span className="number">
            <center>{props.value}</center>
          </span>
        ) // Custom cell components!
      },
      {
        Header: <strong>Status</strong>,
        accessor: "status",
        Cell: props => (
          <span className="number">
            <center>{props.value}</center>
          </span>
        ) // Custom cell components!
      }
      //   {
      //     id: "friendName", // Required because our accessor is not a string
      //     Header: "Friend Name",
      //     accessor: d => d.friend.name // Custom value accessors!
      //   },
      //   {
      //     Header: props => <span>Friend Age</span>, // Custom header components!
      //     accessor: "friend.age"
      //   }
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
                        <li class="breadcrumb-item active" aria-current="page" style={{color : '#edbf00'}}>
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
                          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            {/* <p>{this.state.current_date_time}</p> */}
                            <p style={{ paddingTop: "10px" }}>
                              {this.state.time}
                            </p>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <p style={{ paddingTop: "10px" }}>
                              {this.state.search_input}
                            </p>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                <span
                                  class="input-group-text"
                                  id="basic-addon1"
                                >
                                  <i class="fa fa-search" aria-hidden="true" />
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
                            <br />
                            <br />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            {/* {areatableshow} */}
                            {/* <Griddle data={data} plugins={[LocalPlugin]}>
                              <RowDefinition>
                                <ColumnDefinition id="name" title="Name" />
                                <ColumnDefinition
                                  id="state"
                                  title="Location"
                                  order={1}
                                  width={400}
                                />
                                <ColumnDefinition
                                  id="company"
                                  title="Organization"
                                />
                              </RowDefinition>
                            </Griddle> */}
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
