import React from 'react';
import "./NavBar.css";

const NavBar = () => {
   /*const [collapse, setCollapse] = useState(false);
   const [collapseInvoice, setCollapseInvoice] = useState(false);

   const openCollapse = (e) => {
      e.preventDefault();
      setCollapse(!collapse);
   }
   const openCollapseInvoice = (e) => {
      e.preventDefault();
      setCollapseInvoice(!collapseInvoice);
   }*/
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
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
               </svg>
               <span className="menu-item text-truncate">Add Data</span>
            </a>
         </li>
         <li className="navigation-header">
            <span>Patient Details</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather-more-horizontal">
               <circle cx="12" cy="12" r="1"></circle>
               <circle cx="19" cy="12" r="1"></circle>
               <circle cx="5" cy="12" r="1"></circle>
            </svg>
         </li>
         <li className="nav-item">
            <a className="d-flex align-items-center" href="/demography">
            <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
            <span className="menu-item text-truncate">Demography</span>
            </a>
         </li>
         <li className="nav-item">
            <a className="d-flex align-items-center" href="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
            <span className="menu-item text-truncate">Initial Presentation</span>
            </a>
         </li>
         <li className="nav-item">
            <a className="d-flex align-items-center" href="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
            <span className="menu-item text-truncate">Pathology</span>
            </a>
         </li>
         <li className="nav-item">
            <a className="d-flex align-items-center" href="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
            <span className="menu-item text-truncate">Treatment</span>
            </a>
         </li>
         <li className="nav-item">
            <a className="d-flex align-items-center" href="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
            <span className="menu-item text-truncate">Follow Up</span>
            </a>
         </li>
         <li className="nav-item">
            <a className="d-flex align-items-center" href="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
            <span className="menu-title text-truncate">Health Economics</span>
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

export default NavBar;