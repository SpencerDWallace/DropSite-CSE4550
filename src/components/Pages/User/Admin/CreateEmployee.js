import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import '../user-form.css';

const url = window.location.protocol + '' + window.location.host + '/validate/employee';
const logo = 'https://media.moddb.com/images/articles/1/147/146977/Care_Package_HUD_icon_MW3.png';
let timeoutID;

const messageTimeout = ()=>{
  timeoutID = setTimeout(() => {
    document.querySelector('.form-alert').style.display = 'none'
  }, 3000)
}

const create = async (email, roleAuth) =>{
  clearTimeout(timeoutID);
  document.querySelector('.form-alert').style.display = 'none'
  document.querySelector('.submit').classList.add('removed')
  document.querySelector('.loader').classList.remove('removed')
  let token = localStorage.getItem('token');
  if(token){
    try {
      let role;
      console.log(roleAuth)
      switch(roleAuth){
        case 'employee': role = 1;
        break;
        case 'admin': role = 2;
        break;
        default: throw 'Invalid role';
      }
        const { data } = await axios.post(`https://droppers-node.herokuapp.com/api/v1/admin/register`, { 
          //body
            email,
            role, 
            url
          },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            }
        })
        console.log(data)
        if(!data.success)
        {
          throw data
        }
        else{
          document.querySelector('.form-alert').style.display = 'block'
          document.querySelector('.form-alert').classList.remove('submit-fail');
          document.querySelector('.form-alert').classList.add('submit-success');
          document.querySelector('.form-alert').innerHTML = 'An email has been sent.'
        }

    } catch (error) {
        console.error(error)
        document.querySelector('.form-alert').style.display = 'block'
        document.querySelector('.form-alert').innerHTML = error
        document.querySelector('.form-alert').classList.remove('submit-success');
        document.querySelector('.form-alert').classList.add('submit-fail');
    }
  }
  else
  {
    document.querySelector('.form-alert').style.display = 'block'
    document.querySelector('.form-alert').innerHTML = 'Invalid Credentials.'
    document.querySelector('.form-alert').classList.remove('submit-success');
    document.querySelector('.form-alert').classList.add('submit-fail');
  }
  document.querySelector('.submit').classList.remove('removed')
  document.querySelector('.loader').classList.add('removed')
  messageTimeout();
}

const validateEmails = (email, confirm)=>{
  if(email === confirm)
    return true;
  return false;
}

export default class UserForm extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        user: {
          email: props.email,
          emailC: props.emailC,
          role: props.role,
          status: props.status
        }
      };
      this.state.role = 'employee'
      this.handleEmail = this.handleEmail.bind(this);
      this.handleConfirm = this.handleConfirm.bind(this);
      this.handleSelect = this.handleSelect.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onFocus = this.onFocus.bind(this);
    }

    onFocus(event){
      if(event.target.autocomplete)
        event.target.autocomplete = "off";
    }

    handleEmail(event) {
      this.setState({[event.target.name]:event.target.value});
      if(this.state.emailC === event.target.value)
      {
        document.querySelector('#confirm').classList.remove('input-bad')
        document.querySelector('#confirm').classList.add('input-good')
      }
      else{
        document.querySelector('#confirm').classList.add('input-bad')
        document.querySelector('#confirm').classList.remove('input-good')
      }
    }

    handleConfirm(event){
      this.setState({[event.target.name]:event.target.value});
      if(this.state.email === event.target.value)
      {
        document.querySelector('#confirm').classList.remove('input-bad')
        document.querySelector('#confirm').classList.add('input-good')
      }
      else{
        document.querySelector('#confirm').classList.add('input-bad')
        document.querySelector('#confirm').classList.remove('input-good')
      }
    }

    handleSelect(event){
      this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit(event) {
      if(validateEmails(this.state.email, this.state.emailC))
        create(this.state.email, this.state.role);
        else{
          document.querySelector('.form-alert').style.display = 'block'
          document.querySelector('.form-alert').innerHTML = 'Emails must match.'
          document.querySelector('.form-alert').classList.remove('submit-success');
          document.querySelector('.form-alert').classList.add('submit-fail');
        }
      event.preventDefault();
    }

      render(){
        return (
          <div className = "background">
              <div className = "user-form">
                  <form onSubmit={this.handleSubmit}>
                      <img alt = "logo" className = "logo" src={logo} />
                      <h1 > Create Employee </h1>
                      <div className="form-control-internal">
                          <label>Email</label>
                          <input autoComplete = "off" type="text" name="email" value={this.state.user.email} onChange={this.handleEmail} onFocus={this.onFocus}/>
                      </div>
                      <div className="form-control-internal">
                          <label>Confirm Email</label>
                          <input id = "confirm" autoComplete = "off" type="text" name="emailC" value={this.state.user.emailC} onChange={this.handleConfirm} onFocus={this.onFocus}/>
                      </div>
                      <div className="form-control-internal">
                          <label>Authorization</label>
                          <select name="role" value={this.state.user.role} onChange={this.handleSelect}>
                            <option value="employee">Employee</option>
                            <option value="admin">Admin</option>
                          </select>
                      </div>
                      <button type = "submit" className = "submit">Submit</button>
                      <div className = "loader removed"></div>
                      <div className = "form-alert"></div>
                      <div className = "alt-route">
                      <Link to={"/admin/modify-employee"}> Modify Existing Employee </Link>
                      </div>
                  </form>
              </div>
          </div>
        );
      }
}
