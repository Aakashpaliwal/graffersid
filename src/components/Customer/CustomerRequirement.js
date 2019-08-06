import React, { Component } from 'react'
import './Customer.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../services/url';
import authService from '../../services/auth-service';
import axiosService from '../../services/axios-service';
export class CustomerRequirement extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
         proddata : [],
        ui_user_id : this.props.match.params.id,
        ui_user_order_array: [{ 
          ui_product_id:"",
          ui_quantity_required : "",
         }],
         
           };

    }
   
    componentWillMount ()
    {
      this.handleClick();
    }
    handleClick () {
      axios.get(`${API_URL}product/view`,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
      .then(response => {
          console.log(response)
              console.log(response.data.product_data);
              const data = response.data.product_data;
              this.setState({ proddata : data })
              }) 
              .catch(error => {
              console.log(error.response);
              })
      }
      change  = (idx) => (e) => {
        const newShareholders = this.state. ui_user_order_array.map((shareholder, sidx) => {
          if (idx !== sidx) return shareholder;
          return { ...shareholder, [e.target.name]: e.target.value };
        // this.setState ({
        //   [e.target.name]: e.target.value
        // });
        })
        this.setState({  ui_user_order_array: newShareholders }); 
      };
      handleAddShareholder = () => {
        this.setState({
            ui_user_order_array: this.state.ui_user_order_array.concat([{
          ui_product_id:"",
          ui_quantity_required : "",
            }])
        });
      }
      getWebsite = () =>
      {
          fetch('/');
      }
      onSubmit = e =>
      {
          e.preventDefault();
          console.log(this.state);
          console.log(this.state.ui_user_id)
          this.setState ({
            ui_user_order_array: [{ 
              ui_product_id:"",
              ui_quantity_required : "",
             }],
          })
          axios.post(`${API_URL}user_order/add2`, this.state,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
          //   .then(console.log(this.state));
        .then(function(response){ 
           console.log(response.data);
           if(response.data.success)
           {
             alert('Requirement added successfully')
          this.props.history.push('/ViewRequirement')
           }
        }.bind(this))
        .catch(error => {
          if(error.response.status == 500)
          {
            alert('something went wrong. Please Try Again')
          }
          else
          { 
            alert(error.response.data.msg)
          }
          // console.log(error.response.status)
          
            console.log(error.response);
          })
    //       fetch(`/user_order/add2`,{

    //         method : "POST",
    //         headers : {
		
    //           "Content-Type" : "application/json; charset=utf-8"
    //         },
    //         body: JSON.stringify(this.state)
    //       }) .then(function(response){ 
    //         return response.json();})
    //     .then(function(json){
    //          if(json.success===true){
    //         //   console.log(json);
    //         alert("your data has been submitted");
    //         this.props.history.push('/ViewRequirement')
    //     }
    //     else{
    //       console.log(json);
    //   }
    // }.bind(this))
      };
      
      fileSelectedHandler = e => {     
          e.preventDefault();
        let files = e.target.files;
        console.log('data',files[0]);
      }
  render() {
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
                                <li className="breadcrumb-item active" aria-current="page">Master Shop</li>
                            </ol>
                            </nav>
                   </div>
                  
               </div>


            </div>

    {/*Form content begin */}
   
<div className = "product-form-upper">
    <div className = "container">
    <div className = "below-custom-form below-custom-blog-form">
        <div className = "row">
           <div className = "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                   <h3>Customer Requirement</h3><br />
           </div>
        </div>
        {this.state.ui_user_order_array.map((shareholder, idx) => (
        <form className="custom-content-form">
  <div class="form-row">
  <input type="hidden" className="form-control" name="ui_user_id" value = {this.state.ui_user_id}/>
    <div class="form-group col-md-12">
    <label for="inputCategory">Enter Product Name</label>
    <select className="form-control" value = {shareholder.ui_product_id} name="ui_product_id" onChange = {this.change(idx)}>
      <option value="choose..">Choose....</option>
   {
          this.state.proddata ?
          this.state.proddata.map(function(item, id) {
            return(
              <option value={item.product_id} key = {id}>{item.product_name}</option>
            )
          }, this
  )
          :
          <span>Data is loading....</span>
        }
   </select>
    </div>
    {/* <div class="form-group col-md-6">
    <label for="inputSubcategory">Enter Date</label><br />              
    <input type="text" className="form-control" name="ui_date_of_given_time" value={this.state.ui_date_of_given_time} onChange = {e => this.change(e)} placeholder="YYYY-MM-DD" required pattern="([0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01]))" title="Enter a date in this format YYYY/MM/DD"/>
    </div> */}
    {/* <div class="form-group col-md-6">
    <label for="inputSubcategory">Enter Amount of Payment Received</label><br />              
    <select className="form-control" value={this.state.ui_payment_received} name="ui_payment_received" onChange = {e=>this.change(e)}>
        <option value="choose...">Choose...</option>
        <option value = "YES">YES</option>
        <option value = "NO">NO</option>
    </select>
    </div> */}

     <div class="form-group col-md-12">
    <label for="inputSubcategory">Enter Quantity</label><br />              
    <input type="text" className="form-control" name="ui_quantity_required" value={shareholder.ui_quantity_required} onChange = {this.change(idx)}/>
    </div>
    {/* <div class="form-group col-md-6">
    <label for="inputSubcategory">Enter Total Payment Amount</label><br />              
    <input type="number" className="form-control" name="ui_total_payment" value={shareholder.ui_total_payment} onChange = {this.change(idx)} />
    </div> */}
  </div>
 <hr />
  {/* <button class="btn btn-primary" onClick = {e => this.onSubmit(e)}>Submit</button>
  <button type="button" onClick={this.handleAddShareholder} className="btn-info custom-more-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Add More Equipments</button> */}
</form>

))}
<button class="btn btn-primary" onClick = {e => this.onSubmit(e)}>Submit</button>
  <button type="button" onClick={this.handleAddShareholder} className="btn-info custom-more-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Add More Requirement</button>
<hr />
    </div>
    </div>
</div>






        </div>
        </div>

    )
  }
}

export default CustomerRequirement
