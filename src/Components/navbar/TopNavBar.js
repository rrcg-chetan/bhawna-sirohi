import React, { useState } from 'react'

const TopNavBar = () => {

    const [sidebar, setSidebar] = useState(false);

    const openSidebar = () => {                
        setSidebar({sidebar: true});
        console.log(sidebar);
    }

    const closeSidebar = () => {        
        setSidebar({sidebar: false}); 
        console.log(sidebar);                            
    }

    return(
        <div>
            <nav className="header-navbar navbar align-items-center floating-nav navbar-shadow navbar navbar-expand-lg navbar-light">
            <div className="navbar-container d-flex content">
                <div className="bookmark-wrapper d-flex align-items-center">
                    <ul className="navbar-nav d-xl-none">
                        <li className="mobile-menu mr-auto nav-item">
                        <a className="nav-menu-main menu-toggle hidden-xs is-active nav-link" onClick={openSidebar}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ficon">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav bookmark-icons">
                        <li className="d-none d-lg-block nav-item">
                        <a id="email" className="d-flex align-items-center nav-link" href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> <span className="menu-title text-truncate nav_text">Home</span>
                        </a>
                        </li>
                        <li className="d-none d-lg-block nav-item">
                        <a id="chat" className="nav-link" href="/">
                            Start
                        </a>
                        </li>
                        <li className="d-none d-lg-block nav-item">
                        <a id="todo" className="nav-link" href="/users">
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
                </div>
                <ul className="nav navbar-nav align-items-center ml-auto">
                    <li href="/" className="dropdown-language nav-item dropdown">
                        <a href="/" aria-haspopup="true" className="nav-link" aria-expanded="false"><img className="country-flag flag-icon" src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/us.svg"  /><span className="selected-language">English</span></a>
                        <div tabIndex="-1" role="menu" aria-hidden="true" className="mt-0 dropdown-menu dropdown-menu-right"><a href="/" tabIndex="0" role="menuitem" className="dropdown-item"><img className="country-flag" src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/us.svg" /><span className="ml-1">English</span></a><a href="/" tabIndex="0" role="menuitem" className="dropdown-item"><img className="country-flag" src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/fr.svg"/><span className="ml-1">French</span></a><a href="/" tabIndex="0" role="menuitem" className="dropdown-item"><img className="country-flag" src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/de.svg" /><span className="ml-1">German</span></a><a href="/" tabIndex="0" role="menuitem" className="dropdown-item"><img className="country-flag" src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/pt.svg"/><span className="ml-1">Portuguese</span></a></div>
                    </li>
                    <li className="d-none d-lg-block nav-item">
                        <a className="nav-link-style nav-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ficon">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                        </a>
                    </li>
                    <li className="nav-search nav-item">
                        <a className="nav-link-search nav-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ficon">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        </a>
                        <div className="search-input">
                        <div className="search-input-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                        <div className="search-input-close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ficon">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </div>
                        </div>
                    </li>
                    <li className="dropdown-cart nav-item mr-25 dropdown">
                        <a aria-haspopup="true" className="nav-link position-relative" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ficon">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span className="badge-up badge badge-primary badge-pill">5</span>
                        </a>
                        <ul tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu-media dropdown-cart mt-0 dropdown-menu dropdown-menu-right">
                        <li className="dropdown-menu-header">
                            <div tabIndex="-1" className="d-flex dropdown-header">
                                <h4 className="notification-title mb-0 mr-auto">My Cart</h4>
                                <span className="badge badge-light-primary badge-pill">5 Items</span>
                            </div>
                        </li>
                        <div className="scrollbar-container scrollable-container media-list ps">
                            <div className="align-items-center media">
                                <img className="d-block rounded mr-1" src="/static/media/1.0c19af20.png" alt="Apple Watch Series 5" width="62" />
                                <div className="media-body">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cart-item-remove">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                    <div className="media-heading">
                                    <h6 className="cart-item-title"><a className="text-body" href="/apps/ecommerce/product/apple-watch-series-5-27">Apple Watch Series 5</a></h6>
                                    <small className="cart-item-by">by Apple</small>
                                    </div>
                                    <div className="cart-item-qty">
                                        <div className="number-input p-0 input-group">
                                            <div className="input-group-prepend">
                                                <button disabled="" className="btn-icon btn btn-transparent btn-sm disabled">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    </svg>
                                                </button>
                                            </div>
                                            
                                            <div className="input-group-append">
                                                <button className="btn-icon btn btn-transparent btn-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className="cart-item-price">$339.99</h5>
                                </div>
                            </div>
                            <div className="align-items-center media">
                                <img className="d-block rounded mr-1" src="/static/media/7.0a9d1776.png" alt="Google - Google Home - White/Slate fabric" width="62" />
                                <div className="media-body">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cart-item-remove">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                    <div className="media-heading">
                                    <h6 className="cart-item-title"><a className="text-body" href="/apps/ecommerce/product/google-google-home-white-slate-fabric-21">Google - Google Home - White/Slate fabric</a></h6>
                                    <small className="cart-item-by">by Google</small>
                                    </div>
                                    <div className="cart-item-qty">
                                    <div className="number-input p-0 input-group">
                                        <div className="input-group-prepend">
                                            <button disabled="" className="btn-icon btn btn-transparent btn-sm disabled">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                </svg>
                                            </button>
                                        </div>
                                        
                                    </div>
                                    </div>
                                    <h5 className="cart-item-price">$129.29</h5>
                                </div>
                            </div>
                            <div className="align-items-center media">
                                <img className="d-block rounded mr-1" src="/static/media/2.64ec9144.png" alt="Apple iPhone 11 (64GB, Black)" width="62" />
                                <div className="media-body">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cart-item-remove">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                    <div className="media-heading">
                                    <h6 className="cart-item-title"><a className="text-body" href="/apps/ecommerce/product/apple-i-phone-11-64-gb-black-26">Apple iPhone 11 (64GB, Black)</a></h6>
                                    <small className="cart-item-by">by Apple</small>
                                    </div>
                                    <div className="cart-item-qty">
                                    <div className="number-input p-0 input-group">
                                        <div className="input-group-prepend">
                                            <button disabled="" className="btn-icon btn btn-transparent btn-sm disabled">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                </svg>
                                            </button>
                                        </div>
                                        
                                        <div className="input-group-append">
                                            <button className="btn-icon btn btn-transparent btn-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    </div>
                                    <h5 className="cart-item-price">$669.99</h5>
                                </div>
                            </div>
                            <div className="align-items-center media">
                                <img className="d-block rounded mr-1" src="/static/media/3.b3c8f04e.png" alt="Apple iMac 27-inch" width="62" />
                                <div className="media-body">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cart-item-remove">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                    <div className="media-heading">
                                    <h6 className="cart-item-title"><a className="text-body" href="/apps/ecommerce/product/apple-i-mac-27-inch-25">Apple iMac 27-inch</a></h6>
                                    <small className="cart-item-by">by Apple</small>
                                    </div>
                                    <div className="cart-item-qty">
                                    <div className="number-input p-0 input-group">
                                        <div className="input-group-prepend">
                                            <button disabled="" className="btn-icon btn btn-transparent btn-sm disabled">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                </svg>
                                            </button>
                                        </div>
                                        
                                        <div className="input-group-append">
                                            <button className="btn-icon btn btn-transparent btn-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    </div>
                                    <h5 className="cart-item-price">$999.99</h5>
                                </div>
                            </div>
                            <div className="align-items-center media">
                                <img className="d-block rounded mr-1" src="/static/media/5.280939a5.png" alt="Apple - MacBook Air® (Latest Model) - 13.3&quot; Display - Silver" width="62" />
                                <div className="media-body">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cart-item-remove">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                    <div className="media-heading">
                                    <h6 className="cart-item-title"><a className="text-body" href="/apps/ecommerce/product/apple-mac-book-air-latest-model-13-3-display-silver-23">Apple - MacBook Air® (Latest Model) - 13.3" Display - Silver</a></h6>
                                    <small className="cart-item-by">by Apple</small>
                                    </div>
                                    <div className="cart-item-qty">
                                    <div className="number-input p-0 input-group">
                                        <div className="input-group-prepend">
                                            <button disabled="" className="btn-icon btn btn-transparent btn-sm disabled">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                </svg>
                                            </button>
                                        </div>
                                        
                                        <div className="input-group-append">
                                            <button className="btn-icon btn btn-transparent btn-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    </div>
                                    <h5 className="cart-item-price">$999.99</h5>
                                </div>
                            </div>
                            <div className="ps__rail-x">
                                <div className="ps__thumb-x" tabIndex="0"></div>
                            </div>
                            <div className="ps__rail-y">
                                <div className="ps__thumb-y" tabIndex="0"></div>
                            </div>
                        </div>
                        <li className="dropdown-menu-footer">
                            <div className="d-flex justify-content-between mb-1">
                                <h6 className="font-weight-bolder mb-0">Total:</h6>
                                <h6 className="text-primary font-weight-bolder mb-0">$3139.25</h6>
                            </div>
                            <div className="react-ripples d-block"><a className="btn btn-primary btn-block" href="/apps/ecommerce/checkout">Checkout</a><s></s></div>
                        </li>
                        </ul>
                    </li>
                    <li className="dropdown-notification nav-item mr-25 dropdown">
                        <a href="/" aria-haspopup="true" className="nav-link" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                        <span className="badge-up badge badge-danger badge-pill">5</span>
                        </a>
                        <ul tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu-media mt-0 dropdown-menu dropdown-menu-right">
                        <li className="dropdown-menu-header">
                            <div tabIndex="-1" className="d-flex dropdown-header">
                                <h4 className="notification-title mb-0 mr-auto">Notifications</h4>
                                <div className="badge badge-light-primary badge-pill">6 New</div>
                            </div>
                        </li>
                        <li className="scrollbar-container media-list scrollable-container ps">
                            <a className="d-flex" href="/">
                                <div className="d-flex align-items-start media">
                                    <div className="media-left">
                                    <div className="avatar"><img className="" src="/static/media/avatar-s-15.37a99cd4.jpg" alt="avatarImg" height="32" width="32" /></div>
                                    </div>
                                    <div className="media-body">
                                    <p className="media-heading"><span className="font-weight-bolder">Congratulation Sam 🎉</span>winner!</p>
                                    <small className="notification-text">Won the monthly best seller badge.</small>
                                    </div>
                                </div>
                            </a>
                            <a className="d-flex" href="/">
                                <div className="d-flex align-items-start media">
                                    <div className="media-left">
                                    <div className="avatar"><img className="" src="/static/media/avatar-s-3.c1d416e5.jpg" alt="avatarImg" height="32" width="32" /></div>
                                    </div>
                                    <div className="media-body">
                                    <p className="media-heading"><span className="font-weight-bolder">New message</span>&nbsp;received</p>
                                    <small className="notification-text">You have 10 unread messages.</small>
                                    </div>
                                </div>
                            </a>
                            <a className="d-flex" href="/">
                                <div className="d-flex align-items-start media">
                                    <div className="media-left">
                                    <div className="avatar bg-light-danger"><span className="avatar-content">MD</span></div>
                                    </div>
                                    <div className="media-body">
                                    <p className="media-heading"><span className="font-weight-bolder">Revised Order 👋</span>&nbsp;checkout</p>
                                    <small className="notification-text">MD Inc. order updated</small>
                                    </div>
                                </div>
                            </a>
                            
                            <a className="d-flex" href="/">
                                <div className="d-flex align-items-start media">
                                    <div className="media-left">
                                    <div className="avatar bg-light-danger">
                                        <span className="avatar-content">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </span>
                                    </div>
                                    </div>
                                    <div className="media-body">
                                    <p className="media-heading"><span className="font-weight-bolder">Server down</span>&nbsp;registered</p>
                                    <small className="notification-text">USA Server is down due to hight CPU usage</small>
                                    </div>
                                </div>
                            </a>
                            <a className="d-flex" href="/">
                                <div className="d-flex align-items-start media">
                                    <div className="media-left">
                                    <div className="avatar bg-light-success">
                                        <span className="avatar-content">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </span>
                                    </div>
                                    </div>
                                    <div className="media-body">
                                    <p className="media-heading"><span className="font-weight-bolder">Sales report</span>&nbsp;generated</p>
                                    <small className="notification-text">Last month sales report generated</small>
                                    </div>
                                </div>
                            </a>
                            <a className="d-flex" href="/">
                                <div className="d-flex align-items-start media">
                                    <div className="media-left">
                                    <div className="avatar bg-light-warning">
                                        <span className="avatar-content">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                            </svg>
                                        </span>
                                    </div>
                                    </div>
                                    <div className="media-body">
                                    <p className="media-heading"><span className="font-weight-bolder">High memory</span>&nbsp;usage</p>
                                    <small className="notification-text">BLR Server using high memory</small>
                                    </div>
                                </div>
                            </a>
                            <div className="ps__rail-x">
                                <div className="ps__thumb-x" tabIndex="0"></div>
                            </div>
                            <div className="ps__rail-y">
                                <div className="ps__thumb-y" tabIndex="0"></div>
                            </div>
                        </li>
                        <li className="dropdown-menu-footer">
                            <div className="react-ripples d-block"><button className="btn btn-primary btn-block">Read all notifications</button><s></s></div>
                        </li>
                        </ul>
                    </li>
                    <li className="dropdown-user nav-item dropdown">
                        <a href="/" aria-haspopup="true" className="nav-link dropdown-user-link" aria-expanded="false">
                        <div className="user-nav d-sm-flex d-none"><span className="user-name font-weight-bold">johndoe</span><span className="user-status">admin</span></div>
                        <div className="avatar"><img className="" src="/static/media/avatar-s-11.1d46cc62.jpg" alt="avatarImg" height="40" width="40" /><span className="avatar-status-online"></span></div>
                        </a>
                        <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
                        <a tabIndex="0" role="menuitem" className="dropdown-item" href="/pages/profile">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-75">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <span className="align-middle">Profile</span>
                        </a>
                        <a tabIndex="0" role="menuitem" className="dropdown-item" href="/apps/email">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-75">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <span className="align-middle">Inbox</span>
                        </a>
                        <a tabIndex="0" role="menuitem" className="dropdown-item" href="/apps/todo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-75">
                                <polyline points="9 11 12 14 22 4"></polyline>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                            </svg>
                            <span className="align-middle">Tasks</span>
                        </a>
                        <a tabIndex="0" role="menuitem" className="dropdown-item" href="/apps/chat">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-75">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <span className="align-middle">Chats</span>
                        </a>
                        <div tabIndex="-1" className="dropdown-divider"></div>
                        <a tabIndex="0" role="menuitem" className="dropdown-item" href="/pages/account-settings">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-75">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                            </svg>
                            <span className="align-middle">Settings</span>
                        </a>
                        <a tabIndex="0" role="menuitem" className="dropdown-item" href="/pages/pricing">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-75">
                                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                <line x1="1" y1="10" x2="23" y2="10"></line>
                            </svg>
                            <span className="align-middle">Pricing</span>
                        </a>
                        <a tabIndex="0" role="menuitem" className="dropdown-item" href="/pages/faq">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-75">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                            <span className="align-middle">FAQ</span>
                        </a>
                        <a tabIndex="0" role="menuitem" className="dropdown-item" href="/login">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-75">
                                <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                                <line x1="12" y1="2" x2="12" y2="12"></line>
                            </svg>
                            <span className="align-middle">Logout</span>
                        </a>
                        </div>
                    </li>
                </ul>
            </div>
            </nav>
        </div>
    )
}

export default TopNavBar;