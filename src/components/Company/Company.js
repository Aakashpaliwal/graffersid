import React, { Component } from 'react'
import './Company.css'
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../services/url';
export class Company extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
           ui_company_name : "",
          ui_company_owner : "",
          ui_company_mobile : "",
          ui_company_email : "",
          ui_company_location : ""
           };

    }
    componentWillMount ()
    {
      this.handleClick();
    }
    handleClick () {
      fetch('product_type/view',{
        method : 'GET',
        headers : {
          "Content-Type" : "application/json"
      }
      })
        .then((res) => {
          res.json().then((resp) => { 
            console.log(resp.product_type_data)
            this.setState({ userdata:resp.product_type_data})
            // this.parseJSON(this.state)
          })
        }
      
      )
      }
    
    
      change  = e => {
        this.setState ({
          [e.target.name]: e.target.value
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
          axios.post(`${API_URL}product/add`, this.state)
          //   .then(console.log(this.state));
        .then(function(response){ 
           console.log(response.data);
           if(response.data.success === true)
           {
             alert('product added successfully')
              this.setState ({
                ui_company_name : "",
                ui_company_owner : "",
                ui_company_mobile : "",
                ui_company_email : "",
                ui_company_location : ""
          })
          this.props.history.push('/ViewCompany')
           }
        }.bind(this))
        .catch(error => {
          alert(error.response.data.msg)
          })

    //       fetch('product/add',{

    //         method : "POST",
    //         headers : {
		// 		'Authorization': 'Bearer' + this.state.token,
    //           "Content-Type" : "application/json; charset=utf-8"
    //         },
    //         body: JSON.stringify(this.state)
    //       }) .then(function(response){ 
    //         return response.json();})
    //     .then(function(json){
    //          if(json.success===true){
    //         //   console.log(json);
    //         alert("your data has been submitted");
    //         this.props.history.push('/ViewProducts')
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
                                <li className="breadcrumb-item active" aria-current="page">Master Company</li>
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
                   <h3>Company</h3><br />
           </div>
        </div>
        
        <form className="custom-content-form" autoComplete = "OFF">
  <div class="form-row">
    <div class="form-group col-md-6">
    <label for="inputCategory">Enter Company Name</label>
     <input type="text" className="form-control" placeholder="" name="ui_company_name" value = {this.state.ui_company_name} onChange = {e => this.change(e)} />
    </div>

    <div class="form-group col-md-6">
    <label for="inputSubcategory">Enter Owner Name</label><br />              
    <input type="text" className="form-control" placeholder="" name="ui_company_owner" value = {this.state.ui_company_owner} onChange = {e => this.change(e)} />
    </div>
    <div class="form-group col-md-6">
    <label for="inputSubcategory">Enter Mobile Number</label><br />              
     <input type="number" className="form-control" placeholder="number" value = {this.state.ui_company_mobile} name = "ui_company_mobile" onChange = {e => this.change(e)} />
    </div>
    <div class="form-group col-md-6">
    <label for="inputSubcategory">Enter E - Mail</label><br />              
     <input type="email" className="form-control" name="ui_company_email" value = {this.state.ui_company_email} onChange={e => this.change(e)} />
    </div>
    <div class="form-group col-md-12">
    <label for="inputSubcategory">Enter Location</label><br />              
    <textarea className="form-control" value = {this.state.ui_company_location} name = "ui_company_location" onChange = {e=>this.change(e)}></textarea> 
    </div>
  </div>
 
  <button class="btn btn-primary" onClick = {e => this.onSubmit(e)}>Submit</button>
</form>
    </div>
    </div>
</div>






        </div>
        </div>

    )
  }
}

export default Company
