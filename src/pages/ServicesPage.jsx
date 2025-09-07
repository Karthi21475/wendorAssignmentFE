import React, { useEffect, useState } from 'react'
import '../styles/ServicesPage.css'
import Nav from '../components/Nav';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
function ServicesPage() {
    const [services,setServices]=useState([]);
    const navigate = useNavigate();
    const {id}=useParams();

    useEffect(()=>{
        const getData=async()=>{
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/services${id?`/${id}`:""}`)
            setServices(res.data);
        }
        getData();
    },[])

    return (
        <>
            <Nav/>
            <div className='flex justify-center'>
                <h1 className='text-[36px]'>Services</h1>
            </div>
            <div className="services-container">
                {services.map((s) => (
                    <div key={s._id} className="provider-card" onClick={()=>{navigate(`/bookings/${s._id}`)}}>
                        <img src={s.image} alt="" />
                        <h3>
                            {s.category}
                        </h3>
                        <p>Pricing: ₹{s.price}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ServicesPage