import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import './Employe.css'
import axios from 'axios'
import { API_URL } from '../../services/url';
import authService from '../../services/auth-service';
import axiosService from '../../services/axios-service';
export class EmpAlloc extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
         proddata : [],
         edittotalcosttext : false,
         totalcosttext : false,
         ui_custom_rate : "",
         employe_name : "",
         employe_id : "",
        ui_employe_id :this.props.match.params.id,
        ui_product_employe_array: [{ 
          ui_shop_id:"",
          // ui_quantity_given : ""
          // ui_packaging_id : ""
         }],
         
           };
          //  this.editstate = this.editstate.bind(this)
          //  this.changeinput = this.changeinput.bind(this)

    }
   
    componentWillMount ()
    {
      this.handleClick();
     
    }
    handleClick () {
      this.state.employe_name = localStorage.getItem('employe_name')
      this.state.employe_id = localStorage.getItem('employe_id')
      console.log('state employe name')
      console.log(this.state.employe_name)
      axios.get(`${API_URL}user/view/0/1000`,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
      .then(response => {
                console.log('Shop / Customer view')
                console.log(response)
                console.log(response.data.user_data);
                const data = response.data.user_data;
                if(response.data.success)
                {
                this.setState({ proddata : data })
                }
              }) .catch(error => {
                console.log(error.response);
              })
      }
    
      // change  = e => {
      //   this.setState ({
      //     [e.target.name]: e.target.value
      //   });
      // };
      // changeinput = (e) => {
      //   this.setState({
         
      //     ui_custom_rate : e.target.value
          
      //   })
      // }
      change  = (idx) => (e) => {
        const newShareholders = this.state.ui_product_employe_array.map((shareholder, sidx) => {
          if (idx !== sidx) return shareholder;
          return { ...shareholder, [e.target.name]: e.target.value };
        // this.setState ({
        //   [e.target.name]: e.target.value
        // });
        })
        this.setState({ 
           ui_product_employe_array: newShareholders, 
          //  totalcosttext : true
          });
      };
      handleAddShareholder = () => {
        this.setState({
          ui_product_employe_array: this.state.ui_product_employe_array.concat([{
            ui_shop_id:""
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
          let body = {
           employe_id : this.state.employe_id,
           ui_product_employe_array : this.state.ui_product_employe_array
            }
            console.log('body variable here', body)
          // console.log(this.state.ui_product_employe_array[0].ui_employe_id)
          // this.setState ({
          //   ui_product_employe_array: [{ 
          //     ui_product_id:"",
          // ui_quantity_given : "",
          // // ui_packaging_id : ""
          //    }],
          // })
          axios.post(`${API_URL}product_employe/add`,body,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
          //   .then(console.log(this.state));
        .then(function(response){ 
          console.log(this.state)
           console.log(response);
           if(response.data.success)
           {
             alert('Product Has Been Allocated To Employer Successfully')
            localStorage.removeItem('employe_name')
            localStorage.removeItem('employe_id')
          this.props.history.push('/ViewEmpAlloc')
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
    //   editstate = () => {
    //     this.setState({
    //       edittotalcosttext : true
    //       // totalcosttext  :false
    //     })
    // }
    
  render() {
    // let editcosttext;
    //   let singlebundleamount = <strong>Please Enter Numeber Of Pieces And Cost Per Unit </strong>
     
    //   if(this.state.totalcosttext === true)
    //   {
    //     // this.state.total_cost = this.state.ui_piece_quantity * this.state.ui_piece_price;
    //     singlebundleamount = this.state.ui_product_employe_array[0].ui_quantity_given * this.state.ui_product_employe_array[0].ui_rate;
    //     this.state.ui_product_employe_array[0].ui_total_rate = singlebundleamount
    //   }
     
      // this.state.total_cost  =singlebundleamount
      // this.state.ui_unit_cost = singlebundleamount
      // this.state.multiplebundlemaounttext = multiplebundlemaount
       
     
    //   if(this.state.edittotalcosttext === true)
    //   {
        
        
    //     editcosttext = (
    //       this.state.ui_product_employe_array[0].ui_total_rate  = this.state.ui_custom_rate,
         
    //       <div class="form-group col-md-12">
    //       <label for="inputSubcategory">Total Price</label><br />              
    //       {/* <input type="text" className="form-control" name="edit_total_cost" value={this.state.edit_total_cost} onChange = {e => this.change(e)}/> */}
    //       <input type="text" className="form-control" name="ui_custom_rate" value={this.state.ui_custom_rate} onChange = {this.changeinput.bind(this)}/>
    //       <small>Total Cost = <strong>{singlebundleamount}</strong>. Please Enter The Total Cost either Showing Below or Whatever You Want To.</small>
          
    //       </div>
    
    //     )
    //   }
    //   else {
    //     editcosttext = (
    //      <div className="row">
    //      <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
    //      <p>Total Rate is = <strong>{singlebundleamount}</strong></p>
    //      </div>
 
    //      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
    //      <button className="btn btn-outline-secondary custom-edit-btn-price" type="button" onClick={e => this.editstate(e)}>Edit</button>
    //      </div>
    //  </div>
    //     ) 
    //  }
     
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
           <div className = "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                   <h3>Employe Product Allocation</h3><br />
           </div>
        </div>
        <div className="row">
        <table className="table table-hover table-bordered ">
  <thead className="custom-table-head-color">
    <tr>
      <th scope="col">You Are Allocating The Product To Employe</th>
    </tr>
  </thead>
  <tbody> 
                
    <tr>
      <th scope="row">{this.state.employe_name}  {this.state.employe_id}</th>
    </tr>
  
  </tbody>
</table>
        </div>
        <hr className="custom-hr-empalloc"/>
        {this.state.ui_product_employe_array.map((shareholder, idx) => (
        <form className="custom-content-form">
  <div class="form-row">
  <input type="hidden" className="form-control" name="ui_employe_id" value = {this.state.ui_employe_id}/>
    <div class="form-group col-md-12">
    <label for="inputCategory">Enter Shop Name</label>
    <select className="form-control" value = {shareholder.ui_shop_id} name="ui_shop_id" onChange = {this.change(idx)}>
      <option value="choose..">Choose....</option>
   {
          this.state.proddata ?
          this.state.proddata.map(function(item, id) {
            return(
              <option value={item.user_id} key = {id}>{item.user_name}</option>
            )
          }, this
  )
          :
          <span>Data is loading....</span>
        }
   </select>
    </div>
     {/* <div class="form-group col-md-12">
    <label for="inputSubcategory">Enter Quantity</label><br />              
    <input type="text" className="form-control" name="ui_quantity_given" value={shareholder.ui_quantity_given} onChange = {this.change(idx)}/>
    </div> */}
  </div>
 <hr />
  {/* <button class="btn btn-primary" onClick = {e => this.onSubmit(e)}>Submit</button>
  <button type="button" onClick={this.handleAddShareholder} className="btn-info custom-more-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Add More Equipments</button> */}
</form>

))}
<button class="btn btn-primary" onClick = {e => this.onSubmit(e)}>Submit</button>
  <button type="button" onClick={this.handleAddShareholder} className="btn-info custom-more-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;Add More Shops</button>
<hr />
    </div>
    </div>
</div>






        </div>
        </div>

    )
  }
}

export default withRouter(EmpAlloc)
