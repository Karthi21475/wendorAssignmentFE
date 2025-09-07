import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Nav.css';
import logo from '../assets/logo.png'
function Nav() {
    const [token,settoken]=useState(false);
    const [show,setShow]=useState(false);
    useEffect(()=>{
        const authchecker=async()=>{
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/user/auth`,{withCredentials:true})

            if(res.data.message==="User Authenticated"){
                settoken(true);
            }else{
                settoken(false);
            }
        }
        authchecker();
    },[token]);
    const handleClick=async()=>{
        const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/user/logout`,{},{withCredentials:true});
        if (res.data.message==="User Logged Out"){
            settoken(false);
        }
    }

    return (
    <>
        <nav className="nav-container">
            <div className='flex items-center'>
                <img src={logo} alt="" className='w-[48px] h-[48px]' />
            </div>
            <ul className="nav-links">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/my-bookings'>Bookings</Link></li>
            </ul>
            {token?
            <div className='profile-cont'>
                <div className='profile-icon' onClick={()=>{setShow(!show)}}>
                    <i className='bxr bx-user-circle scale-[2] '></i>
                    <i className='bxr bx-caret-down'></i>  
                </div>
                <div className={`profile-menu ${!show?"hidden":"flex"}`} >
                    <Link to="/profile">Profile</Link>
                    <button className="btn" onClick={()=>handleClick()}>Logout</button>
                </div>
            </div>
            :(<Link to='/login' className="btn1">Login</Link>)}
        </nav>
    </>
    )
}

export default Nav