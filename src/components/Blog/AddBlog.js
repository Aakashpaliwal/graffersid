import React, { Component } from 'react';
import './Blog.css';
import {Link} from 'react-router-dom';



class AddBlog extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
           name : "",
          desc: "",
           image1 : "",
           image2 : "",
           image3 : "",
           image4 : ""
         
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
            name : "",
          desc: "",
           image1 : "",
           image2 : "",
           image3 : "",
           image4 : ""
          })
          fetch('blog/add',{

            method : "POST",
            headers : {
              "Content-Type" : "application/json; charset=utf-8"
            },
            body: JSON.stringify(this.state)
          }) .then(function(response){ 
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
                                <li className="breadcrumb-item active" aria-current="page">Add Blog</li>
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
                   <h3>Add Blog</h3><br />
           </div>
        </div>
        <form className="custom-content-form">
  <div class="form-row">
    <div class="form-group col-md-12">
    <label for="inputCategory">Enter Blog Title</label>
     <input type="text" className="form-control" placeholder="" name="name" value = {this.state.name} onChange = {e => this.change(e)} />
    </div>

    <div class="form-group col-md-3">
    <label for="inputSubcategory">Add Blog Image1</label><br />              
     <input type="file" name="image1"  name="image1" value = {this.state.image1} onChange={e => this.change(e)} />
    </div>
    <div class="form-group col-md-3">
    <label for="inputSubcategory">Add Blog Image2</label><br />              
     <input type="file" name="image2" name="image2" value = {this.state.image2} onChange={e => this.change(e)} />
    </div>
    <div class="form-group col-md-3">
    <label for="inputSubcategory">Add Blog Image3</label><br />              
     <input type="file" name="image3" name="image3" value = {this.state.image3} onChange={e => this.change(e)} />
    </div>
    <div class="form-group col-md-3">
    <label for="inputSubcategory">Add Blog Image4</label><br />              
     <input type="file" name="image4" name="image4" value = {this.state.image4} onChange={e => this.change(e)} />
    </div>


    <div class="form-group col-md-12">
    <label for="inputSubcategory">Enter Blog Description</label>
        <textarea className="form-control" rows = "5" placeholder="desc" name="desc" value={this.state.desc} onChange = {e => this.change(e)}></textarea>
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

export default AddBlog;