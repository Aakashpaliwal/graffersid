import React, { Component } from 'react'
import './Employe.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../services/url';
import authService from '../../services/auth-service';
import axiosService from '../../services/axios-service';
export class EditEmploye extends Component {
      constructor(props)
      {
          super(props)
          this.state = {
                  ui_id : this.props.match.params.id,
                  ui_employe_name: "",
                  ui_employe_alias : "",
                  ui_area_id : "",
                  ui_are_name :"" ,
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
      axios.get(`${API_URL}employe/detail/${Editid}`,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
      .then((resp) => {
        console.log(resp)
        console.log(resp.data.employe_data);
        const data = resp.data.employe_data;
        this.setState({ 
          ui_employe_name:resp.data.employe_data[0].employe_name,
          ui_employe_alias:resp.data.employe_data[0].employe_alias,
          ui_area_name:resp.data.employe_data[0].area_name,
          ui_area_id : resp.data.employe_data[0].area_id
        })
        }) 
        .catch(error => {
        console.log(error);
        })

      axios.get(`${API_URL}area/view`,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
      .then(response => {
                console.log('Area view')
                console.log(response.data.area_data);
                const data = response.data.area_data;
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
          axios.put(`${API_URL}employe/update/${Editid}`,this.state,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
          .then((resp) => {
            console.log(resp.data)
           if(resp.data.success === true)
           {
             alert(resp.data.msg)
             this.props.history.push('/ViewEmploye')
           }
           else {
             alert(resp.data.msg)
           }
            } )
            .catch(error => {
            console.log(error.response);
            })
    //       fetch(`/employe/update/${Editid}`,{
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
    //         this.props.history.push('/ViewEmploye')
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
                                <li className="breadcrumb-item active" aria-current="page">Edit Employe</li>
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
                   <h3>Edit Employe</h3>
           </div>
        </div>
        
        <form className="custom-content-form" autoComplete = 'no'>
  <div class="form-row">
    <div class="form-group col-md-12">
    <label for="inputCategory">Edit Name</label>
     <input type="text" className="form-control" placeholder="John Doe" name="ui_employe_name" value = {this.state.ui_employe_name} onChange={e => this.change(e)} />
    </div>
    <div class="form-group col-md-12">
    <label for="inputCategory">Edit Alias/ame</label>
     <input type="text" className="form-control" placeholder="John Doe" name="ui_employe_alias" value = {this.state.ui_employe_alias} onChange={e => this.change(e)} />
    </div>

     <div class="form-group col-md-12">
    <label for="inputCategory">Edit Location</label>
        <select className="form-control" value = {this.state.ui_area_id} name = "ui_area_id" onChange = {(e) => this.setState({ui_area_id: e.target.value})}>
        <option value={this.state.area_id}>{this.state.ui_area_name}</option>
        {
          this.state.userdata ?
          this.state.userdata.map(function(item, id) {
            return(
                <option value={item.area_id}>{item.area_name}</option>

                 )
          }, this
  )
          :
          <span>Data is loading....</span>
        }


        </select>
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

export default EditEmploye
