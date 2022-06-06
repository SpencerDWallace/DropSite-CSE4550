import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import './user-form.css';

const url = window.location.protocol + '' + window.location.host + '/reset'
const logo = 'https://media.moddb.com/images/articles/1/147/146977/Care_Package_HUD_icon_MW3.png'
let timeoutID;

const messageTimeout = ()=>{
  timeoutID = setTimeout(() => {
    document.querySelector('.form-alert').style.display = 'none'
    document.querySelector('.submit').classList.remove('removed')
  }, 3000)
}
const forgot = async (email) =>{
    clearTimeout(timeoutID);
    document.querySelector('.form-alert').style.display = 'none'
    document.querySelector('.submit').classList.add('removed')
    document.querySelector('.loader').classList.remove('removed')

        try {
          const { data } = await axios.post(`https://droppers-node.herokuapp.com/api/v1/auth/forgot`, {
            email,
            url,
          })
      
          if(!data.reset)
          {
            throw data
          }
          document.querySelector('.form-alert').style.display = 'block'
          document.querySelector('.form-alert').innerHTML = 'An email has been sent.'
          document.querySelector('.form-alert').classList.add('submit-success');
          document.querySelector('.form-alert').classList.remove('submit-fail');
          
        } catch (error) {
          console.error(error)
          document.querySelector('.form-alert').style.display = 'block'
          document.querySelector('.form-alert').innerHTML = error
          document.querySelector('.form-alert').classList.remove('submit-success');
          document.querySelector('.form-alert').classList.add('submit-fail');
        }
        document.querySelector('.loader').classList.add('removed')
        messageTimeout();
}

export default class UserForm extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        user: {
          email: props.email,
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
      forgot(this.state.email);
        event.preventDefault();
      }

      render(){
        return (
            <div className = "background">
              <div className = "user-form">
                  <form className ="forgot" onSubmit={this.handleSubmit}>
                      <img alt = "logo" className = "logo" src={logo} />
                      <h1 > Forgot Password </h1>
                      <div className="form-control-internal">
                          <label>Email</label>
                          <input type="text" name="email" value={this.state.user.email} onChange={this.handleChange}/>
                      </div>
                      <button type = "submit" className = "submit">Submit</button>
                      <div className = "loader removed"></div>
                      <div className = "form-alert"></div>
                      <div className = "alt-route">
                      <Link to={"/login"}> Return to login </Link>
                      </div>
                  </form>
              </div>
          </div>
        );
      }
}
