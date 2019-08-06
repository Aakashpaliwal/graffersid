import React, { Component } from 'react'
import './Products.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../services/url';
import authService from '../../services/auth-service';
export class EditProductCategory extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
                ui_id : this.props.match.params.id,
                ui_product_type_name : "",
                ui_product_type_description : ""
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
        axios.get(`${API_URL}product_type/detail/${Editid}`,this.state,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
        .then((resp) => {
            console.log(resp.data.product_data)
            //this.setState({ data:resp.zonedata})
            this.setState({
                ui_product_type_name:resp.data.product_type_data[0].product_type_name,
                ui_product_type_description : resp.data.product_type_data[0].product_type_description
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
          axios.put(`${API_URL}product_type/update/${Editid}`,this.state,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
            //   .then(console.log(this.state));
        .then(function(json){
             if(json.data.success){
            //   console.log(json);
            alert(json.data.msg);
            this.props.history.push('/ViewProductCategory')
        }
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
                                <li className="breadcrumb-item active" aria-current="page">Edit Product</li>
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
                   <h3>Edit Product</h3>
           </div>
        </div>
        
        <form className="custom-content-form" autoComplete = 'no'>
  <div class="form-row">
    <div class="form-group col-md-12">
    <label for="inputCategory">Edit Name</label>
     <input type="text" className="form-control" placeholder="John Doe" name="ui_product_type_name" value = {this.state.ui_product_type_name} onChange={e => this.change(e)} />
    </div>
    <div class="form-group col-md-12">
    <label for="inputCategory">Edit Description</label>
     <textarea className="form-control" placeholder="John Doe" name="ui_product_type_description" value = {this.state.ui_product_type_description} onChange={e => this.change(e)}></textarea>
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

export default EditProductCategory
