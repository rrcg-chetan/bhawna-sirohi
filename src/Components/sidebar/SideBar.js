import { Fragment, useState, useRef } from 'react'

import './SideBar.css'

import NavBar from '../navbar/NavBar'
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'


const SideBar = props => {
  
  const { menuCollapsed, menu, skin } = props

  const [profile, setProfile] = useState(false)

  // ** Menu Hover State
  const [menuHover, setMenuHover] = useState(false)
  const [sidebar, setSidebar] = useState(false)

  // ** Ref
  const shadowRef = useRef(null)

  // ** Function to handle Mouse Enter
  const onMouseEnter = () => {
    if (menuCollapsed) {
      setMenuHover(true)
    }
  }

    const openSidebar = () => {                
        setSidebar(!sidebar);      
        console.log(sidebar);  
    }

    const closeSidebar = () => {        
        setSidebar(!sidebar); 
        console.log(sidebar);                                     
    }
    
    const openProfile = () => {                
      setProfile(!profile);      
      console.log(profile);  
  }

    const getUser = () => {
      const userStr = localStorage.getItem("users");
      if(userStr) return JSON.parse(userStr);
      else return null
  }     
  const user = getUser();

  // ** Scroll Menu
  const scrollMenu = container => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.add('d-block')
      }
    } else {
      if (shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.remove('d-block')
      }
    }
  }

  return (
    <Fragment>
      <div className={classnames('wrapper vertical-layout navbar-floating footer-static vertical-menu-modern menu-hide', {'menu-expanded': sidebar, 'menu-hide': !sidebar})}>
      <div
        className={classnames('main-menu menu-fixed menu-accordion menu-shadow', {
          expanded: menuHover || menuCollapsed === false,
          'menu-light': skin != 'semi-dark' && skin != 'dark',
          'menu-dark': skin === 'semi-dark' || skin === 'dark'
        })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
      >
        {menu ? (
          menu
        ) : (
          <Fragment>            
            <div className="navbar-header">
      <ul className="nav navbar-nav flex-row">
         <li className="nav-item mr-auto">
            <a aria-current="page" className="navbar-brand active" href="/">
               <h2 className="brand-text mb-0">River Route</h2>
            </a>
         </li>
         <li className="nav-item nav-toggle">
            <div className="nav-link modern-nav-toggle cursor-pointer">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-tour="toggle-icon" className="text-primary toggle-icon d-none d-xl-block">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="3"></circle>
               </svg>
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="toggle-icon icon-x d-block d-xl-none" onClick={closeSidebar}>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
               </svg>
            </div>
         </li>
      </ul>
   </div>
   
            <div className='shadow-bottom' ref={shadowRef}></div>
            <PerfectScrollbar
              className='main-menu-content'
              options={{ wheelPropagation: false }}
              onScrollY={container => scrollMenu(container)}
            >
              <ul className='navigation navigation-main'>
                <NavBar />
              </ul>
            </PerfectScrollbar>
          </Fragment>
        )}
      </div>
      </div>
      <nav className="header-navbar navbar align-items-center floating-nav navbar-shadow navbar navbar-expand-lg navbar-light floating-nav">
            <div className="navbar-container d-flex content align-items-center">
                <ul className="navbar-nav d-xl-none">
                  <li className="mobile-menu mr-auto nav-item">
                  <a className="nav-menu-main menu-toggle hidden-xs is-active nav-link" href="#" onClick={openSidebar}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ficon">
                          <line x1="3" y1="12" x2="21" y2="12"></line>
                          <line x1="3" y1="6" x2="21" y2="6"></line>
                          <line x1="3" y1="18" x2="21" y2="18"></line>
                      </svg>
                  </a>
                  </li>
                </ul>
                <div className="bookmark-wrapper align-items-center flex-grow-1 d-lg-flex">                    
                    <ul className="nav navbar-nav bookmark-icons">
                        <li className="d-none d-lg-block nav-item">
                        <a id="email" className="d-flex align-items-center nav-link" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> <span className="menu-title text-truncate nav_text">Home</span>
                        </a>
                        </li>
                        <li className="d-none d-lg-block nav-item">
                        <a id="chat" className="nav-link" href="/users">
                            Start
                        </a>
                        </li>
                        <li className="d-none d-lg-block nav-item">
                        <a id="todo" className="nav-link" href="/">
                            Search
                        </a>
                        </li>
                        <li className="d-none d-lg-block nav-item">
                        <a id="calendar" className="nav-link" href="/">
                            Alerts
                        </a>
                        </li>
                        <li className="nav-item d-none d-lg-block nav-item">
                        <a className="bookmark-star nav-link">
                            Reports
                        </a>                        
                        </li>
                    </ul>
                    <ul className="navbar-nav nav align-items-center ml-auto float-right">
                      <li  className={classnames("nav-item b-nav-dropdown dropdown dropdown-user", {'show': profile, '': !profile})} id="__BVID__96" onClick={openProfile}>
                        <a role="button" aria-haspopup="true" aria-expanded="false" href="#" target="_self" className="nav-link dropdown-toggle d-flex align-items-center dropdown-user-link" id="__BVID__96__BV_toggle_">
                          <div className="d-sm-flex user-nav">
                            <p className="user-name font-weight-bolder mb-0"> {user.institution} </p>
                            <span className="user-status">{user.loginname}</span>
                          </div>
                          <span className="b-avatar badge-minimal badge-light-primary rounded-circle">
                              <span className="b-avatar-img">
                              <svg version="1.1" id="Capa_1"  x="0px" y="0px" width="45.532px" height="45.532px" viewBox="0 0 45.532 45.532" style={{enableBackground: "new 0 0 45.532 45.532"}}><g><path d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765 S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53 c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012 c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592 c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></span><span className="b-avatar-badge badge-success"></span></span></a>                                                           
                      </li>
                    </ul>
                    <div className="menu-out">
                      <ul className={classnames("dropdown-menu dropdown-menu-right", {'show': profile, '': !profile})} aria-labelledby="__BVID__96__BV_toggle_">
                        <li role="presentation">
                          <a href={`/users/edit/${user.userid}`} class="dropdown-item d-flex align-items-center" role="menuitem" target="_self"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50 feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><span>Profile</span></a>
                        </li>
                        <li role="presentation"><a href="#settings" class="dropdown-item d-flex align-items-center" role="menuitem" target="_self"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50 feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg><span>Account Settings</span></a></li>
                        <li role="presentation"><a role="menuitem" href="/logout" target="_self" class="dropdown-item d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50 feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg><span>Logout</span></a></li></ul> 
                    </div>
                </div>                
            </div>
            </nav>
    </Fragment>
  )
}
export default SideBar;