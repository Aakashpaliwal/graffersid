import React, { Component } from 'react';
import './Header.css';
import {Link, withRouter} from 'react-router-dom';
class Header extends Component {
 constructor(props) {
    super(props);
    // this.state = {
    //     isSignedIn: false,
    //   }
  
    this.onLogout = this.onLogout.bind(this)
}
//   onRouteChange = () =>  {
//     console.log('obroute');
//   }
  onLogout = e =>
  {
    e.preventDefault(); // prevent page transition
    localStorage.clear();
      
         this.props.onRouteChange('signout');
        this.props.history.push('/')
        window.location.reload();

  }
  componentDidMount() {
    setTimeout(
        function() {
           localStorage.clear()
           alert('Please Login Again. Your Session Has Been Expired')
           window.location.reload()
        },1000*172800
    );
  }
  

    render() {
        // const isSignedIn = this.props.isSignedIn;
        // const onRouteChange = this.props.onRouteChange;
        // if (localStorage.getItem('tokenKey')) {
        return (
               <div className="skin-blue fixed-layout">
               <header className="topbar custom-topbar-bg">
            <nav className="navbar top-navbar navbar-expand-md navbar-dark">
               
                <div className="navbar-header custom-navbar-header-color">
                    <a className="navbar-brand" href={process.env.PUBLIC_URL +"/"}>
                      <b>
                          <i className="wi wi-sunset"></i> 
                          <h3>KARGOLOGIC</h3> 
                          
                        </b>
                       </a>
                </div>
 
                <div className="navbar-collapse custom-navbar-bg">
              
                    <ul className="navbar-nav mr-auto">
               
                        <li className="nav-item"> 
                        <a className="nav-link nav-toggler d-block d-sm-none waves-effect waves-dark" href="javascript:void(0)"><i className="fa fa-bars" aria-hidden="true"></i></a> </li>
                        <li className="nav-item"> 
                        <a className="nav-link sidebartoggler d-none d-lg-block d-md-block d-sm-block waves-effect waves-dark" href="javascript:void(0)"><i className="fa fa-bars" aria-hidden="true"></i></a> </li>
                    </ul>
          
                    <ul className="navbar-nav my-lg-0">
                     
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="fa fa-plus-circle custom-plus-circle" aria-hidden="true"></i>
                              
                            </a>
                            <div className="dropdown-menu dropdown-menu-right mailbox animated bounceInDown">
                                <ul>
                                    <li>
                                        <div className="drop-title">Notifications</div>
                                    </li>
                                    <li>
                                        <div className="message-center">
                                       
                                            <a href="javascript:void(0)">
                                                <div className="btn btn-danger btn-circle"><i className="fa fa-link"></i></div>
                                                <div className="mail-contnet">
                                                    <h5>Luanch Admin</h5> <span className="mail-desc">Just see the my new admin!</span> <span className="time">9:30 AM</span> </div>
                                            </a>
                                          
                                            <a href="javascript:void(0)">
                                                <div className="btn btn-success btn-circle"><i className="fa fa-calendar" aria-hidden="true"></i></div>
                                                <div className="mail-contnet">
                                                    <h5>Event today</h5> <span className="mail-desc">Just a reminder that you have event</span> <span className="time">9:10 AM</span> </div>
                                            </a>
                                           
                                            <a href="javascript:void(0)">
                                                <div className="btn btn-info btn-circle"><i className="ti-settings"></i></div>
                                                <div className="mail-contnet">
                                                    <h5>Settings</h5> <span className="mail-desc">You can customize this template as you want</span> <span className="time">9:08 AM</span> </div>
                                            </a>
                                           
                                            <a href="javascript:void(0)">
                                                <div className="btn btn-primary btn-circle"><i className="ti-user"></i></div>
                                                <div className="mail-contnet">
                                                    <h5>Pavan kumar</h5> <span className="mail-desc">Just see the my admin!</span> <span className="time">9:02 AM</span> </div>
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="nav-link text-center link" href="javascript:void(0);"> <strong>Check all notifications</strong> <i className="fa fa-angle-right"></i> </a>
                                    </li>
                                </ul>
                            </div>
                        </li> 
                   
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle waves-effect waves-dark" href="" id="2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="fa fa-bell-o custom-bell-icon" aria-hidden="true"></i>
                                <div className="notify"> <span className="heartbit"></span> <span className="point"></span> </div>
                            </a>
                            <div className="dropdown-menu mailbox dropdown-menu-right animated bounceInDown" aria-labelledby="2">
                                <ul>
                                    <li>
                                        <div className="drop-title">You have 4 new messages</div>
                                    </li>
                                    <li>
                                        <div className="message-center">
                                           
                                            <a href="javascript:void(0)">
                                                <div className="user-img"> <img src={require('../../assets/images/users/1.jpg')} alt="user" className="img-circle" /> <span className="profile-status online pull-right"></span> </div>
                                                <div className="mail-contnet">
                                                    <h5>Pavan kumar</h5> <span className="mail-desc">Just see the my admin!</span> <span className="time">9:30 AM</span> </div>
                                            </a>
                                           
                                            <a href="javascript:void(0)">
                                                <div className="user-img"> <img src={require('../../assets/images/users/2.jpg')} alt="user" className="img-circle" /> <span className="profile-status busy pull-right"></span> </div>
                                                <div className="mail-contnet">
                                                    <h5>Sonu Nigam</h5> <span className="mail-desc">I've sung a song! See you at</span> <span className="time">9:10 AM</span> </div>
                                            </a>
                                           
                                            <a href="javascript:void(0)">
                                                <div className="user-img"> <img src={require('../../assets/images/users/3.jpg')} alt="user" className="img-circle" /> <span className="profile-status away pull-right"></span> </div>
                                                <div className="mail-contnet">
                                                    <h5>Arijit Sinh</h5> <span className="mail-desc">I am a singer!</span> <span className="time">9:08 AM</span> </div>
                                            </a>
                                           
                                            <a href="javascript:void(0)">
                                                <div className="user-img"> <img src={require('../../assets/images/users/4.jpg')} alt="user" className="img-circle" /> <span className="profile-status offline pull-right"></span> </div>
                                                <div className="mail-contnet">
                                                    <h5>Pavan kumar</h5> <span className="mail-desc">Just see the my admin!</span> <span className="time">9:02 AM</span> </div>
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="nav-link text-center link" href="javascript:void(0);"> <strong>See all e-Mails</strong> <i className="fa fa-angle-right"></i> </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                  
                        
                        <li className="nav-item dropdown u-pro">
                            <a className="nav-link dropdown-toggle waves-effect waves-dark profile-pic" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={require('../../assets/images/users/1.jpg')} />&nbsp;
                            
                            <span className="hidden-md-down">Mark &nbsp;<i className="fa fa-angle-down"></i></span> </a>
                            <div className="dropdown-menu dropdown-menu-right animated flipInY">
                                 
                                <a href="javascript:void(0)" className="dropdown-item"><i className="ti-user"></i> My Profile</a>
                                 
                                <a href="javascript:void(0)" className="dropdown-item"><i className="ti-wallet"></i> My Balance</a>
                                 
                                <a href="javascript:void(0)" className="dropdown-item"><i className="ti-email"></i> Inbox</a>
                                 
                                <div className="dropdown-divider"></div>
                                 
                                <a href="javascript:void(0)" className="dropdown-item"><i className="ti-settings"></i> Account Setting</a>
                                 
                                <div className="dropdown-divider"></div>
                                 
                                <a className="dropdown-item"><i className="fa fa-power-off"></i> Logout</a>
                               
                            </div>
                         {/* <button type="button" className="btn btn-info logout-btn" onClick = {e => this.onLogout(e)}>LOG OUT</button>  */}
                        </li>
                       
                        <li className="nav-item right-side-toggle"> <a className="nav-link  waves-effect waves-light" href="javascript:void(0)"><i className="ti-settings"></i></a></li>
                    </ul>
                </div>
            </nav>
        </header>
        </div>
                
           
        );
    // }else{
    //     return(<div>

    //     </div>);}
}
}

export default withRouter(Header)