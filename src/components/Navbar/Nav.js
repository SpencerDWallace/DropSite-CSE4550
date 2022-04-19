//Navbar used for entire site besides the homepage

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signUserOut, userInfo } from '../utilites';
import { IconButton, Badge } from "@material-ui/core";
import { ShoppingCart, Favorite } from '@material-ui/icons';
import HomeNavbar from './Navbar';
// import $ from 'jquery'

// import useStyles from '../components/Navbar/styles';
import '../App.css';

import logo from '../../assets/logo.png'; //const logo = '../homepage/assets/logo.png'; //https://media.moddb.com/images/articles/1/147/146977/Care_Package_HUD_icon_MW3.png'

const navStyle = {
    color: 'white'
}

function Nav({totalItems, user}){

    // const classes = useStyles();
    const location = useLocation();
    const [userLink, setUserLinks] = useState(<Empty/>);
    const [userNavFavorite, setNavUserFavorite] = useState(<Empty/>);
    const [userSideFavorite, setSideUserFavorite] = useState(<Empty/>);
    const [loginControl, setLoginButton] = useState(<LoginButton/>)

    useEffect(() => {
        fetchUser()
        }, [user])

    const fetchUser = async()=>{
        if(user.isLoggedIn){                
            setLoginButton(<LogoutButton/>);
            setNavUserFavorite(<NavFavoriteButton/>)
            setSideUserFavorite(<SideFavoriteButton/>)
            if(user.role >= 2)
                setUserLinks(<UserLinks/>)
        } 
        else {
            setLoginButton(<LoginButton/>);
            setNavUserFavorite(<Empty/>);
            setSideUserFavorite(<Empty/>);
        }
    }
        
    function Empty(){
        return(
            <div className="removed"></div>
        );
        }

    const logout = ()=>{
        signUserOut().then( ()=>{ window.location = "/"} )
    }
    
    function LoginButton() {
        return (
            <button className = "nav-button" onClick = {()=>{ if(window.location.pathname !== "/login") window.location = "/login"}}>
            Sign in
            </button>
        );
        }
        
    function LogoutButton() {
    return (
        <button className = "nav-button" 
        onClick = {logout}>
        Sign out
        </button>
    );
    }

    function UserLinks(){
        return(
        <Link style={navStyle} to="/admin/create-employee">
        <li className = "nav-link">Admin</li>
        </Link>
        );
    }
    
    function NavFavoriteButton()
    {
        return(
            <IconButton component={Link} to="/favorites" aria-label="Show favorite items" color="inherit">
                <Badge className = "nav-link" >
                    <Favorite />
                </Badge>
            </IconButton>
        )
    }

    function SideFavoriteButton()
    {
        return(
            <Link style={navStyle} to="/favorites">
                <li className = "nav-link">Favorites</li>
            </Link>
        )
    }
    
    function Navbar()
    {
        return(
            <div name = "nav-container">
            <nav className = "topbar bg-dark">
                <div className = "nav--logo" >
                    <Link to = "/" ><img  alt = "logo" src={logo} /></Link> 
                </div>
                { (location.pathname === '/store' || location.pathname === '/cart' || location.pathname === '/favorites') && (
                <div className = "searchbar-container">
                    <input type="text" placeholder="Search.."/>
                </div>
                )}
                <ul className="nav-links">
                    <Link style={navStyle} to="/store">
                        <li className = "nav-link">Store</li>
                    </Link>
                    <Link style={navStyle} to="/about">
                        <li className = "nav-link">About</li>
                    </Link>
                    <Link style={navStyle} to="/contact">
                        <li className = "nav-link">Contact</li>
                    </Link>
                    {userLink}
                    { (location.pathname === '/store' || location.pathname === '/cart' || location.pathname === '/favorites' || location.pathname === '/product/') && (
                    <>
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge className = "nav-link" badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton> 
                        {userNavFavorite}
                    </>
                    )}
                    {loginControl}
                </ul>
                <div className ="dropdown-control" id = "dropdown-open">
                    <button className = "dropdown-button" onClick={
                        ()=>{
                            (sideMenuOpen) ? sideMenuOpen = false: sideMenuOpen = true;
                            slideSideMenu(sideMenuOpen);
                            //document.querySelector("#dropdown-open").classList.toggle("removed")
                        }} >&#8801;</button>
                </div>
            </nav>
            <nav className = "sidemenu " id ="sidemenu" >
                <div className = "dropdown-control" id = "dropdown-close">
                    <button className = "dropdown-button" onClick={
                        ()=>{
                            (sideMenuOpen) ? sideMenuOpen = false: sideMenuOpen = true;
                            slideSideMenu(sideMenuOpen);
                        }}>X
                    </button>
                </div>
                {/* <Link to = "/" ><img  alt = "logo" className = "nav--logo" src={logo} /></Link>  */}
                <ul className="sidemenu-links">
                    <Link style={navStyle} to="/">
                        <li className = "nav-link">Home</li>
                    </Link>
                    <Link style={navStyle} to="/store">
                        <li className = "nav-link">Store</li>
                    </Link>
                    <Link style={navStyle} to="/about">
                        <li className = "nav-link">About</li>
                    </Link>
                    <Link style={navStyle} to="/contact">
                        <li className = "nav-link">Contact</li>
                    </Link>
                    <Link style={navStyle} to="/cart">
                        <li className = "nav-link">Shopping Cart</li>
                    </Link>
                    {userSideFavorite}
                    {userLink}
                    {loginControl}
                </ul>
    
            </nav> 
            </div>
        )
    }

    return(
        <>
        {location.pathname !== '/' && <Navbar/>}
        {location.pathname === '/' && <HomeNavbar user={user} logout={logout} />}
        </>
    ); 
    
}

/* Side Menu Animation */

let sideMenuOpen = false;

const slideSideMenu = ()=>{
    const sideMenu = document.getElementById('sidemenu');
    let pixels;
    if(sideMenuOpen){
        //sideMenu.classList.toggle('removed');
        pixels = sideMenu.getBoundingClientRect().left - sideMenu.getBoundingClientRect().right;
    }
    else{
        //sideMenu.classList.toggle('removed');
        pixels = 0;
    }
    sideMenu.style.transform = 'translateX(' + pixels  + 'px)';
}

/*
 document.body.addEventListener('click', function (event) {
     const sideMenu = document.getElementById('sidemenu');

     if (sideMenu.contains(event.target)) {
         console.log('clicked inside');
     } else {
         console.log('clicked outside');
         if(sideMenuOpen){
             slideSideMenu(false);
             sideMenuOpen = false;
         }
     }
 });

let width = $(window).width();
let height = $(window).height();
const windowResize = ()=>{
    if ($(window).width() != width || $(window).height() != height) {
        width = $(window).width();
        height = $(window).height();
        if(sideMenuOpen){
        slideSideMenu(false);
        sideMenuOpen = false;
        }
    }
}

window.addEventListener('resize', windowResize)
*/

export default Nav;