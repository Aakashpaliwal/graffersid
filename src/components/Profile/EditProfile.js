import React, { Component } from 'react'
import './Profile.css'
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../services/url';
import authService from '../../services/auth-service';
import axiosService from '../../services/axios-service';
export class EditProfile extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
                id : this.props.match.params.id,
                ui_name: "",
                ui_detail : "",
                ui_email:"",
                ui_mobile:"",
                ui_user_name:""
              
                
                
           };
     
          this.change = this.change.bind(this);
        
    }
    componentWillMount ()
    {
      this.handleClick();
    }
    handleClick () {
      let Editid = this.props.match.params.id;
      //console.log(this.props.match.params.id)
      axios.get(`${API_URL}profile/detail`,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
        .then((resp) => {
          console.log(resp)
          console.log(resp.data.company_data);
          const data = resp.data.company_data;
          this.setState({ 
            ui_name:resp.data.company_data[0].company_name,
            ui_detail:resp.data.company_data[0].company_detail,
            ui_user_name:resp.data.company_data[0].company_user_name,
            ui_mobile:resp.data.company_data[0].company_mobile,
            ui_email:resp.data.company_data[0].company_email
          })
          }) 
          .catch(error => {
          console.log(error);
          })
      }
  
  
  
      change  = e => {
        this.setState ({
          [e.target.name]: e.target.value
        });
      };
   
      onSubmit = e =>
      {
          e.preventDefault();
          console.log(this.state);
    axios.put(`${API_URL}profile/update`,this.state,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
    .then((resp) => {
      console.log(resp.data)
     if(resp.data.success === true)
     {
       alert(resp.data.msg)
       this.props.history.push('/ViewProfile')
     }
     else {
       alert(resp.data.msg)
     }
      } )
      .catch(error => {
      console.log(error.response);
      })

    //       fetch(`profile/update`,{
    //         method : "PUT",
    //         // mode: 'no-cors',
    //         headers : {
    //        
    //         "Content-Type" : "application/json"
    //         },
    //         body: JSON.stringify(this.state)
    //       })
    //         //   .then(console.log(this.state));
    //     .then(function(response){ 
    //         return response.json();})
    //     .then(function(json){
    //          if(json.success===true){
    //         //   console.log(json);
    //         alert("your data has been updated");
    //         this.props.history.push('/ViewProfile')
    //     }
    //     else{
    //       console.log(json);
    //       alert(json.msg)
    //   }
    // }.bind(this))
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
                                <li className="breadcrumb-item active" aria-current="page">Edit Profile</li>
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
                   <h3>Edit Profile</h3>
           </div>
        </div>
        
        <form className="custom-content-form" autoComplete = 'no'>
  <div class="form-row">
    <div class="form-group col-md-6">
    <label for="inputCategory">Edit Name</label>
     <input type="text" className="form-control" placeholder="John Doe" name="ui_name" value = {this.state.ui_name} onChange={e => this.change(e)} />
    </div>
    <div class="form-group col-md-6">
    <label for="inputCategory">Edit User Name</label>
     <input type="text" className="form-control" placeholder="John Doe" name="ui_user_name" value = {this.state.ui_user_name} onChange={e => this.change(e)} />
    </div>

    <div class="form-group col-md-6">
    <label for="inputCategory">Edit Mobile</label>
     <input type="text" className="form-control" placeholder="John Doe" name="ui_mobile" value = {this.state.ui_mobile} onChange={e => this.change(e)} />
    </div>
    <div class="form-group col-md-6">
    <label for="inputCategory">Edit Email</label>
     <input type="text" className="form-control" placeholder="John Doe" name="ui_email" value = {this.state.ui_email} onChange={e => this.change(e)}/>
    </div>

    <div class="form-group col-md-12">
    <label for="inputCategory">Edit Detail</label>
    <textarea className="form-control" name="ui_detail" value={this.state.ui_detail} onChange = {e => this.change(e)}></textarea>
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

export default withRouter(EditProfile)
