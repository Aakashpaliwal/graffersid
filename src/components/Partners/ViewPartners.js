import React, { Component } from 'react'
import './partner.css'
import {Link} from 'react-router-dom'
export class ViewPartners extends Component {
    constructor () {
        super() 
        this.state = {
        
          userdata : []
        }
    }
 
    componentDidMount ()
    {
      this.handleClick();
    }
    handleClick () {
      fetch('partner/view',{
        method : 'GET',
        headers : {
         
          "Content-Type" : "application/json"
      }
      })
        .then((res) => {
          res.json().then((resp) => { 
            console.log(resp.partnerdata)
            this.setState({ userdata:resp.partnerdata})
            // this.parseJSON(this.state)
          })
        }
      
      )
      }
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
                                        <li className="breadcrumb-item active" aria-current="page">View Profile</li>
                                    </ol>
                                    </nav>
                           </div>
                          
                       </div>
        
        
                    </div>
                   <div className="custom-table-here">
                      <div className="container">
                        <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <table class="table table-hover table-bordered">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Contact</th>
      <th scope="col">Subject</th>
    </tr>
  </thead>
  <tbody>
  {
              this.state.userdata ?
              this.state.userdata.map(function(item, id) {
                return (
    <tr key="id">
      <th scope="row">{item.first_name} {item.last_name}</th>
      <td>{item.email}</td>
      <td>{item.contact_number}</td>
      <td>{item.subject}</td>
    </tr>
  )

}, this
              
      )
              :
              <span>Data is loading....</span>
            }
  </tbody>
</table>
                        {/* <table className="table table-hover table-bordered ">
              <thead className="custom-table-head-color">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
              {
                      this.state.userdata ?
                      this.state.userdata.map((item) =>
                            
                <tr>
                  <th scope="row"> {item.adminname}</th>
                  <td>{item.email}</td>
                </tr>
                      
              )
                      :
                      <span>Data is loading....</span>
                    }
              </tbody>
            </table> */}
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
export default ViewPartners
