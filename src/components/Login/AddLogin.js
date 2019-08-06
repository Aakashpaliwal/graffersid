import React, { Component } from 'react';
import './Login.css';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios'
import { API_URL } from '../../services/url';
import authService from '../../services/auth-service';
import axiosService from '../../services/axios-service';

class AddLogin extends Component {
	constructor(props)
	{
		super(props);
		this.state = {
		ui_user_name : "",
		ui_password: "",
		redirect: false,
		tokentext: "",
		tokenlength : ""
			  
		}
		this.onSubmit = this.onSubmit.bind(this)	
		
	}

	change = e => 
	{
	 this.setState({
		 [e.target.name] : e.target.value,

	 })
	}
	
	onSubmit = e =>
	{
		
		e.preventDefault();
		this.setState({
		ui_user_name : "",
		ui_password: ""
		})
		axios.post(`${API_URL}company/login`, this.state)
		.then(function(response){ 
			console.log(response.data);
		if(response.data.success){
			const tokentext = response.data.tokenKey
			localStorage.setItem('tokenKey', tokentext);
			alert(response.data.msg)
			this.props.onRouteChange('home');
			// this.props.history.push('/')
			window.location.reload('home')
			
			//window.location.reload('home')
		}
		console.log('authservice gettoke')
			
		//console.log(authService.getToken())
		 }.bind(this))
	  .catch(error => {
			alert(error.response);
		})
	
		
	}
    render() {
		//const onRouteChange = this.props.onRouteChange;
        return (
            <div>
               <div class="my-login-page">
	<section class="h-100">
		<div class="container h-100">
			<div class="row justify-content-md-center h-100">
				<div class="card-wrapper">
					<div class="card fat custom-card-margin">
						<div class="card-body">
							<h4 class="card-title">Login</h4>
							<form method="POST">
							 
								<div class="form-group">
									<label for="email">User Name</label>

									<input id="email" type="text" class="form-control" name="ui_user_name" value={this.state.ui_user_name} onChange={e => this.change(e)} required autofocus />
								</div>

								<div class="form-group">
									<label for="password">Password
										{/*<a href="forgot.html" class="float-right">
											Forgot Password?
										</a>*/}
									</label>
									<input id="password" type="password" class="form-control" name="ui_password" value={this.state.ui_password} onChange={e => this.change(e)} required data-eye />
								</div>

								{/*<div class="form-group">
									<label>
										<input type="checkbox" name="user_remember" value={this.state.user_remember} onchange={e => this.change(e)}/> Remember Me
									</label>
									</div>*/}

								<div class="form-group no-margin">
									<button class="btn btn-block btn-login-custom-dms" onClick = {e => this.onSubmit(e)} >
										Login
									</button>
								</div>
								{/*<div class="margin-top20 text-center">
									Don't have an account? <p onClick={() => onRouteChange('register')}>Register</p>
								</div>*/}
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    </div>
    
                
            </div>
        );
    }
}

export default AddLogin;