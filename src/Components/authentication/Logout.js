import React, { PureComponent } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router'

import '../../assets/css/page-auth.css';

//const Login = (props) => {  
class Logout extends PureComponent {
  constructor(props){
    super(props);
    this.state = {      
      loginStatus: '',
      email: '',
      password: '',
      loginInfo: "user_not_logged_in",      
    }
  }
  
  login = e => {
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
        history.push('/')                
      }else{
        this.setState({
          loginStatus: response.data.failed
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
    const { history } = this.props;
    const user = this.getUser();    
    if(user === "null" || user === null || user === '' || user === undefined){
      //return <Redirect from="*" to='/login'></Redirect>
      history.push('/login')
    }else{
      //return <Redirect from="*" to='/login'></Redirect>
      localStorage.removeItem("token")
      localStorage.removeItem("users")
      history.push('/')
    }
  return (        
    <></>
  )
}
}

export default withRouter(Logout);
