import React from 'react';
import axios from 'axios'
import '../user-form.css';

const logo = 'https://media.moddb.com/images/articles/1/147/146977/Care_Package_HUD_icon_MW3.png'
let timeoutID;

const params = window.location.search;
const id = new URLSearchParams(params).get('id');

const errorTimeout = ()=>{
    timeoutID = setTimeout(() => {
      document.querySelector('.submit').classList.remove('removed')
      document.querySelector('.form-alert').style.display = 'none'
    }, 3000)
  }
  
const successTimeout = ()=>{
    timeoutID = setTimeout(() => {
        window.location = '/login'
    }, 3000)
}

const register = async (email, password, newPassword) =>{
    clearTimeout(timeoutID);
    document.querySelector('.form-alert').style.display = 'none'
    document.querySelector('.submit').classList.add('removed')
    document.querySelector('.loader').classList.remove('removed')
    try {
        const { data } = await axios.patch(`https://droppers-node.herokuapp.com/api/v1/validate/employee/${id}`, {
            email,
            password,
            newPassword
      })
      if(!data.success)
      {
        throw data
      }
      document.querySelector('.form-alert').style.display = 'block'
      document.querySelector('.form-alert').innerHTML = 'Password reset!'
      document.querySelector('.form-alert').style.color = "white";
      successTimeout()
      
    } catch (error) {
      console.error(error)
      document.querySelector('.form-alert').style.display = 'block'
      document.querySelector('.form-alert').innerHTML = error;
      document.querySelector('.form-alert').classList.add('submit-fail');
      errorTimeout()
    }
    document.querySelector('.loader').classList.add('removed')
}

export default class UserForm extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        user: {
          email: props.email,
          password: props.password,
          newPassword: props.newPassword,
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
        register(this.state.email, this.state.password, this.state.newPassword);
        event.preventDefault();
    }

      render(){
        return (
          <div className = "background">
              <div className = "user-form">
                  <form onSubmit={this.handleSubmit}>
                      <img alt = "logo" className = "logo" src={logo} />
                      <h1 > Employee Registration</h1>
                      <div className="form-control-internal">
                          <label>Email</label>
                          <input type="text" name="email" value={this.state.user.email} onChange={this.handleChange}/>
                      </div>
                      <div className="form-control-internal">
                          <label>Password</label>
                          <input type="password" name="password" value={this.state.user.password} onChange={this.handleChange}/>
                      </div>
                      <div className="form-control-internal">
                          <label>New Password</label>
                          <input type="newPassword" name="newPassword" value={this.state.user.newPassword} onChange={this.handleChange}/>
                      </div>
                      <button type = "submit" className = "submit">Submit</button>
                      <div className = "loader removed"></div>
                      <div className = "form-alert"></div>
                  </form>
              </div>
          </div>
        );
      }
}
