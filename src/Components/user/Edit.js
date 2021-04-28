import React, { useState, Fragment, useEffect } from 'react';
import DashboardSideBar from '../sidebar/DashboardSideBar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

import '../../Components/mainstyle.css'
import '../../Components/animate.css';
import '../../Components/vertical-menu.css';
import '../../Components/perfect-scrollbar.css';

import { Card, CardHeader, CardTitle, CardBody, Label, Button, Row, Col } from 'reactstrap'
import { AvForm, AvGroup, AvInput, AvFeedback, AvCheckboxGroup, AvCheckbox} from 'availity-reactstrap-validation-safe'
import { Redirect, useHistory, useParams } from 'react-router';
  
    
      const Edit = () => {
        const { id } = useParams();
        //console.log(id);
        let history = useHistory();
        const [errors, setErrors] = useState({})      
        const [check, setCheck] = useState(false);
        const [startDate, setStartDate] = useState(new Date());        
        const [users, setUser] = useState({
          login_name: "", country: "", centre: "", userrole: "", timezone: "", culture: "", acc_dis: "", pass_never: "", must_change: "", cant_change: "", title: "", first_name: "", last_name: "", email: "", street_address: "", city: "", phone_1: "", phone_2: "", fax: "", patients_dob: ""
        })
        /*const { loginname, country, centre, userrole, timezone, culture, acc_dis, pass_never, must_change, cant_change, title, firstname, lastname, email, street_address, city, phone_1, phone_2, fax, patients_dob } = users;*/

        const handleChange = (e) => {
          const errs = errors
          setUser({...users, [e.target.name]: e.target.value})          
          setErrors(errs)                              
        }

        const handleCheckboxChange = (e) => {
          setUser({...users, [e.target.name]: e.target.value})
          setCheck(!check)      
          if(check){
            e.target.value = false
          }   
          console.log(e.target.value)                   
        }

        const getUserDetails = async () => {
          await axios.get(`http://localhost:4000/getuserdetails/${id}`)
          .then(function (response) {
            //console.log(JSON.stringify(response.data));
            if(response.data){
              console.log(response.data.data[0]);
              setUser(response.data.data[0]);
            }else{
              //setUser(response.data);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        useEffect(() => {
          getUserDetails();        
        }, []);

        const getUser = () => {
            const userStr = localStorage.getItem("users");
            if(userStr) return JSON.parse(userStr);
            else return null
        } 

        const user = getUser();    
        
        if(user.userid != id && user.role != 'admin'){
          return <Redirect to={`/users/edit/${user.userid}`}></Redirect>
        }
        else if(user.userid != id && user.role != 'user'){
          return <Redirect to={`/users/edit/${user.userid}`}></Redirect>
        }else{          
        }
        
        const onSubmit = async e => {
          e.preventDefault();
          await axios.put(`http://localhost:4000/updateuser/${id}`, users);
          history.push("/users");
        };          
          
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
                    <CardTitle tag='h4'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> <span className="menu-title text-truncate">Edit User</span></CardTitle>
                  </CardHeader>
                  <CardBody>
                  
                    <AvForm  onSubmit={e => onSubmit(e)}>
                    <div className="col-md-12">
                      <div className="row">
                      <div className="col-md-6">
                        <h3>User Account</h3>
                    
                    <div className="row">
                    <div className="col-md-6">
                      <AvGroup>            
                        <Label for='login_name'>Login Name</Label>
                        <AvInput name='login_name' id='login_name' required value={users.login_name} onChange={handleChange}  />
                        <AvFeedback>Please enter Login Name!</AvFeedback>            
                      </AvGroup>
                      </div>                    
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='country'>Country</Label>
                        <AvInput name='country' id='country' value={users.country} onChange={handleChange} />
                        <AvFeedback>Please enter Country!</AvFeedback>            
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='centre'>Centre</Label>
                        <AvInput name='centre' id='centre' value={users.centre} onChange={handleChange} />
                        <AvFeedback>Please enter a Centre Name!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                        <AvGroup>
                          <Label for='user_role'>User Role</Label>
                          <AvInput type='select' name='user_role' id='user_role'required value={users.user_role} onChange={handleChange} disabled>
                            <option value="admin">admin</option>
                            <option value="user">user</option>                            
                          </AvInput>
                          <AvFeedback>Please select a User Role</AvFeedback>
                        </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='culture'>Culture</Label>
                        <AvInput name='culture' id='culture'required  value={users.culture}  onChange={handleChange} />
                        <AvFeedback>Please enter the Culture!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='timezone'>Timezone</Label>
                        <AvInput name='timezone' id='timezone'required value={users.timezone}  onChange={handleChange} />
                        <AvFeedback>Please enter the Timezone!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-12">
                      <AvCheckboxGroup name="acc_dis">
                        <AvCheckbox customInput type="checkbox" value={users.acc_dis} label='Account is Disabled' name="acc_dis" id="acc_dis"  onChange={handleCheckboxChange} />
                      </AvCheckboxGroup>
                      <AvCheckboxGroup name='pass_never'>
                        <AvCheckbox customInput type="checkbox" label='Password never expires' name='pass_never' id="pass_never"  onChange={handleCheckboxChange} value={users.pass_never} />
                      </AvCheckboxGroup>
                      <AvCheckboxGroup name='must_change'>
                        <AvCheckbox customInput type="checkbox" label='User must change password at next login' id="must_change" name='must_change' onChange={handleCheckboxChange} value={users.must_change} />
                      </AvCheckboxGroup>
                      <AvCheckboxGroup name='cant_change'>
                        <AvCheckbox customInput type="checkbox" label='User cannot change password' name='cant_change' id="cant_change"  onChange={handleCheckboxChange} value={users.cant_change} />
                      </AvCheckboxGroup>
                      </div>                                                            
                    </div>
                    
                    
                    </div>
                    <div className="col-md-6">
                        <h3>Contact Information</h3>
                    
                    <div className="row">
                    <div className="col-md-6">
                      <AvGroup>            
                        <Label for='user_title'>User Title</Label>
                        <AvInput name='user_title' id='user_title' value={users.user_title} onChange={handleChange} />
                        <AvFeedback>Please enter Title!</AvFeedback>            
                      </AvGroup>
                    </div>
                    
                    <div className="col-md-6">
                      <AvGroup>            
                        <Label for='first_name'>First Name</Label>
                        <AvInput name='first_name' id='first_name'required value={users.first_name} onChange={handleChange}/>
                        <AvFeedback>Please enter First Name!</AvFeedback>            
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='last_name'>Last Name</Label>
                        <AvInput name='last_name' id='last_name'required value={users.last_name} onChange={handleChange} />
                        <AvFeedback>Please enter Last Name!</AvFeedback>            
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='email'>Email</Label>
                        <AvInput type="email" name='email' id='email'required value={users.email} onChange={handleChange} />
                        <AvFeedback>Please enter an Email ID!</AvFeedback>            
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='street_address'>Street Address</Label>
                        <AvInput name='street_address' id='street_address' value={users.street_address} onChange={handleChange} />
                        <AvFeedback>Please enter a Street Address Name!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='city'>City</Label>
                        <AvInput name='city' id='city' value={users.city} onChange={handleChange} />
                        <AvFeedback>Please enter the City!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='phone_1'>Phone 1</Label>
                        <AvInput name='phone_1' id='phone_1' value={users.phone_1} onChange={handleChange} />
                        <AvFeedback>Please enter the Phone 1!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='phone_2'>Phone 2</Label>
                        <AvInput name='phone_2' id='phone_2' value={users.phone_2} onChange={handleChange} />
                        <AvFeedback>Please enter the Phone 2!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>            
                        <Label for='fax'>Fax</Label>
                        <AvInput name='fax' id='fax' value={users.fax} onChange={handleChange}/>
                        <AvFeedback>Please enter the Fax number!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-6">
                      <AvGroup>
                        <Label for='dob'>DOB</Label>
                        <DatePicker peekNextMonth showMonthDropdown showYearDropdown dropdownMode= "scroll" className="form-control date-picker-block" dateFormat="dd-MM-yyyy" name="dobs" id="dobs" value={startDate} selected={startDate} onChange={ date => setStartDate(date)} onMouseLeave={handleChange} />
                        
                        <AvInput name="dateofbirth" value={users.patients_dob} className="custom-date-input" id="dateofbirth" onMouseLeave={handleChange}  /> 
                        <AvFeedback>Please enter your DOB!</AvFeedback>
                      </AvGroup>
                      </div>
                      <div className="col-md-12">
                      <Button color='primary' type='submit' className="float-right">
                        Update User
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

    export default Edit;