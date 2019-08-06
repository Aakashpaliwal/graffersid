import React, { Component } from 'react'
import './Products.css'
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../services/url';
import authService from '../../services/auth-service';
import axiosService from '../../services/axios-service';
export class EditProduct extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
                ui_id : this.props.match.params.id,
               ui_product_name: "",
               ui_product_description: "",
               ui_product_type_id: "",
               ui_product_type_name : "",
               userdata : []
              
                
                
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
      axios.get(`${API_URL}product/detail/${Editid}`,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
        .then((resp) => {
          console.log(resp)
          console.log(resp.data.product_data);
          const data = resp.data.product_data;
          this.setState({ 
            ui_product_name:resp.data.product_data[0].product_name,
            ui_product_description:resp.data.product_data[0].product_description,
            ui_product_type_id:resp.data.product_data[0].product_type_id,
            ui_product_type_name : resp.data.product_data[0].product_type_name
          })
          }) 
          .catch(error => {
          console.log(error);
          })
      axios.get(`/${API_URL}product_type/view`)
      .then(response => {
                console.log(response.data.product_type_data);
                const data = response.data.product_type_data;
                this.setState({ userdata : data })
              }) .catch(error => {
                console.log(error);
              })
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
          axios.put(`${API_URL}product/update/${Editid}`,this.state,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
          .then((resp) => {
            console.log(resp.data)
           if(resp.data.success === true)
           {
             alert(resp.data.msg)
             this.props.history.push('/ViewProducts')
           }
           else {
             alert(resp.data.msg)
           }
            })
            .catch(error => {
              // console.log(error.response.data.msg)
              alert(error.response.data.msg)
            // console.log(error.response.data.msg);
            })
    //       fetch(`/product/update/${Editid}`,{
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
    //         this.props.history.push('/ViewProducts')
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
    <div class="form-group col-md-6">
    <label for="inputCategory">Edit Name</label>
     <input type="text" className="form-control" placeholder="John Doe" name="ui_product_name" value = {this.state.ui_product_name} onChange={e => this.change(e)} />
    </div>
    <div class="form-group col-md-6">
    <label for="inputCategory">Edit Category</label>
     {/* <input type="text" className="form-control" placeholder="John Doe" name="ui_product_type_id" value = {this.state.ui_product_type_id} onChange={e => this.change(e)} /> */}
     <select className="form-control" value = {this.state.ui_product_type_id} name = "ui_product_type_id" onChange = {(e) => this.setState({ui_product_type_id: e.target.value})}>
        <option value={this.state.ui_product_type_id}>{this.state.ui_product_type_name}</option>
        {
          this.state.userdata ?
          this.state.userdata.map(function(item, id) {
            return(
                <option value={item.product_type_id}>{item.product_type_name}</option>

                 )
          }, this
  )
          :
          <span>Data is loading....</span>
        }


        </select>
    </div>

    <div class="form-group col-md-12">
    <label for="inputCategory">Edit Description</label>
     <textarea className="form-control" name="ui_product_description" value = {this.state.ui_product_description} onChange = {e => this.change(e)}></textarea>
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
export default withRouter(EditProduct)
