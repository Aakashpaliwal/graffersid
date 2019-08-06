import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios' 
import './Company.css'
export class ViewCompany extends Component {
    // constructor () {
    //     super() 
    //     this.state = {
    //   
    //       userdata : [],
    //       detailsdata : []
    //     }
    //     this.handleCheck = this.handleCheck.bind(this);
    //     this.detailCheck = this.detailCheck.bind(this);
    // }
    
 
    // handleCheck(item) {
    //   console.log(item.employe_id);
    //   let sitemeet = item.employe_id;
    //   fetch(`employe/delete/${sitemeet}`,{
    //              method : 'DELETE',
    //              headers : {
    //               
    //                "Content-Type" : "application/json"
    //            }
    //            })
    //            .then(function(response){ 
    //                    return response.json();})
    //                .then(function(json){
    //                     if(json.success===true){
    //                    //   console.log(json);
    //                    alert("Employe has been deleted");
    //                   //  window.location.reload()
    //                   const equipmentss = [...this.state.userdata];
    //                   equipmentss.splice(item, 1);
    //                   this.setState({
    //                       userdata:equipmentss
    //                   })
                      
    //                }
    //                else{
    //                  console.log(json);
    //              }
    //              }.bind(this))
    //  }
    // detailCheck(item) {
    //   // console.log(item.admin_id);
    //   let sitemeet = item.employe_id;
    //   axios.get(`employe/detail/${sitemeet}`)
    //   .then(response => {
    //             console.log('employe details view')
    //             console.log(response.data.employe_data);
    //             const detailsdata = response.data.employe_data;
    //             this.setState({ detailsdata : detailsdata })
    //           }) .catch(error => {
    //             console.log(error);
    //           })
    //   // fetch(`employe/detail/${sitemeet}`,{
    //   //            method : 'GET',
    //   //            headers : {
    //   //              'Authorization': 'Bearer ' + this.state.token,
    //   //              "Content-Type" : "application/json"
    //   //          }
    //   //          })
    //   //          .then((res) => {
    //   //           res.json().then((resp) => { 
    //   //             console.log(resp.employe_data)
    //   //             this.setState({ detailsdata:resp.employe_data})
    //   //             // this.parseJSON(this.state)
    //   //           })
    //   //         }
            
    //   //       )
    //  }
    // componentWillMount ()
    // {
    //   this.handleClick();
    // }
    // handleClick () {
    //   axios.get('employe/view')
    //   .then(response => {
    //             console.log('employe view')
    //             console.log(response.data.employe_data);
    //             const data = response.data.employe_data;
    //             this.setState({ userdata : data })
    //           }) .catch(error => {
    //             console.log(error);
    //           })
    //   }
    render() {
        return (
            <React.Fragment>
            <div>
            <div className="skin-blue fixed-layout">
        <div className="page-wrapper">

             <div className="container-fluid">
               
               <div className="row page-titles">
                   <div className="col-md-5 align-self-center">
                       {/* <h4 className="text-themecolor">Forms</h4> */}
                       <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">View Employees</li>
                            </ol>
                            </nav>
                   </div>
                  
               </div>


            </div>
           <div className="custom-table-here">
              <div className="container">
                <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Link to="/Company"> <button type="button" className="btn btn-info add-employe-btn"><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Add Company</button></Link>
                        <br /><br />
                        <table className="table table-bordered table-hover">
  <thead className="custom-table-head-color">
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
{/* <table className="table table-hover table-bordered ">
  <thead className="custom-table-head-color">
    <tr>
      <th scope="col">Employe Name</th>
      <th scope="col">Employe Alias</th>
      <th scope="col">Area Name</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {
          this.state.userdata ?
          this.state.userdata.map(function(item, id) {
            return(
                
    <tr key = {id}>
      <th scope="row">{item.employe_name}</th>
      <td>{item.employe_alias}</td>
      <td>{item.area_name}</td>
      <td>
      <Link to ={`/EditMasterEquipment/${item.equipment_master_id}`}> 
      <span class="tooltip-toggle" aria-label="Edit" tabindex="0">
      <button className="btn btn-warning custom-edit-btn btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></button>
              </span>
      </Link>
     
      <span class="tooltip-toggle" aria-label="Suspend" tabindex="0">
          <button  className="btn btn-danger custom-edit-btn btn-sm" onClick={this.handleCheck.bind(this, item)}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
              </span>
               <span class="tooltip-toggle" aria-label="Details" tabindex="0">
          <button className="btn btn-success custom-edit-btn btn-sm" onClick={this.detailCheck.bind(this, item)} data-toggle="modal" data-target=".bd-example-modal-lg"><i class="fa fa-eye" aria-hidden="true"></i></button>
                </span>
          </td>
    </tr>
  )
          }, this
  )
          :
          <span>Data is loading....</span>
        }
  </tbody>
</table> */}
 {/* details modal here */} 
 <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
    {/* <table className="table table-hover table-bordered ">
  <thead className="custom-table-head-color">
    <tr>
      <th scope="col">Employe Name</th>
      <th scope="col">Employe Alias</th>
      <th scope="col">Area Name</th>
     
    </tr>
  </thead>
  <tbody>
  {
          this.state.detailsdata ?
          this.state.detailsdata.map(function(item, id) {
            return(
                
    <tr key = {id}>
      <th scope="row">{item.employe_name}</th>
      <td>{item.employe_alias}</td>
      <td>{item.area_name}</td>
     
    </tr>
  )
          }, this
  )
          :
          <span>Data is loading....</span>
        }
  </tbody>
</table> */}
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
   
  </div>
</div> 


                </div>
                </div>
              </div>  
            
           </div>
           </div>
           </div>
            </div>
            </React.Fragment>
        );
    }
}

export default ViewCompany
