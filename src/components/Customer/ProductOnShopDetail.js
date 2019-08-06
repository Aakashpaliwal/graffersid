import React, { Component } from 'react'
import './Customer.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../services/url';
import authService from '../../services/auth-service';
import axiosService from '../../services/axios-service';
export class ProductOnShopDetail extends Component {
    constructor () {
        super() 
        this.state = {       
          userdata : [],
          detailsdata : [],
          currentPage: 1,
          todosPerPage: 10
        }
        this.handlepagenumber = this.handlepagenumber.bind(this);
    }
    handlepagenumber(event) {
      this.setState({
        currentPage: Number(event.target.id)
      });
    }
   
   
    componentWillMount ()
    {
      this.handleClick();
    }
    handleClick () {
        let productid = this.props.match.params.id
      axios.get(`${API_URL}product_user/detail/${productid}`,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
      .then(response => {
                console.log('USer Order view')
                console.log(response)
                console.log(response.data.product_user_data);
                
                const data = response.data.product_user_data[0];
                if(response.data.success)
                {
                this.setState({ userdata : data })
                }
                console.log('userdata length',this.state.userdata.length)
              }) 
              .catch(error => {
                console.log(error.response);
              })
      }
    render() {
      const { todos, currentPage, todosPerPage } = this.state;

      let renderTodos

      // Logic for displaying todos
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = this.state.userdata.slice(indexOfFirstTodo, indexOfLastTodo);

        let requirementdata;
        let serial = 0;
        if(this.state.userdata.length == 0)
        {
          renderTodos = (
            <div>
              <center><h4><strong>There is NO Data Yet.</strong></h4></center>
            </div>
          )
        }
        else{
          renderTodos = currentTodos.map((todo, index) => {
            return (
                
                 <tr key = {index}>
       <td>{todo.product_name || "NO DATA"}</td>
       <td>{todo.product_type_name || "NO DATA"}</td>
       <td>{todo.quantity || 'NO DATA'}</td>
       <td>{todo.rate || "NO DATA"}</td>
       <td>{todo.total_rate || "NO DATA"}</td>
       {/* <td>
                <span class="tooltip-toggle" aria-label="Approved" tabindex="0">
           <button className="btn btn-success custom-edit-btn btn-sm" onClick={this.reqapproved.bind(this, todo)}><i className="fa fa-check" aria-hidden="true"></i></button>
                 </span>
           </td> */}

                  </tr>
                
            )
            });
        }
          // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.userdata.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          className="active"
          onClick={this.handlepagenumber}
        >
          {number}
        </li>
      );
    });
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
                                <li className="breadcrumb-todo"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-todo active" aria-current="page">View Shop Details</li>
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
                        <br /><br />
                        <table className="table table-hover table-bordered table-responsive-sm table-responsive-md">
   <thead className="custom-table-head-color">
     <tr>
     <th scope="col">Product Name</th>
     <th scope="col">Product Type</th>
      <th scope="col">Quantity</th>
      <th scope="col">Rate</th>
      <th scope="col">Total Rate</th>
     </tr>
   </thead>
   <tbody>
              {renderTodos}
              </tbody>
              </table>
              <div className="custom-listitem">
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
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

export default ProductOnShopDetail
