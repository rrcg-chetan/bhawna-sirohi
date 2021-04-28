import React from 'react';
//import ReactDOM from 'react-dom';
//import NavBar from '../Components/navbar/NavBar';
import DashboardSideBar from '../Components/sidebar/DashboardSideBar';
import UsersData from './user/UsersData';
import Alerts from '../Components/Alerts';

import '../assets/css/mainstyle.css';
import '../assets/css/animate.css';
import '../assets/css/vertical-menu.css';
import '../assets/css/perfect-scrollbar.css';

import { Redirect, withRouter } from'react-router-dom'
  
class Dashboard extends React.Component {
  getUser = () => {
      const userStr = localStorage.getItem("users");
      if(userStr) return JSON.parse(userStr);
      else return null
  }  

  render(){    
    const user = this.getUser();    
    if(user === "null" || user === null || user === '' || user === undefined){
      return <Redirect from="*" to='/login'></Redirect>     
    }
  return (
    <div>
        <DashboardSideBar />
        <div className="content-wrapper animate__animated animate__fadeIn">
          <div className="app-content content overflow-hidden1 ">
            <UsersData />
            <div className="row match-height">
              <div className="col-md-12 col-lg-12">
                <Alerts />
              </div>
              {/*<div className="col-md-12 col-lg-6">
                <DataQueries />
              </div>
              <div className="col-md-12 col-lg-6">
                <Documents />
              </div>
              <div className="col-md-12 col-lg-6">
                <UserData />
              </div>  */}              
          </div>
        </div>
    </div>
    </div>
  
  );   }   
}

export default withRouter(Dashboard);