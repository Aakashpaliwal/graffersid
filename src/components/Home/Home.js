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
                                        {/* {
          this.state.shopdata ?
          this.state.shopdata.map(function(item, id) {
            return( */}
                                            {/* <h2 className="counter text-primary">{item.total_user}</h2> */}
                                        {/* )
          }, this
  )
          :
          <span>There Is No DATA !!!</span>
        } */}
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
                    

               
            </div>
          
        </div>
           </div>
        );
    }
}

export default Home;