import React from 'react';
import emailjs from "emailjs-com";
import '../App.css';
import './User/user-form.css';

const h1Style = {
    margin: '2rem 0' 
}

//npm install emailjs-com --save

const contactUs = () => {

   function sendEmail(e) {
       e.preventDefault();

       emailjs.sendForm('default_service', 'template_phwgu6a', document.querySelector('#email-form'), 'cAvdTcNn4CpLXWQYx')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
   }

    return (
        <div className = "background">
            <div className="user-form">
                    <form id="email-form" onSubmit={sendEmail}>
                        <h1 style={h1Style}>Contact Us</h1>
                        <input type="text" id="name" name="name" placeholder="Please Enter Your Name" size="50" required></input>
                        <br></br>
                        <br></br>
                        <input type="email" id="email" name="email" placeholder="Please Enter Your Email" size="50" required></input>
                        <br></br>
                        <br></br>
                        <input type="text" id="subject" name="subject" placeholder="Please Enter the Subject of the Matter" size="50" required></input>
                        <br></br>
                        <br></br>
                        <textarea id="complaint" name="complaint" placeholder="Please Tell Us What Was Wrong" rows="4" required></textarea>
                        <br></br>
                        <br></br>
                        <button type="submit" className="submit">Send</button>
                    </form>
            </div>
        </div>
    );
}

export default contactUs;