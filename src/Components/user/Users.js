import React from 'react';
//import ReactDOM from 'react-dom';
//import NavBar from '../Components/navbar/NavBar';
import DashboardSideBar from '../sidebar/DashboardSideBar';

import '../../assets/css/mainstyle.css';
import '../../assets/css/animate.css';
import '../../assets/css/vertical-menu.css';
import '../../assets/css/perfect-scrollbar.css';

import User from './User';
import { Button } from 'react-bootstrap';



  
const Users = () => {  
  return (
    <div>
        <DashboardSideBar />
        <div className="content-wrapper animate__animated animate__fadeIn">
          <div className="app-content content overflow-hidden">
          <a href="/users/add"><Button className="position-right">Add New</Button></a>
            <User />
                            
          </div>
        </div>
    </div>
    
          
  );      
}

export default Users;