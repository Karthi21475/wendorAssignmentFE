import axios from 'axios';
import React,{useEffect, useState} from 'react'
import Nav from '../components/Nav';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom';
function MyBookings() {

    const [booking,setBooking]=useState([]);
    const [loader,setLoader]=useState();
    const navigate=useNavigate();

    async function handleDel(){
        setLoader(true)
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/bookings`,{withCredentials:true});
        if(res.data.message==="No token, access denied!"){
                navigate('/login')
        }
        setLoader(false)
    }

    useEffect(()=>{
        async function getData(){
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings`,{withCredentials:true});
            if(res.data.message==="No token, access denied!"){
                navigate('/login')
            }
            setBooking(res.data.bookings);
        }
        getData();
    },[loader])

    return (
    <div>
        <Nav/>
        <div className='flex justify-center'>
            <h1 className='text-[36px]'>Booking Details</h1>
        </div>
        {!booking.length>0?"No Booked Slots":booking.map((book)=>{
            return <div key={book._id} className='card'>
            <div>
                <p><strong>Booking ID:</strong> {book._id}</p>
                <p><strong>Provider ID:</strong> {book.providerId}</p>
                <p><strong>User ID:</strong> {book.userId}</p>
                <div className='flex'>
                    <strong>Address: </strong>
                    <ul>
                        <li>{book.address.city}</li>
                        <li>{book.address.street}</li>
                        <li>{book.address.pincode}</li>
                    </ul>
                </div>
            </div>
            <ul>
                <li className='provider-card'>
                    <p><strong>Date:</strong> {book.slot.date}</p>
                    <p><strong>Time:</strong> {book.slot.time}</p>
                </li>
            </ul>
            <button className='btn-del' onClick={()=>{handleDel()}}>{loader?<ClipLoader/>:"Cancel"}</button>
            </div>
        })}
    </div>
    )
}

export default MyBookings