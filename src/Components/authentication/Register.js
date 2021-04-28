import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { AvForm, AvInput, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation-safe'
import classnames from 'classnames';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import {
  Row,
  Col,
  FormGroup,
  Label,
  Button,
} from 'reactstrap'

import '../../assets/css/page-auth.css';

const Register = props => {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [terms, setTerms] = useState(false)
  const [registerStatus, setRegisterStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const illustration = 'register-v2-dark.svg'
  const source = require(`../../assets/imgs/${illustration}`).default

  const handleValidSubmit = (event, values) => {
  //const registration = () => {
    setLoading(true)
    //const { history } = this.props;
    axios.post("http://localhost:4000/register", {
      name: name,
      email: email,
      password: password,
      code: Math.random().toString(24).substring(4),
      status: 1,
      date_created: Math.floor(Date.now()/1000)
    }).then(function (response) {
      //console.log(JSON.stringify(response.data));
      if(response.data.success === 'Successfully Registered!'){
        setRegisterStatus(response.data.success);
        //history.push('/login') 
        //return <Redirect to='/login' />
        setLoading(false)
        window.location.href="/login"
      }else{
        setRegisterStatus(response.data);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const Terms = () => {
    return (
      <Fragment>
        I agree to
        <a className='ml-25' href='/' onClick={e => e.preventDefault()}>
          privacy policy & terms
        </a>
      </Fragment>
    )
  }

  const handleNameChange = e => {
    const errs = errors
    if (errs.name) delete errs.name
    setName(e.target.value)
    setErrors(errs)
  }

  const handleEmailChange = e => {
    const errs = errors
    if (errs.email) delete errs.email
    setEmail(e.target.value)
    setErrors(errs)
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <h2 className="brand-text text-primary ml-1" style={{ fontSize: "1rem" }}>Triple Negative Breast<br />Cancer Registry</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Triple Negative Breast Cancer Registry' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            
            <AvForm className='auth-register-form mt-2' onValidSubmit={handleValidSubmit}>
            <div role="alert" aria-live="polite" aria-atomic="true" className="alert alert-primary">
              <div className={classnames({'alert-body font-small-2': registerStatus})}>
                {registerStatus}
              </div>
            </div>
              <FormGroup>
                <Label className='form-label' for='register-username'>
                  Institution Name
                </Label>
                <AvInput
                  required
                  autoFocus
                  type='text'
                  placeholder='Enter Institution name'
                  id='register-username'
                  name='register-username'
                  value={name}
                  onChange={handleNameChange}
                  className={classnames({ 'border-danger': Object.keys(errors).length && errors.name })}
                />
                {Object.keys(errors).length && errors.name ? (
                  <small className='text-danger'>{errors.name}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-email'>
                  Email
                </Label>
                <AvInput
                  required
                  type='email'
                  id='register-email'
                  name='register-email'
                  value={email}
                  placeholder='Enter your email ID'
                  onChange={handleEmailChange}
                  className={classnames({ 'border-danger': Object.keys(errors).length && errors.email })}
                />
                {Object.keys(errors).length && errors.email ? (
                  <small className='text-danger'>{errors.email}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-password'>
                  Password
                </Label>
                <AvInput
                  required
                  tag={AvInput}
                  id='register-password'
                  name='register-password'
                  value={password}
                  type="password"
                  placeholder="Enter your password"
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                />
              </FormGroup>
              <AvCheckboxGroup name='Remember Me' checked={terms} required>
                <AvCheckbox
                  customInput
                  type='checkbox'
                  id='remember-me'
                  value='Remember Me'
                  label={<Terms />}
                  className='custom-control-Primary'
                  onChange={e => setTerms(e.target.checked)}
                />
              </AvCheckboxGroup>
              <Button color='primary' block disabled={loading}>
                {loading && (<svg width="30px" height="30px" viewBox="0 0 40 40" enable-background="new 0 0 40 40">
                  <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                  <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                    C22.32,8.481,24.301,9.057,26.013,10.047z">
                    <animateTransform attributeType="xml"
                      attributeName="transform"
                      type="rotate"
                      from="0 20 20"
                      to="360 20 20"
                      dur="0.5s"
                      repeatCount="indefinite"/>
                    </path>
                  </svg>)}
                {loading && <span> Please wait...</span>}
                {!loading && <span>Register</span>}
              </Button>
            </AvForm>
            <p className='text-center mt-2'>
              <Link to='/login'>
                <span className='mr-25' style={{ color: 'white'}}>Already have an account?</span>
                <span style={{ color: 'white'}}>Sign in instead</span>
              </Link>
            </p>
                        
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default withRouter(Register)
