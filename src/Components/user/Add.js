import React, { useState, Fragment } from 'react';
import DashboardSideBar from '../../Components/sidebar/DashboardSideBar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classnames from 'classnames'
import axios from 'axios';

import '../../Components/mainstyle.css'
import '../../Components/animate.css';
import '../../Components/vertical-menu.css';
import '../../Components/perfect-scrollbar.css';

import { Card, CardHeader, CardTitle, CardBody, Label, Button, Row, Col } from 'reactstrap'
import { AvForm, AvGroup, AvInput, AvFeedback, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation-safe'


  
      const Add = () => {
        const [errors, setErrors] = useState({})      
        const [check, setCheck] = useState(false);
        const [startDate, setStartDate] = useState(new Date());
        const [userStatus, setUserStatus] = useState('')
        const [user, setUser] = useState({
          loginname: "", country: "", centre: "", userrole: "", timezone: "", culture: "", accountdisabled: "", passexpires: "", nextloginpassword: "", cannotchangepassword: "", title: "", firstname: "", lastname: "", email: "", streetaddress: "", city: "", phone1: "", phone2: "", dateofbirth: "", fax: ""
        })
        const { loginname, country, centre, userrole, timezone, culture, accountdisabled, passexpires, nextloginpassword, cannotchangepassword, title, firstname, lastname, email, streetaddress, city, phone1, phone2, dateofbirth, fax } = user;

        const handleChange = (e) => {
          const errs = errors
          setUser({...user, [e.target.name]: e.target.value})          
          setErrors(errs)                    
          console.log(errs)
        }

        const handleCheckboxChange = (e) => {
          setUser({...user, [e.target.name]: e.target.value})
          setCheck(!check)         
          console.log(!check)           
        }

        const addUser = async () => {
          await axios.post("http://localhost:4000/adduser", {
            login_name: loginname, country: country, centre: centre, user_role: userrole, timezone: timezone, culture: culture, accountdisabled: accountdisabled, passexpires: passexpires, nextloginpassword: nextloginpassword, cannotchangepassword: cannotchangepassword, user_title: title, first_name: firstname, last_name: lastname, name: firstname +' '+ lastname, email: email, password: "password", street_address: streetaddress, city: city, phone_1: phone1, phone_2: phone2, fax: fax, dateofbirth: dateofbirth, code: Math.random().toString(24).substring(4), status: 1, date_created: Math.floor(Date.now()/1000)
          }).then(function (response) {
            //console.log(JSON.stringify(response.data));
            if(response.data){
              setUserStatus(response.data.success);
            }else{
              setUserStatus(response.data);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }

        
      return (
        <div>
              <DashboardSideBar   />
              <div className="content-wrapper animate__animated animate__fadeIn">
              <div className="app-content content overflow-hidden">

                <Fragment>
                
                <Row>
                <Col sm='12'>
                <Card>
                  <CardHeader>
                    <CardTitle tag='h4'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> <span className="menu-title text-truncate">Add a new User</span></CardTitle>
                  </CardHeader>
                  <CardBody>
                  <div role="alert" aria-live="polite" aria-atomic="true" className="alert alert-primary">
                  <div className={classnames({'alert-body font-small-2': userStatus})}>
                    {userStatus}
                  </div>
                </div>
                    <AvForm>
                    <div className="col-md-12">
                      <div className="row">
                      <div className="col-md-6">
                        <h3>User Account</h3>
                    
                    <div className="row">
                    <div className="col-md-6">
                      <AvGroup>            
                        <Label for='loginname'>Login Name</Label>
                        <AvInput name='loginname' id='loginname' required value={loginname} onChange={handleChange}  />
                        <AvFeedback>Please enter Login Name!</AvFeedback>            
                      </AvGroup>
                      </div>                    
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='country'>Country</Label>
                        <AvInput name='country' id='country'  onChange={handleChange} />
                        <AvFeedback>Please enter Country!</AvFeedback>            
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='centre'>Centre</Label>
                        <AvInput name='centre' id='centre'  onChange={handleChange} />
                        <AvFeedback>Please enter a Centre Name!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                        <AvGroup>
                          <Label for='userrole'>User Role</Label>
                          <AvInput type='select' name='userrole' id='userrole'required value={userrole}  onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Role 1">Role 1</option>
                            <option value="Role 2">Role 2</option>
                            <option value="Role 3">Role 3</option>
                            <option value="Role 4">Role 4</option>
                            <option value="Role 5">Role 5</option>
                          </AvInput>
                          <AvFeedback>Please select a User Role</AvFeedback>
                        </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='culture'>Culture</Label>
                        <AvInput name='culture' id='culture'required  onChange={handleChange} />
                        <AvFeedback>Please enter the Culture!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='timezone'>Timezone</Label>
                        <AvInput name='timezone' id='timezone'required  onChange={handleChange} />
                        <AvFeedback>Please enter the Timezone!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-12">
                      <AvCheckboxGroup name="accountdisabled">
                        <AvCheckbox customInput type="checkbox" value={check} label='Account is Disabled' name="accountdisabled" id="accountdisabled"  onChange={handleCheckboxChange} />
                      </AvCheckboxGroup>
                      <AvCheckboxGroup name='passexpires'>
                        <AvCheckbox customInput type="checkbox" label='Password never expires' name='passexpires' id="passexpires"  onChange={handleCheckboxChange} value={check} />
                      </AvCheckboxGroup>
                      <AvCheckboxGroup name='nextloginpassword'>
                        <AvCheckbox customInput type="checkbox" label='User must change password at next login' id="nextloginpassword" name='nextloginpassword' onChange={handleCheckboxChange} value={check} />
                      </AvCheckboxGroup>
                      <AvCheckboxGroup name='cannotchangepassword'>
                        <AvCheckbox customInput type="checkbox" label='User cannot change password' name='cannotchangepassword' id="cannotchangepassword"  onChange={handleCheckboxChange} value={check} />
                      </AvCheckboxGroup>
                      </div>                                                            
                    </div>
                    
                    
                    </div>
                    <div className="col-md-6">
                        <h3>Contact Information</h3>
                    
                    <div className="row">
                    <div className="col-md-6">
                      <AvGroup>            
                        <Label for='title'>User Title</Label>
                        <AvInput name='title' id='title'  onChange={handleChange} />
                        <AvFeedback>Please enter Title!</AvFeedback>            
                      </AvGroup>
                    </div>
                    
                    <div className="col-md-6">
                      <AvGroup>            
                        <Label for='firstname'>First Name</Label>
                        <AvInput name='firstname' id='firstname'required onChange={handleChange}/>
                        <AvFeedback>Please enter First Name!</AvFeedback>            
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='lastname'>Last Name</Label>
                        <AvInput name='lastname' id='lastname'required  onChange={handleChange} />
                        <AvFeedback>Please enter Last Name!</AvFeedback>            
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='email'>Email</Label>
                        <AvInput type="email" name='email' id='email'required  onChange={handleChange} />
                        <AvFeedback>Please enter an Email ID!</AvFeedback>            
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='streetaddress'>Street Address</Label>
                        <AvInput name='streetaddress' id='streetaddress' multiline="true"  onChange={handleChange} />
                        <AvFeedback>Please enter a Street Address Name!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='city'>City</Label>
                        <AvInput name='city' id='city'  onChange={handleChange} />
                        <AvFeedback>Please enter the City!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='phone1'>Phone 1</Label>
                        <AvInput name='phone1' id='phone1'  onChange={handleChange} />
                        <AvFeedback>Please enter the Phone 1!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='phone2'>Phone 2</Label>
                        <AvInput name='phone2' id='phone2'  onChange={handleChange} />
                        <AvFeedback>Please enter the Phone 2!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='fax'>Fax</Label>
                        <AvInput name='fax' id='fax'  onChange={handleChange} />
                        <AvFeedback>Please enter the Fax number!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>
                        <Label for='dateofbirth'>DOB</Label>
                        <DatePicker peekNextMonth showMonthDropdown showYearDropdown dropdownMode= "scroll" className="form-control" dateFormat="dd-MM-yyyy" name="dobs" id="dobs" selected={startDate} onChange={ date => setStartDate(date)} onMouseLeave={handleChange} />

                        <AvInput value={startDate.getDate()+'-'+parseInt(startDate.getMonth() + 1)+'-'+startDate.getFullYear()} name="dateofbirth" id="dateofbirth" onMouseLeave={handleChange} className="hide" />
                        <AvFeedback>Please enter your DOB!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-12">
                      <Button color='primary' type='submit' className="float-right" disabled={ !loginname.length || !firstname.length || !lastname.length || !email.length || !culture.length || !timezone.length} onClick={addUser}>
                        Add User
                      </Button>                 
                      </div> 
                    </div>
                    
                    
                    </div>
                    
                    </div>
                    </div>
                    </AvForm>
                  </CardBody>
                </Card>
                </Col>
                </Row>
                </Fragment>
                </div>
                </div>
                </div>
              
      );      
    }

    export default Add;