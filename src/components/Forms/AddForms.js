import React, { Component } from 'react';
import './Form.css';
import {Link} from 'react-router-dom';

class AddForms extends Component {
    constructor(props)
    {
        super (props);
        this.state = {
            user_email : "",
            user_password : ""
        };

    }
    change = e => {
        this.setState ({
            [e.target.name] : e.target.value
        })
    }
    getWebsite = () => {
        fetch("/")
    };
    onSubmit = e =>
    {
        e.preventDefault();
        this.state.name = this.state.user_email+" "+this.state.user_password;
        console.log(this.state.name);
        if (
              this.state.user_email === "" ||
              this.state.user_password === "" 
             
           ) {
              alert("Unable to contact because fields were left blank");
              }else {
                  fetch(`/contact`,{
                      method : "POST",
                      headers : {
                          "Content-Type": "application/json; charset=utf-8"
                      },
                      body: JSON.stringify(this.state)
                  }
                  ).then(this.getWebsite);
                }
       
       
        this.setState ({
                 user_email : "",
                 user_password : ""

        })
    };

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
                                 <li className="breadcrumb-item active" aria-current="page">Add Form</li>
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
            <div className = "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h3>Add New User</h3>
            </div>
         </div>
         <form className="custom-content-form-user" onSubmit={this.handleSubmit}>
   <div class="form-row">
     <div class="form-group col-md-12">
     <label for="inputCategory">Enter User Email</label>
      <input type="text" className="form-control" placeholder="John Doe" name="user_email" value={this.state.user_email} onChange = {e=>this.change(e)}/>
     </div>
     <div class="form-group col-md-12">
     <label for="inputSubcategory">Enter User Password</label>
      <input type="password" className = "form-control" placeholder="12345" name="user_password" value={this.state.user_password} onChange = {e=>this.change(e)}/>
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

export default AddForms;