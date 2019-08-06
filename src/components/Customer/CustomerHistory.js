import React, { Component } from 'react'
import './Customer.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../services/url';
import authService from '../../services/auth-service';
import Workbook from 'react-excel-workbook'
export class CustomerHistory extends Component {
  constructor(props)
  {
      super(props)
      this.state = {
              ui_id : this.props.match.params.id,
              proddata : [],
              userdata : [],
              cobinedata : ""
         };
         this.detailhandler = this.detailhandler.bind(this);
        // this.change = this.change.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
  }
  detailhandler (item) {
    console.log('props passess', item.user_product_master_id)
    let productid = item.user_product_master_id
    this.props.history.push(`/ShopHistoryDetail/${productid}`) 
    console.log('employe name', item.employe_name)
    localStorage.setItem('shop_employe_name', item.employe_name)
    localStorage.setItem('shop_total_bill', item.total_payment)
    localStorage.setItem('shop_date_of_delivery', item.date_of_delivery)


  }
 
  componentWillMount ()
  {
    this.handleClick();
  }
  handleClick () {
    let Editid = this.props.match.params.id;
    //console.log(this.props.match.params.id)
    axios.get(`${API_URL}user/detail/${Editid}`,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
      .then((resp) => {
          console.log(resp)
          console.log(resp.data.user_data);
          const data = resp.data.user_data;
          const proddata = resp.data.user_product_data;
          this.setState({ 
            userdata : data,
            proddata : proddata,
            cobinedata : data[0].user_name
           })
          //  this.state.cobinedata = resp.data.user_data[0].user_name;
           console.log('combine')
           console.log(this.state.cobinedata)
        }) .catch(error => {
          
          console.log(error.response);
        })
    
        
      
    }
render() {
  let prodducttable;
  if(this.state.proddata.length == 0)
  {
    prodducttable = (
      <div><center><h4><strong>There is No Product Available Yet.</strong></h4></center></div>
    )
  }
  else
  {
    prodducttable = (
      <div className="customerhistory-product-table-here">
        <table className="table table-hover table-bordered custom-shop-product-table-here table-scrollable table-responsive-sm table-responsive-md">
  <thead className="custom-table-head-color">
    <tr>
      <th scope="col">Employe Name</th>
      <th scope = "col">Total Payment</th>
      <th scope="col">Date Of Delivery</th>
    </tr>
  </thead>
  <tbody>
  {
          this.state.proddata ?
          this.state.proddata.map(function(item, id) {
            return(
                
    <tr key = {id} onClick={this.detailhandler.bind(this, item)}>
          <td scope="row">{item.employe_name || "NO DATA"}</td>
      <td>{item.total_payment || "NO DATA"}</td>
      <td>{item.date_of_delivery || "NO DATA"}</td>
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
  return (
      <div className="skin-blue fixed-layout">
      <div className="page-wrapper">

           <div className="container-fluid">
             
             <div className="row page-titles">
                 <div className="col-md-5 align-self-center">
                     {/* <h4 className="text-themecolor">Forms</h4> */}
                     <nav aria-label="breadcrumb">
                          <ol class="breadcrumb">
                              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                              <li className="breadcrumb-item active" aria-current="page">Shop History</li>
                          </ol>
                          </nav>
                 </div>
                
             </div>


          </div>

  {/*Form content begin */}
 
<div className = "product-form-upper">
  <div className = "container">
  <div className = "below-custom-form">
      <div className = "row">
         <div className = "col-lg-6 col-md-6 col-sm-12 col-xs-12">
                 <h4>Shop History</h4>
         </div>
         <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        
         <Workbook filename={this.state.cobinedata+'.xlsx'}
        //  "example.xlsx"
          element={
            <span class="tooltip-toggle-download-btn" aria-label="Download" tabindex="0">
          <button className="btn btn-info" style={{float :'right'}}><i className="fa fa-cloud-download" aria-hidden="true"></i></button>
            </span>
          }>
      <Workbook.Sheet data={this.state.proddata} name="Sheet A">
        {/* <Workbook.Column label="Shop Name" value="user_name"/>
        <Workbook.Column label="Owner's Name" value="user_owner_name"/>
        <Workbook.Column label="Contact Number" value="user_mobile"/>
        <Workbook.Column label="Owner's E-Mail" value="user_email"/>
        <Workbook.Column label="Shop Location" value="user_location"/> */}
        <Workbook.Column label="Employe Name" value="employe_name"/>
        <Workbook.Column label="Total Payment" value="total_payment"/>
        <Workbook.Column label="Date Of Delivery" value="date_of_delivery"/>
      </Workbook.Sheet>
      {/* <Workbook.Sheet data={this.state.proddata} name="Sheet B">
      <Workbook.Column label="Product Name" value="product_name"/>
        <Workbook.Column label="Product Category" value="product_type_name"/>
        <Workbook.Column label="Quantity" value="quantity"/>
        <Workbook.Column label="Employe Name" value="employe_name"/>
        <Workbook.Column label="Employe Mobile" value="employe_mobile"/>
        <Workbook.Column label="Date Of Delivery" value="date_of_delivery"/>
        </Workbook.Sheet> */}
      </Workbook>
         </div>
      </div>
      <hr />
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <p>Shop Detail Here</p>
        <hr />
      </div>
      <table className="table table-hover table-bordered table-scrollable table-responsive-sm table-responsive-md">
  <thead className="custom-table-head-color">
    <tr>
      <th scope="col">Shop Name</th>
      <th scope = "col">Shop Contact Number</th>
      <th scope = "col">E-mail</th>
      <th scope="col">Shop Location</th>
      {/* <th scope="col">Brand</th>
      <th scope="col">Model</th>
      <th scope="col">Action</th> */}
    </tr>
  </thead>
  <tbody>
  {
          this.state.userdata ?
          this.state.userdata.map(function(item, id) {
            return(
                
    <tr key = {id}>
      <th scope="row">{item.user_name || "NO DATA"}</th>
      <td>{item.user_mobile || "NO DATA"}</td>
      <td>{item.user_email || "NO DATA"}</td>
      <td>{item.user_location || "NO DATA"}</td>
    </tr>
  )
          }, this
  )
          :
          <span>Data is loading....</span>
        }
  </tbody>
</table>
      <br /><hr />
      <strong><p>Product Deails here </p></strong>
      <hr />
 {prodducttable}

  </div>
  </div>
</div>
      </div>
      </div>

  )
}
}

export default CustomerHistory
