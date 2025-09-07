import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import logo from '../assets/logo.png';
import loginImage from '../assets/login.png';
import { useNavigate } from "react-router";
import ClipLoader from 'react-spinners/ClipLoader';
import '../styles/AuthPages.css'
function Signup() {
    const navigate=useNavigate();
    const [show,setShow]=useState(false);
    const [error,setError]=useState("");
    const [loader,setLoader]=useState(false);
    const [nextStep,setNextStep]=useState(false);
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    const [pincode,setPincode]=useState('');
    const [street,setStreet]=useState('');
    const [city,setCity]=useState('');


    return (
        <>
        <div className="form-container">
            <form onSubmit={
            async(e)=>{
            e.preventDefault();
            setLoader(true);
            const formData = {
                username: username,
                email: email,
                phone: phone,
                password: password,
                addresses: [{
                    street: street,
                    city: city,
                    pincode: pincode,
                    isDefault: true
                }]
            };
            try{
                const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/user/signup`,formData,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials: true
                });
                if(res.data.message==="User Created"){
                    navigate('/login');
                }
            }catch(err){
                setError(err.response.data.message);
            }
            setLoader(false);
            }}>
            <div className='logo-cont'>
                <img src={logo} alt="Logo" onClick={() => navigate("/")}/>
                <h1>Sign Up</h1>
            </div>
            {
                !nextStep?
                <>
                    <input type="text" id="username" name="username" value={username} placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}} required/>

                    <input type="text" id="email" name="email" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>

                    <div className="input-cont">
                        <input type={show ? "text":"password"} name="password" value={password} id="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} required/>
                        <p onClick={()=>{setShow(!show)}} htmlFor='password' >{!show?'Show':"Hide"}</p>
                    </div>
                    <button type='button' className="btn" onClick={()=>{setNextStep(true)}}>Next</button>
                </>
                :
                <>
                    <input type="text" id="phone" value={phone} name="phone" placeholder='00000-00000' onChange={(e)=>{setPhone(e.target.value)}} required/>
                    <input type="text" id="pincode" value={pincode} name="pincode" placeholder='pincode' onChange={(e)=>{setPincode(e.target.value)}} required/>
                    <input type="text" id="street" value={street} name="street" placeholder='street/colony' onChange={(e)=>{setStreet(e.target.value)}} required/>
                    <input type="text" id="city" value={city} name="city" placeholder='city' onChange={(e)=>{setCity(e.target.value)}} required/>
                    {error.length>0 && <p className="error">{error}</p>}
                    <div className='flex gap-[10px]'>
                        <button type='button' className="btn" onClick={()=>{setNextStep(false)}}>prev</button>
                        <button type='submit' className="btn">{loader?<ClipLoader/>:"Sign Up"}</button>
                    </div>
                </>
            }


            <p>Already have an account?<Link to="/login" className="navigateLink">Log in</Link></p>
            </form>
        </div>
        </>
    )
}

export default Signup