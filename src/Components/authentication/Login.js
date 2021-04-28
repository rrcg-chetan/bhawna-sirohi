import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe'
import illustration from '../../assets/imgs/login-v2-dark.svg'
import axios from 'axios';
import { withRouter } from 'react-router'
import classnames from 'classnames';

import {
  Row,
  Col,
  CardText,
  FormGroup,
  Label,
  CustomInput,
  Button,
} from 'reactstrap'

import '../../assets/css/page-auth.css';

class Login extends PureComponent {
  constructor(props){
    super(props);
    this.state = {      
      loginStatus: '',
      email: '',
      password: '',
      loginInfo: "user_not_logged_in",    
      loading: false,  
    }
  }
  
  login = e => {
    this.setState({ loading: true });
    const { history } = this.props;
    axios.post("http://localhost:4000/login", { withCredentials: true, email: this.state.email, password: this.state.password }, {            
    })
    //.then(response => response.json)
    .then((response) => {
      //console.log(JSON.stringify(response));
      if(response.data.success === "Successfully Logged In!"){
        localStorage.setItem('token', response.data.token);
        localStorage.setItem("users", JSON.stringify(response.data.users));
        //console.log(localStorage.getItem('users'));
        this.setState({ loading: false });
        history.push('/dashboard')                
      }else{
        this.setState({
          loginStatus: response.data.failed,
          loading:false
        });
      }
    }).catch(function (error) {
      console.log(error);
    });
  };

  getUser = () => {
      const userStr = localStorage.getItem("users");
      if(userStr) return JSON.parse(userStr);
      else return null
  } 

  render(){
    const { email, password, loading} = this.state;
    const { history } = this.props;
    const user = this.getUser();    
    if(user === "null" || user === null || user === '' || user === undefined){
      //return <Redirect from="*" to='/login'></Redirect>
      //history.push('/login')
    }else{
      //return <Redirect from="*" to='/login'></Redirect>
      history.push('/')
    }
  return (        
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>        
          <h2 className="brand-text text-primary ml-1" style={{ fontSize: "1rem" }}>Triple Negative Breast<br />Cancer Registry</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={illustration} alt='Login Triple Negative Breast Cancer Registry' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>            
            <CardText className='mb-2'>Please sign-in to your account</CardText>
            <AvForm className='auth-login-form mt-2' onSubmit= {() => this.login()}>
            <div role="alert" aria-live="polite" aria-atomic="true" className="alert alert-primary">
              <div className={classnames({'alert-body font-small-2': this.state.loginStatus})}>
                {this.state.loginStatus}
              </div>
            </div>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <AvInput
                  required
                  autoFocus
                  type='email'
                  value={email}
                  id='login-email'
                  name='login-email'
                  placeholder='Enter email address'
                  onChange={e => this.setState({email: e.target.value})}
                />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='#'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>   
                <AvInput
                  required
                  tag={AvInput}
                  value={password}
                  id='login-password'
                  name='login-password'
                  type="password"
                  placeholder='Enter Password'
                  className='input-group-merge'
                  onChange={e => this.setState({password: e.target.value})}
                />             
              </FormGroup>
              <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
              </FormGroup>
              <Button color='primary' block disabled={loading} onClick={this.login}>
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
                {loading && <span> Singing In...</span>}
                {!loading && <span>Sign In</span>}
              </Button>
            </AvForm>
            <p className='text-center mt-2'>
              <Link to='/register'>
                <span className='mr-25' style={{ color: 'white'}}>New on our platform?</span>
                <span style={{ color: 'white'}}>Create an account</span>
              </Link>
            </p>
            
          </Col>
        </Col>
      </Row>
    </div>
  )
}
}

export default withRouter(Login);
