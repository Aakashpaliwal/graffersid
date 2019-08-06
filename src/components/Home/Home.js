import React, { Component } from 'react';
import './Home.css';
import {Link} from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../services/url';
import authService from '../../services/auth-service';
import axiosService from '../../services/axios-service';

class Home extends Component {
    constructor () {
        super() 
        this.state = {
          userdata : [],
          detailsdata : [],
          areatabledata : [],
          employedata : [],
          shopdata : [],
          ui_last_t_days : "",
          tdaystext : false
        }
    }
    // handleCheck(item) {
    //   console.log(item.user_id);
    //   let sitemeet = item.user_id;
    //   axios.delete(`user/delete/${sitemeet}`,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
    //   .then(response => {
    //             console.log('Customer /Shop delete view')
    //             console.log(response)
    //             if(response.data.success === true)
    //             {
    //               const customerssss = [...this.state.userdata];
    //                               customerssss.splice(item, 1);
    //                               this.setState({
    //                                   userdata:customerssss
    //                               })
    //             }
    //             else{
    //                              console.log(response.data.msg);
    //                          }
          
    //           }) .catch(error => {
    //             console.log(error);
    //           })
    //  }
    // detailCheck(item) {
    //   // console.log(item.admin_id);
    //   let sitemeet = item.user_id;
    //   axios.get(`user/detail/${sitemeet}`,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
    //   .then(response => {
    //             console.log('Customer /Shop Detail view')
    //             console.log(response.data.user_data);
    //             const detailsdata = response.data.user_data;
    //             this.setState({ detailsdata : detailsdata })
    //           }) .catch(error => {
    //             console.log(error);
    //           })
    //  }
    componentWillMount ()
    {
      this.handleClick();
    }
    handleClick () {
      axios.get(`${API_URL}user/view`,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
      .then(response => {
                console.log('Shop / Customer view')
                console.log(response)
                console.log(response.data.user_data);
                const data = response.data.user_data;
                this.setState({ userdata : data })
              }) .catch(error => {
                console.log(error);
              })

              axios.get(`${API_URL}area/view`,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
              .then(response => {
                        console.log('Area view')
                        console.log(response.data.area_data);
                        const data = response.data.area_data;
                        if(response.data.success)
                        {
                        this.setState({ areatabledata : data })
                        }
                      }) .catch(error => {
                        
                        console.log(error);
                      })

        //employe data view api              
                      axios.get(`${API_URL}total/employe`,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
                      .then(response => {
                                console.log('Totla Employe view')
                                console.log(response.data.total_employe);
                                const data = response.data.total_employe;
                                if(response.data.success)
                                {
                                this.setState({ employedata : data })
                                }
                              }) .catch(error => {
                                
                                console.log(error);
                              })

         //shop data view api              
                      axios.get(`${API_URL}total/shop`,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
                      .then(response => {
                                console.log('Totla shop view')
                                console.log(response.data.total_user);
                                const data = response.data.total_user;
                                if(response.data.success)
                                {
                                this.setState({ shopdata : data })
                                }
                              }) .catch(error => {
                                
                                console.log(error);
                              })
      }
      change  = e => {
        this.setState ({
          [e.target.name]: e.target.value,
         
        });
    
      };
      getWebsite = () =>
      {
          fetch('/');
      }
      onSubmit = e =>
      {
          e.preventDefault();
          console.log(this.state);
          this.setState({
              tdaystext : true
          })
          axios.post(`${API_URL}product_user/last_t_days`, this.state,axios.defaults.headers.common['x-auth-user-token'] = authService.getToken())
          //   .then(console.log(this.state));
        .then(function(response){ 
            console.log('T Days View')
            console.log(response)
            console.log(response.data.product_user_data);
            const data = response.data.product_user_data;
            this.setState({ detailsdata : data })
          }.bind(this)) .catch(error => {
            console.log(error);
          })
      };

      ontablestate = e => {
          this.setState ({
              tdaystext  :false
          })
      }
      
    render() {
        let areatabledata;
      let serial = 0;

      if(this.state.areatabledata.length === 0)
      {
        areatabledata = (<div className="text-center"><h4><strong>No Area Has Been Addedd Yet !!!</strong></h4></div>)
      }
      else{
        areatabledata = (
          
              <tbody>
  {
          this.state.areatabledata ?
          this.state.areatabledata.map(function(item, id) {
            return(
                
    <tr key = {id}>
    <td>{++serial}</td>
      <th scope="row">{item.area_name}</th>
    </tr>
  )
          }, this
  )
          :
          <span>Data is loading....</span>
        }
  </tbody>
          
        )
      }
         let tdaystable;
         if(this.state.tdaystext === true) {
             tdaystable = (
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <button type="button" className="btn btn-info custom-btn-home-here" onClick = {e => this.ontablestate(e)}>Show All Shops </button>
              <br/><br />
                <table className="table table-hover table-bordered ">
                  <thead className="custom-table-head-color">
                    <tr>
                      <th scope="col">Shop Name</th>
                      <th scope = "col">Contact Number</th>
                      <th scope = "col">Email</th>
                      <th scope="col">Shop Location</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                          this.state.detailsdata ?
                          this.state.detailsdata.map(function(item, id) {
                            return(
                                
                    <tr key = {id}>
                      <th scope="row">{item.user_name}</th>
                      <td>{item.user_mobile}</td>
                      <td>{item.user_email}</td>
                      <td>{item.user_location}</td>
                    </tr>
                  )
                          }, this
                  )
                          :
                          <span>Data is loading....</span>
                        }
                  </tbody>
                </table>
                
                
                                </div>
             
            )
         }
         else {
             tdaystable = (
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <br /><br />
<table className="table table-hover table-bordered ">
  <thead className="custom-table-head-color">
    <tr>
      <th scope="col">Shop Name</th>
      <th scope = "col">Contact Number</th>
      <th scope = "col">Email</th>
      <th scope="col">Shop Location</th>
    </tr>
  </thead>
  <tbody>
  {
          this.state.userdata ?
          this.state.userdata.map(function(item, id) {
            return(
                
    <tr key = {id}>
      <th scope="row">{item.user_name}</th>
      <td>{item.user_mobile}</td>
      <td>{item.user_email}</td>
      <td>{item.user_location}</td>
    </tr>
  )
          }, this
  )
          :
          <span>There Is No DATA !!!</span>
        }
  </tbody>
</table>


                </div>
             )
         }
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
                                <li className="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
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
                                            <h3><i className="fa fa-shopping-basket" aria-hidden="true"></i></h3>
                                            <p className="text-muted">TOTAL SHOPS</p>
                                            <p className="text-muted">LAST ACTIVE SHOPS</p>
                                        </div>
                                        <div className="ml-auto">
                                        {
          this.state.shopdata ?
          this.state.shopdata.map(function(item, id) {
            return(
                                            <h2 className="counter text-primary" key={id}>{item.total_user}</h2>
                                        )
          }, this
  )
          :
          <span>There Is No DATA !!!</span>
        }
                                            <h2 className="counter text-primary">23</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="progress">
                                        <div className="progress-bar bg-primary custom-ap-style" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
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
                                        <div className="progress-bar bg-cyan custom-ap-style" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
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
                                            <h3><i className="fa fa-user-o" aria-hidden="true"></i></h3>
                                            <p className="text-muted">MY EMPLOYEES</p>
                                            <p className="text-muted">ACTIVE EMPLOYEES</p>
                                        </div>
                                        <div className="ml-auto">
                                        {
          this.state.employedata ?
          this.state.employedata.map(function(item, id) {
            return(
                                            <h2 className="counter text-purple" key={id}>
                                            {item.total_employe}
                                            </h2>
                                        )
          }, this
  )
          :
          <span>There Is No DATA !!!</span>
        }

                                            <h2 className="counter text-purple">157</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="progress">
                                        <div className="progress-bar bg-purple custom-ap-style" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
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
                                            <h3><i className="fa fa-suitcase" aria-hidden="true"></i></h3>
                                            <p className="text-muted">DUE PAYMENT</p>
                                        </div>
                                        <div className="ml-auto">
                                            <h2 className="counter text-success">431</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="progress">
                                        <div className="progress-bar bg-success custom-ap-style" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="row">
                    
                    <div className="col-lg-12 col-md-12">
                        <div className="">
                            <div className="">
                                   {/*table here */}
                <div className="custom-shop-home-table">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          
                            <div className="custom-table-product">
                            <p>Some Tale Here</p>
                            <hr />
                            
                        <table className="table table-hover table-bordered ">
  <thead className="custom-table-head-color">
    <tr>
    <th scope="col">Sr. No.</th>
      <th scope="col">Area Address</th>
    
    </tr>
  </thead>
 {areatabledata}
</table>
</div>
                            </div>
                        </div>
                    </div>

                </div>

             {/*end table here */} 
                                  
                                    <div className="custom-table-product">
              <div className="container">
                <div className="row">
                <div className = "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <p>Please Enter The Number Below to see Inactive Shop Days . </p>
                  <br />
                  <form className="custom-content-form" autoComplete = "OFF">
  <div class="form-row">
    <div class="form-group col-md-12">
    <div class="input-group mb-3">
  <input type="text" className="form-control" placeholder="Enter The Number Of Days" aria-label="Recipient's username" aria-describedby="basic-addon2" name="ui_last_t_days" value = {this.state.ui_last_t_days} onChange = {e => this.change(e)}/>
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button" onClick = { e => this.onSubmit(e)}>Button</button>
  </div>
</div>
    </div>
  </div>

  {/* <button class="btn btn-primary customcost-btn" onClick = {this.totalcostbtn.bind(this)}>Show Total Cost</button> */}
</form>
                </div>
             {tdaystable}
                <br />    
                <br />
                {/*second table */}
              {/* {tdaystable} */}

                {/*end second table */}
                </div>
              </div>  
            
           </div>
                              
                          
                                <div id="morris-area-chart" style={{height: "340px"}}></div>
                            </div>
                        </div>
                    </div>
                </div>
{/*          
                <div className="row">
                    
                    <div className="col-lg-8 col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex m-b-40 align-items-center no-block">
                                    <h5 className="card-title ">YEARLY SALES</h5>
                                    <div className="ml-auto">
                                        <ul className="list-inline font-12">
                                            <li><i className="fa fa-circle text-cyan"></i> Iphone</li>
                                            <li><i className="fa fa-circle text-primary"></i> Ipad</li>
                                            <li><i className="fa fa-circle text-purple"></i> Ipod</li>
                                        </ul>
                                    </div>
                                </div>
                                <div id="morris-area-chart" style="height: 340px;"></div>
                            </div>
                        </div>
                    </div>
                   
                    <div className="col-lg-4 col-md-12">
                        <div className="row">
                           
                            <div className="col-md-12">
                                <div className="card bg-cyan text-white">
                                    <div className="card-body ">
                                        <div className="row weather">
                                            <div className="col-6 m-t-40">
                                                <h3>&nbsp;</h3>
                                                <div className="display-4">73<sup>°F</sup></div>
                                                <p className="text-white">AHMEDABAD, INDIA</p>
                                            </div>
                                            <div className="col-6 text-right">
                                                <h1 className="m-b-"><i className="fa fa-cloud" aria-hidden="true"></i></h1>
                                                <b className="text-white">Cloudy DAY</b>
                                                <p className="op-5">April 14</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                            <div className="col-md-12">
                                <div className="card bg-primary text-white">
                                    <div className="card-body">
                                        <div id="myCarouse2" className="carousel slide" data-ride="carousel">
                                           
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <h4 className="cmin-height">My Acting blown <span className="font-medium">Your Mind</span> and you also <br/>laugh at the moment</h4>
                                                    <div className="d-flex no-block">
                                                        <span><img src={require('../../assets/images/users/1.jpg')} className='img-circle' width="50" /></span>
                                                        <span className="m-l-10">
                                                    <h4 className="text-white m-b-0">Govinda</h4>
                                                    <p className="text-white">Actor</p>
                                                    </span>
                                                    </div>
                                                </div>
                                                <div className="carousel-item">
                                                    <h4 className="cmin-height">My Acting blown <span className="font-medium">Your Mind</span> and you also <br/>laugh at the moment</h4>
                                                    <div className="d-flex no-block">
                                                        <span><img src={require('../../assets/images/users/2.jpg')} alt="user" width="50" className="img-circle" /></span>
                                                        <span className="m-l-10">
                                                    <h4 className="text-white m-b-0">Govinda</h4>
                                                    <p className="text-white">Actor</p>
                                                    </span>
                                                    </div>
                                                </div>
                                                <div className="carousel-item">
                                                    <h4 className="cmin-height">My Acting blown <span className="font-medium">Your Mind</span> and you also <br/>laugh at the moment</h4>
                                                    <div className="d-flex no-block">
                                                        <span><img src={require('../../assets/images/users/3.jpg')} alt="user" width="50" className="img-circle" /></span>
                                                        <span className="m-l-10">
                                                    <h4 className="text-white m-b-0">Govinda</h4>
                                                    <p className="text-white">Actor</p>
                                                    </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div> */}
{/*               
                <div className="row">
                   
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Recent Comments</h5>
                            </div>
                      
                            <div className="comment-widgets">
                               
                                <div className="d-flex no-block comment-row">
                                    <div className="p-2"><span className="round"><img src={require('../../assets/images/users/1.jpg')} alt="user" width="50" /></span></div>
                                    <div className="comment-text w-100">
                                        <h5 className="font-medium">James Anderson</h5>
                                        <p className="m-b-10 text-muted">Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.</p>
                                        <div className="comment-footer">
                                            <span className="text-muted pull-right">April 14, 2016</span> <span className="badge badge-pill badge-info">Pending</span> <span className="action-icons">
                                                    <a href="javascript:void(0)"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                                                    <a href="javascript:void(0)"><i className="fa fa-check" aria-hidden="true"></i></a>
                                                    <a href="javascript:void(0)"><i className="fa fa-heart-o" aria-hidden="true"></i></a>    
                                                </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="d-flex no-block comment-row border-top">
                                    <div className="p-2"><span className="round"><img src={require('../../assets/images/users/2.jpg')}alt="user" width="50" /></span></div>
                                    <div className="comment-text active w-100">
                                        <h5 className="font-medium">Michael Jorden</h5>
                                        <p className="m-b-10 text-muted">Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry..</p>
                                        <div className="comment-footer">
                                            <span className="text-muted pull-right">April 14, 2016</span>
                                            <span className="badge badge-pill badge-success">Approved</span>
                                            <span className="action-icons active">
                                                    <a href="javascript:void(0)"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                                                    <a href="javascript:void(0)"><i className="fa fa-check" aria-hidden="true"></i></a>
                                                    <a href="javascript:void(0)"><i className="fa fa-heart-o" aria-hidden="true"></i></a>    
                                                </span>
                                        </div>
                                    </div>
                                </div>
                               
                                <div className="d-flex no-block comment-row border-top">
                                    <div className="p-2"><span className="round"><img src={require('../../assets/images/users/3.jpg')} alt="user" width="50" /></span></div>
                                    <div className="comment-text w-100">
                                        <h5 className="font-medium">Johnathan Doeting</h5>
                                        <p className="m-b-10 text-muted">Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.</p>
                                        <div className="comment-footer">
                                            <span className="text-muted pull-right">April 14, 2016</span>
                                            <span className="badge badge-pill badge-danger">Rejected</span>
                                            <span className="action-icons">
                                                    <a href="javascript:void(0)"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                                                    <a href="javascript:void(0)"><i className="fa fa-check" aria-hidden="true"></i></a>
                                                    <a href="javascript:void(0)"><i className="fa fa-heart-o" aria-hidden="true"></i></a>    
                                                </span>
                                        </div>
                                    </div>
                                </div>
                               
                                <div className="d-flex no-block comment-row border-top">
                                    <div className="p-2"><span className="round"><img src={require('../../assets/images/users/4.jpg')} alt="user" width="50" /></span></div>
                                    <div className="comment-text active w-100">
                                        <h5 className="font-medium">Genelia doe</h5>
                                        <p className="m-b-10 text-muted">Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry..</p>
                                        <div className="comment-footer">
                                            <span className="text-muted pull-right">April 14, 2016</span>
                                            <span className="badge badge-pill badge-success">Approved</span>
                                            <span className="action-icons active">
                                                    <a href="javascript:void(0)"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                                                    <a href="javascript:void(0)"><i className="fa fa-check" aria-hidden="true"></i></a>
                                                    <a href="javascript:void(0)"><i className="fa fa-heart-o" aria-hidden="true"></i></a>    
                                                </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
              
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex">
                                    <div>
                                        <h5 className="card-title">Sales Overview</h5>
                                        <h6 className="card-subtitle">Check the monthly sales </h6>
                                    </div>
                                    <div className="ml-auto">
                                        <select className="custom-select b-0">
                                            <option>January</option>
                                            <option value="1">February</option>
                                            <option value="2" selected="">March</option>
                                            <option value="3">April</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body bg-light">
                                <div className="row">
                                    <div className="col-6">
                                        <h3>March 2017</h3>
                                        <h5 className="font-light m-t-0">Report for this month</h5></div>
                                    <div className="col-6 align-self-center display-6 text-right">
                                        <h2 className="text-success">$3,690</h2></div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th>NAME</th>
                                            <th>STATUS</th>
                                            <th>DATE</th>
                                            <th>PRICE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-center">1</td>
                                            <td className="txt-oflo">Elite admin</td>
                                            <td><span className="badge badge-success badge-pill">sale</span> </td>
                                            <td className="txt-oflo">April 18, 2017</td>
                                            <td><span className="text-success">$24</span></td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">2</td>
                                            <td className="txt-oflo">Real Homes WP Theme</td>
                                            <td><span className="badge badge-info badge-pill">extended</span></td>
                                            <td className="txt-oflo">April 19, 2017</td>
                                            <td><span className="text-info">$1250</span></td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">3</td>
                                            <td className="txt-oflo">Ample Admin</td>
                                            <td><span className="badge badge-info badge-pill">extended</span></td>
                                            <td className="txt-oflo">April 19, 2017</td>
                                            <td><span className="text-info">$1250</span></td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">4</td>
                                            <td className="txt-oflo">Medical Pro WP Theme</td>
                                            <td><span className="badge badge-danger badge-pill">tax</span></td>
                                            <td className="txt-oflo">April 20, 2017</td>
                                            <td><span className="text-danger">-$24</span></td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">5</td>
                                            <td className="txt-oflo">Hosting press html</td>
                                            <td><span className="badge badge-success badge-pill">sale</span></td>
                                            <td className="txt-oflo">April 21, 2017</td>
                                            <td><span className="text-success">$24</span></td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">6</td>
                                            <td className="txt-oflo">Digital Agency PSD</td>
                                            <td><span className="badge badge-success badge-pill">sale</span> </td>
                                            <td className="txt-oflo">April 23, 2017</td>
                                            <td><span className="text-danger">-$14</span></td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">7</td>
                                            <td className="txt-oflo">Helping Hands WP Theme</td>
                                            <td><span className="badge badge-warning badge-pill">member</span></td>
                                            <td className="txt-oflo">April 22, 2017</td>
                                            <td><span className="text-success">$64</span></td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">8</td>
                                            <td className="txt-oflo">Ample Admin</td>
                                            <td><span className="badge badge-info badge-pill">extended</span></td>
                                            <td className="txt-oflo">April 19, 2017</td>
                                            <td><span className="text-info">$1250</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div> */}
{/*            
                <div className="row">
                   
                    <div className="col-lg-8 col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex m-b-40 align-items-center no-block">
                                    <h5 className="card-title ">SALES DIFFERENCE</h5>
                                    <div className="ml-auto">
                                        <ul className="list-inline font-12">
                                            <li><i className="fa fa-circle text-cyan"></i> SITE A</li>
                                            <li><i className="fa fa-circle text-primary"></i> SITE B</li>
                                        </ul>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                   
                    <div className="col-lg-4 col-md-12">
                        <div className="row">
                           
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">SALES DIFFERENCE</h5>
                                        <div className="row">
                                            <div className="col-6  m-t-30">
                                                <h1 className="text-info">$647</h1>
                                                <p className="text-muted">APRIL 2017</p>
                                                <b>(150 Sales)</b> </div>
                                            <div className="col-6">
                                                <div id="sparkline2dash" className="text-right"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-12">
                                <div className="card bg-purple text-white">
                                    <div className="card-body">
                                        <h5 className="card-title">VISIT STATASTICS</h5>
                                        <div className="row">
                                            <div className="col-6  m-t-30">
                                                <h1 className="text-white">$347</h1>
                                                <p className="light_op_text">APRIL 2017</p>
                                                <b className="text-white">(150 Sales)</b> </div>
                                            <div className="col-6">
                                                <div id="sales1" className="text-right"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div> */}
{/*                
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex no-block align-items-center">
                                    <div>
                                        <h5 className="card-title m-b-0">TO DO LIST</h5>
                                    </div>
                                    <div className="ml-auto">
                                        <button className="pull-right btn btn-circle btn-success" data-toggle="modal" data-target="#myModal"><i className="ti-plus"></i></button>
                                    </div>
                                </div>
                               
                                <div className="to-do-widget m-t-20">
                                   
                                    <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">Add Task</h4>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                                                </div>
                                                <div className="modal-body">
                                                    <form>
                                                        <div className="form-group">
                                                            <label>Task name</label>
                                                            <input type="text" className="form-control" placeholder="Enter Task Name" /> </div>
                                                        <div className="form-group">
                                                            <label>Assign to</label>
                                                            <select className="custom-select form-control pull-right">
                                                                <option selected="">Sachin</option>
                                                                <option value="1">Sehwag</option>
                                                                <option value="2">Pritam</option>
                                                                <option value="3">Alia</option>
                                                                <option value="4">Varun</option>
                                                            </select>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-success" data-dismiss="modal">Submit</button>
                                                </div>
                                            </div>
                                           
                                        </div>
                                       
                                    </div>
                                   
                                    <ul className="list-task todo-list list-group m-b-0" data-role="tasklist">
                                        <li className="list-group-item" data-role="task">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                <label className="custom-control-label" for="customCheck">
                                                    <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</span> <span className="badge badge-pill badge-danger pull-right">Today</span>
                                                </label>
                                            </div>
                                            <ul className="assignedto">
                                                <li><img src={require('../../assets/images/users/1.jpg')} alt="user" data-toggle="tooltip" data-placement="top" title="" data-original-title="Steave" /></li>
                                                <li><img src={require('../../assets/images/users/2.jpg')} alt="user" data-toggle="tooltip" data-placement="top" title="" data-original-title="Jessica" /></li>
                                                <li><img src={require('../../assets/images/users/3.jpg')} alt="user" data-toggle="tooltip" data-placement="top" title="" data-original-title="Priyanka" /></li>
                                                <li><img src={require('../../assets/images/users/4.jpg')} alt="user" data-toggle="tooltip" data-placement="top" title="" data-original-title="Selina" /></li>
                                            </ul>
                                        </li>
                                        <li className="list-group-item" data-role="task">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label className="custom-control-label" for="customCheck1">
                                                    <span>Lorem Ipsum is simply dummy text of the printing</span><span className="badge badge-pill badge-primary pull-right">1 week </span>
                                                </label>
                                            </div>
                                            <div className="item-date"> 26 jun 2017</div>
                                        </li>
                                        <li className="list-group-item" data-role="task">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customCheck2" />
                                                <label className="custom-control-label" for="customCheck2">
                                                    <span>Give Purchase report to</span> <span className="badge badge-pill badge-info pull-right">Yesterday</span>
                                                </label>
                                            </div>
                                            <ul className="assignedto">
                                                <li><img src={require('../../assets/images/users/3.jpg')} alt="user" data-toggle="tooltip" data-placement="top" title="" data-original-title="Priyanka" /></li>
                                                <li><img src={require('../../assets/images/users/4.jpg')} alt="user" data-toggle="tooltip" data-placement="top" title="" data-original-title="Selina" /></li>
                                            </ul>
                                        </li>
                                        <li className="list-group-item" data-role="task">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                                <label className="custom-control-label" for="customCheck3">
                                                    <span>Lorem Ipsum is simply dummy text of the printing </span> <span className="badge badge-pill badge-warning pull-right">2 weeks</span>
                                                </label>
                                            </div>
                                            <div className="item-date"> 26 jun 2017</div>
                                        </li>
                                        <li className="list-group-item" data-role="task">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customCheck4" />
                                                <label className="custom-control-label" for="customCheck4">
                                                    <span>Give Purchase report to</span> <span className="badge badge-pill badge-info pull-right">Yesterday</span>
                                                </label>
                                            </div>
                                            <ul className="assignedto">
                                                <li><img src={require('../../assets/images/users/3.jpg')} alt="user" data-toggle="tooltip" data-placement="top" title="" data-original-title="Priyanka" /></li>
                                                <li><img src={require('../../assets/images/users/4.jpg')} alt="user" data-toggle="tooltip" data-placement="top" title="" data-original-title="Selina" /></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">YOU HAVE 5 NEW MESSAGES</h5>
                                <div className="message-box">
                                    <div className="message-widget message-scroll">
                                       
                                        <a href="javascript:void(0)">
                                            <div className="user-img"> <img src={require('../../assets/images/users/1.jpg')} alt="user" className="img-circle" /> <span className="profile-status online pull-right"></span> </div>
                                            <div className="mail-contnet">
                                                <h5>Pavan kumar</h5> <span className="mail-desc">Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been.</span> <span className="time">9:30 AM</span> </div>
                                        </a>
                                        
                                        <a href="javascript:void(0)">
                                            <div className="user-img"> <img src={require('../../assets/images/users/2.jpg')} alt="user" className="img-circle" /> <span className="profile-status busy pull-right"></span> </div>
                                            <div className="mail-contnet">
                                                <h5>Sonu Nigam</h5> <span className="mail-desc">I've sung a song! See you at</span> <span className="time">9:10 AM</span> </div>
                                        </a>
                                        
                                        <a href="javascript:void(0)">
                                            <div className="user-img"> <span className="round">A</span> <span className="profile-status away pull-right"></span> </div>
                                            <div className="mail-contnet">
                                                <h5>Arijit Sinh</h5> <span className="mail-desc">Simply dummy text of the printing and typesetting industry.</span> <span className="time">9:08 AM</span> </div>
                                        </a>
                                       
                                        <a href="javascript:void(0)">
                                            <div className="user-img"> <img src={require('../../assets/images/users/4.jpg')} alt="user" className="img-circle" /> <span className="profile-status offline pull-right"></span> </div>
                                            <div className="mail-contnet">
                                                <h5>Pavan kumar</h5> <span className="mail-desc">Just see the my admin!</span> <span className="time">9:02 AM</span> </div>
                                        </a>
                                        
                                        <a href="javascript:void(0)">
                                            <div className="user-img"> <img src={require('../../assets/images/users/1.jpg')} alt="user" className="img-circle" /> <span className="profile-status online pull-right"></span> </div>
                                            <div className="mail-contnet">
                                                <h5>Pavan kumar</h5> <span className="mail-desc">Welcome to the Elite Admin</span> <span className="time">9:30 AM</span> </div>
                                        </a>
                                       
                                        <a href="javascript:void(0)">
                                            <div className="user-img"> <img src={require('../../assets/images/users/2.jpg')} alt="user" className="img-circle" /> <span className="profile-status busy pull-right"></span> </div>
                                            <div className="mail-contnet">
                                                <h5>Sonu Nigam</h5> <span className="mail-desc">I've sung a song! See you at</span> <span className="time">9:10 AM</span> </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">CHAT</h5>
                                <div className="chat-box">
                                   
                                    <ul className="chat-list">
                                       
                                        <li>
                                            <div className="chat-img"><img src={require('../../assets/images/users/1.jpg')} alt="user" /></div>
                                            <div className="chat-content">
                                                <h5>James Anderson</h5>
                                                <div className="box bg-light-info">Lorem Ipsum is simply dummy text of the printing &amp; type setting industry.</div>
                                            </div>
                                            <div className="chat-time">10:56 am</div>
                                        </li>
                                       
                                        <li>
                                            <div className="chat-img"><img src={require('../../assets/images/users/1.jpg')} alt="user" /></div>
                                            <div className="chat-content">
                                                <h5>Bianca Doe</h5>
                                                <div className="box bg-light-info">It’s Great opportunity to work.</div>
                                            </div>
                                            <div className="chat-time">10:57 am</div>
                                        </li>
                                       
                                        <li className="odd">
                                            <div className="chat-content">
                                                <div className="box bg-light-inverse">I would love to join the team.</div>
                                                <br />
                                            </div>
                                            <div className="chat-time">10:58 am</div>
                                        </li>
                                       
                                        <li className="odd">
                                            <div className="chat-content">
                                                <div className="box bg-light-inverse">Whats budget of the new project.</div>
                                                <br />
                                            </div>
                                            <div className="chat-time">10:59 am</div>
                                        </li>
                                       
                                        <li>
                                            <div className="chat-img"><img src={require('../../assets/images/users/1.jpg')} alt="user" /></div>
                                            <div className="chat-content">
                                                <h5>Angelina Rhodes</h5>
                                                <div className="box bg-light-info">Well we have good budget for the project</div>
                                            </div>
                                            <div className="chat-time">11:00 am</div>
                                        </li>
                                       
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body border-top">
                                <div className="row">
                                    <div className="col-8">
                                        <textarea placeholder="Type your message here" className="form-control border-0"></textarea>
                                    </div>
                                    <div className="col-4 text-right">
                                        <button type="button" className="btn btn-info btn-circle btn-lg"><i className="fa fa-paper-plane-o"></i> </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
{/*          
                <div className="right-sidebar">
                    <div className="slimscrollright">
                        <div className="rpanel-title"> Service Panel <span><i className="ti-close right-side-toggle"></i></span> </div>
                        <div className="r-panel-body">
                            <ul id="themecolors" className="m-t-20">
                                <li><b>With Light sidebar</b></li>
                                <li><a href="javascript:void(0)" data-skin="skin-default" className="default-theme">1</a></li>
                                <li><a href="javascript:void(0)" data-skin="skin-green" className="green-theme">2</a></li>
                                <li><a href="javascript:void(0)" data-skin="skin-red" className="red-theme">3</a></li>
                                <li><a href="javascript:void(0)" data-skin="skin-blue" className="blue-theme working">4</a></li>
                                <li><a href="javascript:void(0)" data-skin="skin-purple" className="purple-theme">5</a></li>
                                <li><a href="javascript:void(0)" data-skin="skin-megna" className="megna-theme">6</a></li>
                                <li className="d-block m-t-30"><b>With Dark sidebar</b></li>
                                <li><a href="javascript:void(0)" data-skin="skin-default-dark" className="default-dark-theme ">7</a></li>
                                <li><a href="javascript:void(0)" data-skin="skin-green-dark" className="green-dark-theme">8</a></li>
                                <li><a href="javascript:void(0)" data-skin="skin-red-dark" className="red-dark-theme">9</a></li>
                                <li><a href="javascript:void(0)" data-skin="skin-blue-dark" className="blue-dark-theme">10</a></li>
                                <li><a href="javascript:void(0)" data-skin="skin-purple-dark" className="purple-dark-theme">11</a></li>
                                <li><a href="javascript:void(0)" data-skin="skin-megna-dark" className="megna-dark-theme ">12</a></li>
                            </ul>
                            <ul className="m-t-20 chatonline">
                                <li><b>Chat option</b></li>
                                <li>
                                    <a href="javascript:void(0)"><img src={require('../../assets/images/users/1.jpg')} alt="user-img" className="img-circle" /> <span>Varun Dhavan <small className="text-success">online</small></span></a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"><img src={require('../../assets/images/users/2.jpg')} alt="user-img" className="img-circle" /> <span>Genelia Deshmukh <small className="text-warning">Away</small></span></a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"><img src={require('../../assets/images/users/3.jpg')} alt="user-img" className="img-circle" /> <span>Ritesh Deshmukh <small className="text-danger">Busy</small></span></a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"><img src={require('../../assets/images/users/4.jpg')} alt="user-img" className="img-circle" /> <span>Arijit Sinh <small className="text-muted">Offline</small></span></a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"><img src={require('../../assets/images/users/5.jpg')} alt="user-img" className="img-circle" /> <span>Govinda Star <small className="text-success">online</small></span></a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"><img src={require('../../assets/images/users/6.jpg')} alt="user-img" className="img-circle" /> <span>John Abraham<small className="text-success">online</small></span></a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"><img src={require('../../assets/images/users/7.jpg')} alt="user-img" className="img-circle" /> <span>Hritik Roshan<small className="text-success">online</small></span></a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"><img src={require('../../assets/images/users/8.jpg')} alt="user-img" className="img-circle" /> <span>Pwandeep rajan <small className="text-success">online</small></span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> */}
               
            </div>
          
        </div>
           </div>
        );
    }
}

export default Home;