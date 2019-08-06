import React, { Component } from 'react'
import './service.css'
import {Link} from 'react-router-dom'
export class AddServices extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            blog_title : "",
            blog_img : "",
            blog_desc : ""
         
           };

    }
    
      change  = e => {
        this.setState ({
          [e.target.name]: e.target.value
        });
      };
      getWebsite = () =>
      {
          fetch('/');
      }
      onSubmit = e =>
      {
          e.preventDefault();
          console.log(this.state);
        //   if (
        //     this.state.blog_title === "" ||
        //     this.state.blog_img === "" ||
        //     this.state.blog_desc === ""
        //  ) {
        //     alert("Unable to contact because fields were left blank");
        //     }else {
        //         fetch(`/contact`,{
        //             method : "POST",
        //             headers : {
        //                 "Content-Type": "application/json; charset=utf-8"
        //             },
        //             body: JSON.stringify(this.state)
        //         }
        //         ).then(this.getWebsite);
        //       }

          this.setState ({
            blog_title : "",
            blog_img : "",
            blog_desc : ""

          })
          fetch('/Contact',{

            method : "POST",
            headers : {
                "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryIn312MOjBWdkffIM"
            },
            body: JSON.stringify(this.state)
          }).then(this.getWebsite);
      };
      
      fileSelectedHandler = e => {     
          e.preventDefault();
        let files = e.target.files;
        console.log('data',files[0]);
      }
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
                                <li className="breadcrumb-item active" aria-current="page">Add Service</li>
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
                   <h3>Add Service</h3><br />
           </div>
        </div>
        <form className="custom-content-form">
  <div class="form-row">
    <div class="form-group col-md-12">
    <label for="inputCategory">Enter Service Title</label>
     <input type="text" className="form-control" placeholder="" name="blog_title" value = {this.state.blog_title} onChange = {e => this.change(e)} />
    </div>
    <div class="form-group col-md-12">
    <label for="inputSubcategory">Add Service Image</label><br />              
     <input type="file" name="blog_img" onChange={e => this.fileSelectedHandler(e)} />
    </div>
    <div class="form-group col-md-12">
    <label for="inputSubcategory">Enter Service Description</label>
        <textarea className="form-control" rows = "5" placeholder="Description" name="blog_desc" value={this.state.blog_desc} onChange = {e => this.change(e)}></textarea>
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
export default AddServices
