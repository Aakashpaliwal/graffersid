import React, { Component } from 'react'
import './career.css'
import {Link} from 'react-router-dom'
export class ViewCareer extends Component {
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
      fetch('career/view',{
        method : 'GET',
        headers : {
          "Content-Type" : "application/json"
      }
      })
        .then((res) => {
          res.json().then((resp) => { 
            console.log(resp.careerdata)
            this.setState({ userdata:resp.careerdata})
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
      <th scope="col">Profile</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody>
  {
              this.state.userdata ?
              this.state.userdata.map(function(item, id) {
                return (
    <tr key="id">
      <th scope="row">{item.c_first_name} {item.c_last_name}</th>
      <td>{item.profile}</td>
      <td>{item.c_email}</td>
    </tr>
  )

}, this
              
      )
              :
              <span>Data is loading....</span>
            }
  </tbody>
</table>
                      
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
    

export default ViewCareer
