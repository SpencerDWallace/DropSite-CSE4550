import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

function Homepage() {
  return (
  <>
  <div className='homepage-container'>
    <header>
      <Link to={"/"} > <img src="/logo192.png"  class ="logo" alt='logo'/> </Link>
      <div className='homepage-header-links'>
        <Link to={"/"} class="active">HOME</Link>
        <a href="#sec"> What is Droppers ?</a>
        <Link to={"/store"}>Store</Link>
        <Link to={"/contact"}>Contact Us</Link>
        <Link to={"/faq"}>FAQ</Link>
      </div>
    </header>
    <section class ="homepage-section">
      <div class ="homepage-section-container">
        <img src="/logo192.png"  id="logo" alt='logo'/>
        <h2 id="text"> Droppers</h2>
        <Link to={"/login"} id="btn">Sign in</Link>      
      </div>
    </section>
    <div class="sec" id="sec">
      <h2>The global standard of checkout</h2>
      <p>  Droppers is the culmination of months of hard work creating the next generation of automated checkout software, designed to make your retail more effective. Droppers has over 1000 people who requested access a visit in the last 24 hours.
        However, This is only the beginning for Droppers , as we continue to modify the site to the genral public. We will continue to make adjustments to our store. For more information click  the FAQ. </p>
      <Link to={"/about"} className='homepage-button'>More</Link>
    </div>
    </div>
  </>

  );
}

export default Homepage;
