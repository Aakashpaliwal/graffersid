import React, { Component } from 'react'
import './Customer.css'
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../services/url';
import authService from '../../services/auth-service';

export class EditCustomer extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
     
     
                ui_id : this.props.match.params.id,
               ui_name : "",
               ui_location: "",
               ui_mobile : "",
               ui_email: "",
               ui_owner_name :""
              
                
                
           };
     
          this.change = this.change.bind(this);
          this.onSubmit = this.onSubmit.bind(this);
    }
   
    componentWillMount ()
    {
      this.handleClick();
    }
    handleClick () {
      let Editid = this.props.match.params.id;
      //console.log(this.props.match.params.id)
      axios.get(`${API_URL}user/detail/${Editid}`, this.state,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
        .then((resp) => {
            console.log(resp.data)
            console.log(resp.data.user_data)
            //this.setState({ data:resp.zonedata})
            this.setState({
              ui_name:resp.data.user_data[0].user_name,
              ui_location:resp.data.user_data[0].user_location,
              ui_email:resp.data.user_data[0].user_email,
              ui_mobile:resp.data.user_data[0].user_mobile,
              ui_owner_name:resp.data.user_data[0].user_owner_name
            })
          
      
          
        }
      
      )
      }
  
  
  
      change  = e => {
        this.setState ({
          [e.target.name]: e.target.value
        });
      };
   
      onSubmit = (event) =>
      {
        event.preventDefault();
        console.log(this.state);
        this.setState ({
          ui_id : this.props.match.params.id
        })
        let Editid = this.props.match.params.id;
        axios.put(`${API_URL}user/update/${Editid}`,this.state,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
      .then(function(response){
           if(response.data.success===true){
          //   console.log(json);
          // alert("your data has been updated");
          alert(response.data.msg)
          this.props.history.push('/ViewCustomer') 
      }
    //   else{
    //     console.log(response);
    //     alert(response.data.msg)
    // }
  }.bind(this))
  .catch(error => {
    alert(error.response.data.msg)
    console.log(error.response);
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
                                <li className="breadcrumb-item active" aria-current="page">Edit Customer</li>
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
                   <h3>Edit Customer</h3>
           </div>
        </div>
        
        <form className="custom-content-form" autoComplete = 'no'>
  <div class="form-row">
    <div class="form-group col-md-6">
    <label for="inputCategory">Edit Name</label>
     <input type="text" className="form-control" placeholder="John Doe" name="ui_name" value = {this.state.ui_name} onChange={e => this.change(e)}/>
    </div>
    <div class="form-group col-md-6">
    <label for="inputCategory">Edit Owner Name</label>
     <input type="text" className="form-control" placeholder="John Doe" name="ui_owner_name" value = {this.state.ui_owner_name} onChange={e => this.change(e)}/>
    </div>

    <div class="form-group col-md-6">
    <label for="inputCategory">Edit Mobile</label>
     <input type="text" className="form-control" placeholder="John Doe" name="ui_mobile" value = {this.state.ui_mobile} onChange={e => this.change(e)}/>
    </div>

    <div class="form-group col-md-6">
    <label for="inputCategory">Edit Email</label>
     <input type="text" className="form-control" placeholder="John Doe" name="ui_email" value = {this.state.ui_email} onChange={e => this.change(e)}/>
    </div>

    <div class="form-group col-md-12">
    <label for="inputCategory">Edit Location</label>
     <input type="text" className="form-control" placeholder="John Doe" name="ui_location" value = {this.state.ui_location} onChange={e => this.change(e)}/>
    </div>
  </div>
  
  <button class="btn btn-primary" onClick = {this.onSubmit.bind(this)}>Submit</button>
  </form>
    </div>
    </div>
  </div>
        </div>
        </div>
  
    )
  }
  }

export default withRouter(EditCustomer)
