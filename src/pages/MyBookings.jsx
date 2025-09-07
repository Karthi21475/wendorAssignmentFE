import axios from 'axios';
import React,{useEffect, useState} from 'react'
import Nav from '../components/Nav';

function MyBookings() {

    const [booking,setBooking]=useState([]);

    useEffect(()=>{
        async function getData(){
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings`,{withCredentials:true});
            setBooking(res.data.bookings);
            console.log(res.data.bookings);
        }
        getData();
    },[])

    return (
    <div>
        <Nav/>
        <div className='flex justify-center'>
            <h1 className='text-[36px]'>Booking Details</h1>
        </div>
        {booking.map((book)=>{
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

            <h3>Booked Slots</h3>
            <ul>
                <li className='card'>
                    <p><strong>Date:</strong> {book.slot.date}</p>
                    <p><strong>Time:</strong> {book.slot.time}</p>
                </li>
            </ul>
            <button className='btn-del'>Cancel</button>
            </div>
        })}
    </div>
    )
}

export default MyBookings