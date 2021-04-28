import React, { useState } from 'react';
import "./NavBar.css";
import classnames from 'classnames';

const DashboardNavBar = () => {

   const getUser = () => {
      const userStr = localStorage.getItem("users");
      if(userStr) return JSON.parse(userStr);
      else return null
  }     

   const userLink = () => {
      if(user.role === 'admin'){
         return (
            <>
            <li className="nav-item">
               <a className="d-flex align-items-center" href="/users">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <span className="menu-item text-truncate">Users</span>
               </a>
            </li>
         </>
         )
      }
   }

  const user = getUser();
    return(
        <div>   
   <div className="shadow-bottom"></div>
   <div className="scrollbar-container main-menu-content ps ps--active-y">
      <ul className="navigation navigation-main">
         <li className="">
         <a className="d-flex align-items-center" href="/"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
               </svg>
               <span className="menu-title text-truncate">Dashboard</span></a>
         </li>
         <li className="nav-item">
            <a className="d-flex align-items-center" href="/demography">
               <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
               <span className="menu-item text-truncate">Add Data</span>
            </a>
         </li>
         {userLink()}         
         <li className="nav-item">
            <a className="d-flex align-items-center" href="/messages">
               <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
               <span className="menu-item text-truncate">Messages</span>
            </a>
         </li>  
         <li className="nav-item">
            <a className="d-flex align-items-center" href="/incomplete-data">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
               </svg>
               <span className="menu-title text-truncate">Incomplete Data</span>
            </a>            
         </li>  
         <li className="nav-item">
            <a className="d-flex align-items-center" href="/reports">
               <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
               <span className="menu-item text-truncate">Reports</span>
            </a>
         </li>
         <li className="nav-item">
            <a className="d-flex align-items-center" href="/search">
            <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
               <span className="menu-item text-truncate">Search</span>
            </a>
         </li>         
         <li className="nav-item">
            <a className="d-flex align-items-center" href="/logout">
               <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50 feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
               <span className="menu-item text-truncate">Logout</span>
            </a>
         </li>      
      </ul>      
      <div className="ps__rail-x">
         <div className="ps__thumb-x" tabIndex="0"></div>
      </div>
      <div className="ps__rail-y">
         <div className="ps__thumb-y" tabIndex="0"></div>
      </div>
   </div>
</div>
    )
}

export default DashboardNavBar;