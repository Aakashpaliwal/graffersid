import React, { Component } from 'react'
import './ProductTrans.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../services/url';
import authService from '../../services/auth-service';
import axiosService from '../../services/axios-service';
export class ProductTrans extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            ui_unit_cost : "",
            ui_quantity : "",
            ui_piece_quantity :"",
            ui_product_id :"",
            ui_piece_price : "",
            proddata : [],  
           userdata : [],
           totalcosttext : false,
           total_cost : "",
           edittotalcosttext : false,
           edit_total_cost :""
          //  multiplebundlemaounttext : ""
         
           };
          //  this.totalcostbtn = this.totalcostbtn.bind(this)
          this.editstate = this.editstate.bind(this)
    }
    componentWillMount ()
    {
      this.handleClick();
    }
    handleClick () {
      axios.get(`${API_URL}product_type/view/0/100`,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
      .then(response => {
        console.log(response)
            console.log(response.data.product_type_data);
            const data = response.data.product_type_data;
            this.setState({ userdata : data })
            }) 
            .catch(error => {
            console.log(error);
            })
      }
      siteclick = e =>  
      {
        e.preventDefault();
        // console.log('hi');
        // console.log('hi');
        console.log(this.state.product_type_id);
        // console.log(this.state.value);
        const sitemeet = this.state.product_type_id;
        axios.get(`${API_URL}product/prod_on_type/${sitemeet}`,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
        .then(response => {
          //console.log(response)
              console.log(response.data.product_data);
              const data = response.data.product_data;
              this.setState({ proddata : data })
              }) 
              .catch(error => {
              console.log(error);
              })
  
      }
    
      change  = e => {
        this.setState ({
          
          [e.target.name]: e.target.value,
          totalcosttext : true,
        });
    
      };
      // costchange = e => {
      //   this.setState({
      //     totalcosttext : true,
      //   total_cost : this.state.ui_piece_quantity * this.state.ui_piece_price
      // })
      // }
     
      getWebsite = () =>
      {
          fetch('/');
      }
      onSubmit = e =>
      {
          e.preventDefault();
          console.log(this.state);
          console.log(this.state.singlebundleamounttext)
          axios.post(`${API_URL}product_in/add`, this.state,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
          //   .then(console.log(this.state));
        .then(function(response){ 
           console.log(response);
           if(response.data.success)
           {
             alert('Product Has Been Addedd To Godown')
          this.props.history.push('/ViewProductTrans')
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

      editstate = () => {
          this.setState({
            edittotalcosttext : true
            // totalcosttext  :false
          })
      }
      
      fileSelectedHandler = e => {     
          e.preventDefault();
        let files = e.target.files;
        console.log('data',files[0]);
      }
      // totalcostbtn = (event) => {
      //     event.preventDefault();
      //     this.setState({
      //         totalcosttext : true
      //     })
      // }

  render() {
    let editcosttext;
      let singlebundleamount = <strong>Please Enter Numeber Of Pieces And Cost Per Unit </strong>
      let multiplebundlemaount =  <strong>Please Enter Numeber Of Pieces And Quantity And Cost Per Unit </strong>
      if(this.state.totalcosttext === true)
      {
        // this.state.total_cost = this.state.ui_piece_quantity * this.state.ui_piece_price;
        singlebundleamount = this.state.ui_piece_quantity * this.state.ui_piece_price;
        multiplebundlemaount = this.state.ui_piece_quantity * this.state.ui_piece_price * this.state.ui_quantity;
        this.state.total_cost = singlebundleamount
      }
     
      this.state.total_cost  =singlebundleamount
      // this.state.ui_unit_cost = singlebundleamount
      // this.state.multiplebundlemaounttext = multiplebundlemaount
      
    
     
      
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
                                <li className="breadcrumb-item active" aria-current="page">Master Product</li>
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
                   <h3>Product</h3><br />
           </div>
        </div>
        
        <form className="custom-content-form" autoComplete = "OFF">
  <div class="form-row">
    {/* <div class="form-group col-md-6">
    <label for="inputCategory">Enter Product Name</label>
     <input type="text" className="form-control" placeholder="" name="ui_product_name" value = {this.state.ui_product_name} onChange = {e => this.change(e)} />
    </div> */}

    <div class="form-group col-md-6">
    <label for="inputSubcategory">Add Product Category</label><br />              
    <select className="form-control" name = "product_type_id" value={this.state.product_type_id} onClick={e => this.siteclick(e)} onChange={(e) => this.setState({product_type_id: e.target.value})}>
      <option value="No Choice">Choose....</option>
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
    <div class="form-group col-md-6">
    <label for="inputSubcategory">Add Product Name</label><br />              
    <select className="form-control" name = " ui_product_id" value={this.state. ui_product_id} onChange={(e) => this.setState({ ui_product_id: e.target.value})}>
      <option value="No Choice">Choose....</option>
    {
          this.state.proddata ?
          this.state.proddata.map(function(item, id) {
            return(
        <option value={item.product_id}>{item.product_name}</option>
      )
          }, this
  )
          :
          <span>Data is loading....</span>
        }
    </select>
    </div>
    <div class="form-group col-md-6">
    <label for="inputSubcategory">Add Number Of Pieces in a Box</label><br />              
    <input type="text" className="form-control" value = {this.state.ui_piece_quantity} name = "ui_piece_quantity" onChange = {e=> this.change(e)} />
    </div>
    <div class="form-group col-md-6">
    <label for="inputSubcategory">Add Price Per Piece</label><br />              
    <input type="text" className="form-control" name="ui_piece_price" value={this.state.ui_piece_price} onChange = {e => this.change(e)} />
    </div>
    <div class="form-group col-md-12">
    <label for="inputSubcategory">Number Boxes </label><br />              
     <input type="text" className="form-control" name="ui_quantity" value={this.state.ui_quantity} onChange = {e => this.change(e)} />
    </div>
  </div>
    {editcosttext}
  <p>Total Single Bundle Amount is = <strong>{singlebundleamount}</strong></p>
  <p>Total Multiple Bundle Amount is = <strong>{multiplebundlemaount}</strong></p>
  {/* <button class="btn btn-primary customcost-btn" onClick = {this.totalcostbtn.bind(this)}>Show Total Cost</button> */}
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

export default ProductTrans
