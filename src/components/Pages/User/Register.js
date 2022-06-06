import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import './user-form.css';

const logo = 'https://media.moddb.com/images/articles/1/147/146977/Care_Package_HUD_icon_MW3.png'
let timeoutID;

const messageTimeout = ()=>{
  timeoutID = setTimeout(() => {
    document.querySelector('.form-alert').style.display = 'none'
  }, 3000)
}

const register = async (email, password) =>{
    clearTimeout(timeoutID);
    document.querySelector('.form-alert').style.display = 'none'
    document.querySelector('.submit').classList.add('removed')
    document.querySelector('.loader').classList.remove('removed')
    try {
        const { data } = await axios.post(`https://droppers-node.herokuapp.com/api/v1/auth/register`, {
        email,
        password
        })
        console.log(data)
        if(!data.token)
        {
        throw data
        }
        localStorage.setItem('token', data.token)
        let token = localStorage.getItem('token')
        if(token !== 'undefined'){
        window.location = "/store";
        }
        else{
        localStorage.removeItem('token')
        }

    } catch (error) {
        console.error(error)
        document.querySelector('.form-alert').style.display = 'block'
        document.querySelector('.form-alert').innerHTML = error
        document.querySelector('.form-alert').classList.add('submit-fail');
    }
    document.querySelector('.submit').classList.remove('removed')
    document.querySelector('.loader').classList.add('removed')
    messageTimeout();
}

export default class UserForm extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        user: {
          email: props.email,
          password: props.password,
          status: props.status
        }
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit(event) {
        register(this.state.email, this.state.password);
        event.preventDefault();
      }

      render(){
        return (
          <div className = "background">
              <div className = "user-form">
                  <form onSubmit={this.handleSubmit}>
                      <img alt = "logo" className = "logo" src={logo} />
                      <h1 > Sign Up </h1>
                      <div className="form-control-internal">
                          <label>Email</label>
                          <input type="text" name="email" value={this.state.user.email} onChange={this.handleChange}/>
                      </div>
                      <div className="form-control-internal">
                          <label>Password</label>
                          <input type="password" name="password" value={this.state.user.password} onChange={this.handleChange}/>
                      </div>
                      <button type = "submit" className = "submit">Submit</button>
                      <div className = "loader removed"></div>
                      <div className = "form-alert"></div>
                      <div className = "alt-route">
                      <Link to={"/login"}> Already Have an Account? </Link>
                      </div>
                  </form>
              </div>
          </div>
        );
      }
}
