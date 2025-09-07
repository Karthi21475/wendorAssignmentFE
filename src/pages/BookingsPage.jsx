import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/BookingPage.css'
import SlotPicker from "../components/SlotBooking";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";
function ServiceCard() {
    const [service, setService] = useState([]);
    const {id}=useParams();
    const days = generateDays(7);
    const navigate=useNavigate();

    const slots = {};
    days.forEach(day => {
        const currDate = new Date(day.fullDate);
        slots[day.date] = generateSlots(currDate,9, 18, 60);//currDate,from,to,interval
    });
    

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/services/book/${id}`)
        .then(res => setService(res.data))
        .catch(err => console.error(err));
    }, []);
    return (
    <>
        <Nav/>
        <div className="providers-container">
            <div key={service._id} className="provider-card">
                <h3>
                    {service.name}
                </h3>
                <p>Price: ₹{service.price}</p>
                <SlotPicker serviceId={service._id} days={days} slots={slots} />
            </div>
        </div>
    </>
    );
}
export default ServiceCard;

function generateDays(numDays = 7) {
    const today = new Date();
    const options = { weekday: "short" };

    return Array.from({ length: numDays }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() + i);

        return {
        label: date.toLocaleDateString("en-US", options).toUpperCase(),
        date: date.getDate(),
        fullDate: date.toISOString().split("T")[0],
        };
    });
}

function generateSlots(date, startHour = 9, endHour = 18, interval = 60) {
    const slots = [];
    const now = new Date();

    for (let hour = startHour; hour < endHour; hour++) {
        for (let min = 0; min < 60; min += interval) {
        const slotDate = new Date(date);
            slotDate.setHours(hour, min, 0, 0);
            
            if (slotDate < now) continue;

            const h = hour % 12 === 0 ? 12 : hour % 12;
            const ampm = hour < 12 ? "AM" : "PM";
            slots.push(`${h}:${min.toString().padStart(2, "0")} ${ampm}`);
        }
    }
    return slots;
}