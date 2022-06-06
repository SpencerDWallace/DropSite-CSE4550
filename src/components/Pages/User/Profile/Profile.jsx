import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../item.css'
import './profile.css'
import Orders from '../Orders/Orders'


const Profile = ({user, getOrdersWithParams, isOrderById, updateUser, setUser}) => {
  const[modify, setModify] = useState(false);
  const[firstName, setFirstName] = useState('');
  const[lastName, setLastName] = useState('');
  const[email, setEmail] = useState('');


  const[detailsView, setDetailsView] = useState(<AccountDetailsView/>)
    useEffect(() => {
      if(user.success){
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);   
      (modify) ? setDetailsView(<AccountDetailsModify/>) : setDetailsView(<AccountDetailsView/>)  
      }
    }, [user]);

    useEffect(() => {
      // console.log('modify!!');
      (modify) ? setDetailsView(<AccountDetailsModify/>) : setDetailsView(<AccountDetailsView/>)  
    }, [modify]);

    const handleAccountDetailsEdit = () =>{
      setModify(prev => !prev);
    }

    const handleAccountDetailsCancel = () =>{
      setModify(prev => !prev);   
    }

    const handleAccountDetailsSave = async() =>{
      // console.log('first name is: ' + firstName)
      // console.log('last name is: ' + lastName)
      // console.log('email is: ' + email)

      const body = {"first":firstName, "last":lastName, "email":email}
      await updateUser(body)
      .then((user)=>{
        console.log(user)
        if(user.success)
          setUser(user);
          console.log(user.msg);
      })
      .catch((err)=>{
          console.log(user.msg);
      })
      setModify(prev => !prev);   
    }

    const handleEmailChange = (event)=>{
      setEmail(event.target.value);
      console.log(event.target.value)
      event.preventDefault();
    }

    const handleFirstNameChange = (event)=>{
      setFirstName(event.target.value);
      console.log(event.target.value)
      event.preventDefault();
    }

    const handleLastNameChange = (event)=>{
      setLastName(event.target.value);
      console.log(event.target.value)
      event.preventDefault();
    }

    function AccountDetailsView()
    {
      return(
        <>
          <div className="field-formatter">
            <label>First Name</label>
            <h6> {user.firstName} </h6>
          </div>
          <div className="field-formatter">
            <label>Last Name</label>
            <h6> {user.lastName}</h6>
          </div>
          <div className="field-formatter">
            <label>Email</label>
            <h6> {user.email} </h6>
          </div></>
      )
    }

    function AccountDetailsModify()
    {
      return(
        <>
          <div className="field-formatter">
            <label>First Name</label>
            <input type="text" defaultValue={firstName} onChange={handleFirstNameChange}/>
          </div>
          <div className="field-formatter">
            <label>Last Name</label>
            <input type="text" defaultValue={lastName} onChange={handleLastNameChange}/>
          </div>
          <div className="field-formatter">
            <label>Email</label>
            <input type="text" defaultValue={email} onChange={handleEmailChange}/>
          </div></>
      )
    }

  return (
    <>
    {user.isLoggedIn === false &&
      <div className='redirect-container'>
      <div className='redirect'>
      <Link to='/register' className='redirect-a'>You do not have an account, consider signing up!</Link>
          <div className='redirect-options'>
              <Link className='option' to='/store'> Store </Link>
              <Link className='option' to='/register'> Sign Up </Link>
          </div>
      </div>                
  </div>
    }
    {user.isLoggedIn &&
    <div className="profile-container">
        <div className='profile-form'>
        <Orders user={user} getOrdersWithParams={getOrdersWithParams} isOrderById={isOrderById}/>
          <div className="profile-details">
            <h1>Account Details</h1>
            {detailsView}
            <div className="profile-modify-container">
              {!modify && 
                <>
                  <button id="save" className="profile-button" onClick={handleAccountDetailsEdit}> Edit </button>
                </>
              }
              {modify &&
              <>
                  <button id="save" className="profile-button" onClick={handleAccountDetailsSave} > Save Changes </button>
                  <button id="cancel" className="profile-button" onClick={handleAccountDetailsCancel}> Cancel </button>
              </>
              }
            </div>
          </div>
        </div>
    </div>
    }
    </>
  );
}

export default Profile;
