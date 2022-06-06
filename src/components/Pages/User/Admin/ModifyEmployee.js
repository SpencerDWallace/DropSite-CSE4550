import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select'
import axios from 'axios'
import '../user-form.css';

// const url = window.location.protocol + '' + window.location.host + '/validate/employee';
const logo = 'https://media.moddb.com/images/articles/1/147/146977/Care_Package_HUD_icon_MW3.png';
let timeoutID;

const messageTimeout = ()=>{
  timeoutID = setTimeout(() => {
    document.querySelector('.form-alert').style.display = 'none'
  }, 3000)
}

const modify = async (action, email, newEmail, roleAuth) =>{
  clearTimeout(timeoutID);
  document.querySelector('.form-alert').style.display = 'none'
  document.querySelector('.submit').classList.add('removed')
  document.querySelector('.loader').classList.remove('removed')
  let token = localStorage.getItem('token');
  if(token){
    try {
      let role = 0;
      if(action === 'changeRole'){
            console.log(roleAuth)
            switch(roleAuth){
                case 'employee': role = 1;
                break;
                case 'admin': role = 2;
                break;
                default: throw 'Invalid role';
            }
        }
        const { data } = await axios.patch(`https://droppers-node.herokuapp.com/api/v1/admin/modify`, { 
          //body
            action,
            email,
            newEmail,
            role, 
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
          document.querySelector('.form-alert').innerHTML = data.msg;
        }

    } catch (error) {
        console.error(error)
        document.querySelector('.form-alert').style.display = 'block'
        document.querySelector('.form-alert').innerHTML = error.msg
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
  
function ModifyEmployee(){

    const [role, setRole] = useState('none');
    const [employee, setEmployee] = useState('none');
    const [action, setAction] = useState('none');
    const [changeEmail, setChangeEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        fetchEmployees()
    }, [])

    const fetchEmployees = async () =>{
        let token = localStorage.getItem('token');
        if(token){
          try {
                let {data} = await axios.get(`https://droppers-node.herokuapp.com/api/v1/admin/employees`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                })
                console.log(data)
                if(data.employees && data.employees.length > 0)
                {
                    let dataEmployees = [{value:'none', label:'None'}];
                    for (let i = 0; i < data.employees.length; i++) {
                        const value = {value:data.employees[i], label:data.employees[i]};
                        dataEmployees.push(value)
                    }
                    setEmployees(dataEmployees);
                }
            } 
            catch (error) {
                console.log(error);
            }
        }
    }

    const roles = [
        { value: 'employee', label: 'Employee' },
        { value: 'admin', label: 'Admin' },
      ];

    const actions = [
        { value: 'none', label: 'None' },
        { value: 'changeRole', label: 'Change Role' },
        { value: 'delete', label: 'Delete' },
        { value: 'changeEmail', label: 'Change Email' },
      ];

    const handleSelectEmp = (option) =>{
        setEmployee(option.value);
        console.log(employee);
    }

    const handleSelectAction = (option) =>{
        setAction(option.value);
        if(option.value === 'changeRole')
        {
            document.querySelector('#changeRole').classList.remove('removed');
            document.querySelector('#changeEmail').classList.add('removed');
            document.querySelector('#confirmEmail').classList.add('hidden');
        }
        else if(option.value === 'changeEmail')
        {
            document.querySelector('#changeRole').classList.add('removed');
            document.querySelector('#changeEmail').classList.remove('removed');
            document.querySelector('#changeEmail').classList.remove('hidden');
            document.querySelector('#confirmEmail').classList.remove('hidden');
        }
        else{
            document.querySelector('#changeRole').classList.add('removed');
            document.querySelector('#changeEmail').classList.add('hidden');
            document.querySelector('#confirmEmail').classList.add('hidden');
        }
        console.log(employee);
    }

    const handleSelectAuth = (option) =>{
        setRole(option.value);
        console.log(role);
    }

    const handleSubmit = (event)=>{
        if(action !== 'none' && confirmEmail === changeEmail)
            modify(action, employee, changeEmail, role)

        console.log(role);
        console.log(employee);
        event.preventDefault();
    }

    const handleEmailChange = (event)=>{
        setChangeEmail(event.target.value);
        if(confirmEmail === event.target.value)
        {
            document.querySelector('#confirm').classList.remove('input-bad')
            document.querySelector('#confirm').classList.add('input-good')
        }
        else
        {
            document.querySelector('#confirm').classList.add('input-bad')
            document.querySelector('#confirm').classList.remove('input-good')
        }
        console.log(event.target.value)
        event.preventDefault();
    }

    const handleConfirmChange = (event)=>{
        setConfirmEmail(event.target.value);
        if(changeEmail === event.target.value)
        {
            document.querySelector('#confirm').classList.remove('input-bad')
            document.querySelector('#confirm').classList.add('input-good')
        }
        else
        {
            document.querySelector('#confirm').classList.add('input-bad')
            document.querySelector('#confirm').classList.remove('input-good')
        }
        event.preventDefault();
    }

    return (
        <div className = "background">
            <div className = "user-form">
                <form onSubmit={handleSubmit}>
                    <img alt = "logo" className = "logo" src={logo} />
                    <div className="form-control-internal">
                        <label>Employee</label>
                        <Select defaultValue={{ value: 'none', label: 'None' }} className="select" id="emp-select" options={employees} onChange={handleSelectEmp}/>

                    </div>
                    <div className="form-control-internal">
                        <label>Action</label>
                        <Select value={roles.value} defaultValue={{ value: 'none', label: 'None' }} className="select" id="auth-select" options={actions} onChange={handleSelectAction}/>
                    </div>
                    <div id="changeRole" className="form-control-internal removed">
                        <label>Authorization</label>
                        <Select value={roles.value} defaultValue={{ value: 'none', label: 'None' }} className="select" id="auth-select" options={roles} onChange={handleSelectAuth}/>
                    </div>

                    <div id="changeEmail" className="form-control-internal hidden">
                          <label>Change Email</label>
                          <input autoComplete = "off" type="text" name="changeEmail" value={changeEmail} onChange={handleEmailChange}/>
                      </div>
                      <div id="confirmEmail" className="form-control-internal hidden">
                          <label>Confirm Email</label>
                          <input id = "confirm" autoComplete = "off" type="text" name="confirmEmail" value={confirmEmail} onChange={handleConfirmChange}/>
                    </div>

                    <button type = "submit" className = "submit">Submit</button>
                    <div className = "loader removed"></div>
                    <div className = "form-alert"></div>
                    <div className = "alt-route">
                        <Link to={"/admin/create-employee"}> Create New Employee </Link>
                    </div>
                </form>
            </div>
        </div>
    );
    }

    export default ModifyEmployee;