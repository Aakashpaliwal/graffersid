import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import './Employe.css'
import axios from 'axios'
import { API_URL } from '../../services/url';
import authService from '../../services/auth-service';
import axiosService from '../../services/axios-service';
export class BackAlloc extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
         proddata : [],
        ui_employe_id :this.props.match.params.id,
        ui_quantity_return : "",
        custom_data :"",
        ui_product_id: "",
        ui_return_product_array: [{ 
          ui_product_id:"",
          ui_quantity_return : "",
         }],
         
           };
          //  this.allocdone = this.allocdone.bind(this);
    }
   
    componentWillMount ()
    {
      this.handleClick();
    }
    handleClick () {
      this.state.employe_name = localStorage.getItem('employe_name')
      console.log('state employe name')
      console.log(this.state.employe_name)
      let sitemeet = this.state.ui_employe_id
      axios.get(`${API_URL}employe_inventory/view/` + sitemeet,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
      .then(response => {
          console.log(response)
              console.log(response.data.employe_inventory_data);
              const data = response.data.employe_inventory_data;
              this.setState({ proddata : data })
              }) 
              .catch(error => {
              console.log(error);
              })
      }
    
      changenow  = e => {
        this.setState ({
          [e.target.name]: e.target.value
        });
      };
      change  = (idx) => (e) => {
        const newShareholders = this.state. ui_return_product_array.map((shareholder, sidx) => {
          if (idx !== sidx) return shareholder;
          return { ...shareholder, [e.target.name]: e.target.value };
        
        // this.setState ({
        //   [e.target.name]: e.target.value
        // });
        })
        this.setState({  ui_return_product_array: newShareholders });
        // localStorage.setItem('product_name',newShareholders[0].product_name)
        // console.log(newShareholders[0].ui_product_id)
      };
      handleAddShareholder = () => {
        this.setState({
            ui_return_product_array: this.state.ui_return_product_array.concat([{
            ui_product_id:"",
            ui_quantity_return : "",
          // ui_packaging_id : ""
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
          console.log(this.state.ui_return_product_array[0].ui_employe_id)
        
          axios.post(`${API_URL}return_product/add`,this.state,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
          //   .then(console.log(this.state));
        .then(function(response){ 
           console.log(response.data);
           if(response.data.success === true)
           {
             alert('Back Allocation Done Successfully')
            localStorage.removeItem('employe_name')
          this.props.history.push('/ViewBackAlloc')
           }
           else
           {
             alert(response.data.msg)
           }
        }.bind(this))
        .catch(error => {
          alert(error.response.data.msg)
            console.log(error.response);
          })
      };
      
      fileSelectedHandler = e => {     
          e.preventDefault();
        let files = e.target.files;
        console.log('data',files[0]);
      }
      optionclick(item)
      {
        console.log('hi')
        console.log(item.product_id);
      }
      // allocdone (item) {
      //   console.log('new allocation');
      //   this.state.ui_return_product_array[0].ui_product_id = item.product_id
      //   if(this.state.custom_data.length > 0)
      //   {
      //   this.state.ui_return_product_array[0].ui_quantity_return = this.state.custom_data
      //   }
      //   else
      //   {
      //     this.state.ui_return_product_array[0].ui_quantity_return = 0
      //   }
      //   console.log('state product id')
      //   console.log(this.state.ui_product_id);
      //   console.log(this.state.ui_quantity_return)
      //   console.log(this.state)
      //   this.setState ({
      //     ui_return_product_array: [{ 
      //       ui_product_id:"",
      //       ui_quantity_return : "",
      //      }],
      //   })
      //   axios.post(`${API_URL}return_product/add`,this.state,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
      //   //   .then(console.log(this.state));
      // .then(function(response){ 
      //   console.log(this.state)
      //    console.log(response.data.data);
      //   //  if(response.data.success)
      //   //  {
      //   //    alert('Backlog added successfully')
      //   //    this.setState ({
      //   //       ui_product_id:"",
      //   //       ui_quantity_return : "",
      //   //   })
      //   //   localStorage.removeItem('employe_name')
      //   // this.props.history.push('/ViewEmpAlloc')
      //   //  }
      //   //  else
      //   //  {
      //   //    console.log('resposen msg');
      //   //    alert(response.data.msg)
      //   //  }
      // }.bind(this))
      // .catch(error => {
      //     console.log(error.response);
      //   })
      // }
  render() {
    let prodtabledata;
    if(this.state.proddata == 0)
    {
      prodtabledata = (
        <div>
          Choose The Product and Enter Quantity.
        </div>
      )
    }
    else
    {
      prodtabledata = (
        <div>
        {
          this.state.proddata ?
          this.state.proddata.map(function(item, id) {
            return(
                <span key={id}>Product Quantity of {item.product_name} is = {item.emp_pro_quantity}</span>
               )
          }, this
  )
          :
          <span>Data is loading....</span>
        }
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
                                <li className="breadcrumb-item active" aria-current="page">Master Employe</li>
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
           <div className = "col-lg-6 col-md-6 col-sm-12 col-xs-12">
                   <h5>Employe Product Back Allocation</h5>
           </div>
           <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
           <Link to="/ViewEmploye"> <button type="button" className="btn btn-info add-employe-btn"><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;View Employee</button></Link>
           </div>
        </div>
        <br />
        <div className="row">
        <table className="table table-hover table-bordered ">
  <thead className="custom-table-head-color">
    <tr>
      <th scope="col">Employer's Name</th>
    </tr>
  </thead>
  <tbody> 
                
    <tr>
      <th scope="row">{this.state.employe_name}</th>
    </tr>
  
  </tbody>
</table>
        </div>
        <hr />
       <p>List Of Product Has Been Allocated To Employer</p>
       <hr />
          
            {this.state.ui_return_product_array.map((shareholder, idx) => (
        <form className="custom-content-form">
  <div class="form-row">
  <input type="hidden" className="form-control" name="ui_employe_id" value = {this.state.ui_employe_id}/>
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
     <div class="form-group col-md-12">
    <label for="inputSubcategory">Enter Quantity</label><br />              
    <input type="text" className="form-control" name="ui_quantity_return" value={shareholder.ui_quantity_return} onChange = {this.change(idx)}/>
        {/* <small>{prodtabledata}</small> */}
    </div>
  </div>
 <hr />
  {/* <button class="btn btn-primary" onClick = {e => this.onSubmit(e)}>Submit</button>
  <button type="button" onClick={this.handleAddShareholder} className="btn-info custom-more-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Add More Equipments</button> */}
</form>

))}
<button class="btn btn-primary" onClick = {e => this.onSubmit(e)}>Submit</button>
  <button type="button" onClick={this.handleAddShareholder} className="btn-info custom-more-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Add More Products</button>
<hr />
    </div>
    </div>
</div>






        </div>
        </div>

    )
  }
}

export default BackAlloc
