import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../services/url";
import authService from "../../services/auth-service";
import SimpleReactValidator from "simple-react-validator";
export class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ui_product_name: "",
      ui_product_type_id: "",
      ui_product_description: "",

      userdata: []
    };
    this.validator = new SimpleReactValidator();
  }
  componentWillMount() {
    this.handleClick();
  }
  handleClick() {
    axios
      .get(
        `${API_URL}product_type/view/0/100`,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      )
      .then(response => {
        console.log(response);
        console.log(response.data.product_type_data);
        const data = response.data.product_type_data;
        this.setState({ userdata: data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  getWebsite = () => {
    fetch("/");
  };
  async onSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      console.log(this.state);
      try {
        const response = await axios.post(
          `${API_URL}product/add`,
          this.state,
          (axios.defaults.headers.common["authorization"] =
            "Bearer " + authService.getToken())
        );
        console.log(response);
        // if (response.data.success) {
        //   alert(response.data.msg);
        //   this.props.history.push("/ViewProducts");
        // }
      } catch (error) {
        console.log(error);
      }
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
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
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Master Product
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>

          {/*Form content begin */}

          <div className="product-form-upper">
            <div className="container">
              <div className="below-custom-form">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h3>Product</h3>
                    <br />
                  </div>
                </div>

                <form className="custom-content-form" autoComplete="OFF">
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputCategory">Enter Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="ui_product_name"
                        value={this.state.ui_product_name}
                        onChange={e => this.change(e)}
                      />
                      <span className="text-danger">
                        {this.validator.message(
                          "Product Name",
                          this.state.ui_product_name,
                          "required|alpha_space"
                        )}
                      </span>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="inputSubcategory">Add Product Category</label>
                      <br />
                      <select
                        className="form-control"
                        name="ui_product_type_id"
                        value={this.state.ui_product_type_id}
                        onChange={e => this.change(e)}
                      >
                        <option value="No Choice">Choose....</option>
                        {this.state.userdata ? (
                          this.state.userdata.map(function(item, id) {
                            return (
                              <option value={item.product_type_id}>
                                {item.product_type_name}
                              </option>
                            );
                          }, this)
                        ) : (
                          <span>Data is loading....</span>
                        )}
                      </select>
                      <span className="text-danger">
                        {this.validator.message(
                          "Product Category",
                          this.state.ui_product_type_id,
                          "required"
                        )}
                      </span>
                    </div>
                    <div class="form-group col-md-12">
                      <label for="inputSubcategory">
                        Add Product Description
                      </label>
                      <br />
                      <textarea
                        className="form-control"
                        name="ui_product_description"
                        value={this.state.ui_product_description}
                        onChange={e => this.change(e)}
                      />
                      <span className="text-danger">
                        {this.validator.message(
                          "Product Description",
                          this.state.ui_product_description,
                          "required|alpha_space"
                        )}
                      </span>
                    </div>
                  </div>

                  <button
                    class="btn btn-primary"
                    onClick={e => this.onSubmit(e)}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Products);
