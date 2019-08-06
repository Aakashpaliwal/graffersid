import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import './Inventory.css'
export class Inventory extends Component {
     
  constructor(props)
  {
      super(props)
      this.state = {
    
          // customer_id: "",
          companylistdata : [],
          sitelistdata : [],
          equipmentlistdata : [],
          ui_product_type_id : "",

       
         };

  }
 
  componentWillMount ()
  {
    this.handleClick();
  }
  
  siteclick = e =>  
  {
    e.preventDefault();
    console.log('hi');
    console.log('product id here');
    console.log(this.state.ui_product_type_id);
    // console.log(this.state.value);
    const sitemeet = this.state.ui_product_type_id;
     fetch('product/prod_on_type/'+sitemeet,{
      method : 'POST',
      headers : {
     
        "Content-Type" : "application/json"
    }
    })
    .then((res) => {
      res.json().then((resp) => { 
        console.log(resp.product_data)
        this.setState({ sitelistdata:resp.product_data})
        // this.parseJSON(this.state)
      })
    }
  )

  }

  equipmentclick = e =>  
  {
    e.preventDefault();
    console.log('hi');
    // console.log(this.state.customer_id);
    // this.setState ({
      
    //     customer_id: e.target.value
   
    // //  customer_id : ""
    // })
    console.log('hi');
    console.log(this.state.site_id);
    // console.log(this.state.value);
    const equipmeet = this.state.site_id;
     fetch('list/equipmentonsite?site_id='+equipmeet,{
      method : 'GET',
      headers : {
     
        "Content-Type" : "application/json"
    }
    })
    .then((res) => {
      res.json().then((resp) => { 
        console.log(resp.data)
        this.setState({  equipmentlistdata:resp.data})
        // this.parseJSON(this.state)
      })
    }
  )

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
          this.setState({ companylistdata:resp.product_type_data})
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
        fetch('/').then(console.log(this.state));
    }
//     datepicker = () => {$("#from-datepicker").datepicker({ 
//       format: 'yyyy-mm-dd'
//   });
// }
    onSubmit = e =>
    {
        e.preventDefault();
        console.log(this.state);
        this.setState ({
          equipment_id : "",
          frequency : "",
          price : "",
          startDate : "",
          total_price: ""
        })
        fetch('amc/add',{

          method : "POST",
          headers : {
          
              "Content-Type" : "application/json"
          },
          body: JSON.stringify(this.state)
        })
         //   .then(console.log(this.state));
      .then(function(response){ 
          return response.json();})
      .then(function(json){
           if(json.success===true){
          //   console.log(json);
          alert("your data has been submitted");
      }
      else{
        console.log(json);
    }
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
                              <li className="breadcrumb-item active" aria-current="page">Add Inventory</li>
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
                 <h3>Add Inventory</h3>
         </div>
      </div>
      <form className="custom-content-form" autoComplete = 'no'>
<div class="form-row">
<div class="form-group col-md-6">
  <label for="inputCategory">Enter Category</label>
  <select className="form-control" name="ui_product_type_id" value={this.state.ui_product_type_id}  onClick={e => this.siteclick(e)} onChange={(e) => this.setState({ui_product_type_id: e.target.value})} >
  <option>Choose ....</option>
  {
            this.state.companylistdata ?
            this.state.companylistdata.map(function(item, id) {
              return(
                  
      <option key ={id} value={item.product_type_id}>{item.product_type_name}</option>
    )
            }
    )
            :
            <span>Data is loading....</span>
          }

  </select>
  </div>

   <div class="form-group col-md-6">
   <label for="inputCategory">Enter Product</label>
  <select className="form-control" name="product_id" value={this.state.product_id} onChange={(e) => this.setState({product_id: e.target.value})}>
          <option>chose....</option>
  {
            this.state.sitelistdata ?
            this.state.sitelistdata.map(function(item, id) {
              return(
                  
      <option key ={id} value={item.product_id}>{item.product_name}</option>
    )
            }
    )
            :
            <span>Data is loading....</span>
          }

  </select>
  </div>

   <div class="form-group col-md-6">
   <label for="inputCategory">Enter equipment list</label>
  <select className="form-control" name="equipment_id" value = {this.state.equipment_id} onChange={e => this.change(e)}>
  <option>chose....</option>
  {
            this.state.equipmentlistdata ?
            this.state.equipmentlistdata.map(function(item, id) {
              return(
                  
      <option key ={id} value={item.equipment_id}>{item.equipment}</option>
    )
            }
    )
            :
            <span>Data is loading....</span>
          }

  </select>
  </div>

  <div class="form-group col-md-6">
  <label for="inputCategory">Enter frequency</label>
   {/* <input type="text" className="form-control" placeholder="John Doe" name="frequency" value = {this.state.frequency} onChange = {e => this.change(e)} /> */}
   <select className="form-control" name="frequency" value={this.state.frequency} onChange={e => this.change(e)}>
          <option>Choose....</option>
    <option value="3">Quarterly</option>        
    <option value="6">Half Yearly</option>     
    <option value="12">Yearly</option>     
   </select>
  </div>

  <div class="form-group col-md-6">
  <label for="inputCategory">Enter price</label>
   <input type="text" className="form-control" placeholder="John Doe" name="price" value = {this.state.price} onChange = {e => this.change(e)} />
  </div>
          
  <div class="form-group col-md-6">
  <label for="inputCategory">Enter Total Price</label>
  <input type="text" className="form-control" placeholder="total price" name="total_price" value={this.state.total_price} onChange = {e => this.change(e)}/>
  {/* <input type="date" className="form-control" id="from-datepicker" name="startDate" value={this.state.startDate} onChange={e => this.change(e)} /> */}
  </div>



  <div class="form-group col-md-12">
  <label for="inputCategory">Enter start date</label>
  <input type="text" className="form-control" name="startDate" value={this.state.startDate} onChange = {e => this.change(e)} placeholder="YYYY-MM-DD" required pattern="([0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01]))" title="Enter a date in this format YYYY/MM/DD"/>
  {/* <input type="date" className="form-control" name="startDate" value={this.state.startDate} onChange={e => this.change(e)} /> */}
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

export default Inventory
