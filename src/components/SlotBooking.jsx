import { useState } from "react";
import "../styles/SlotPicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SlotPicker({serviceId, days, slots }) {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [error,setError]=useState('');
    const navigate=useNavigate();

    const handleBooking = async () => {
        
        try {
            const fullDate = days.find(d => d.date === selectedDay).fullDate;
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings`, {
                serviceId: serviceId,
                slot: {time:selectedSlot,date:fullDate}
            },{withCredentials:true});
            if(res.data.message==="No token, access denied!"){
                navigate('/login')
            }
            else if(res.data.message==="Can't book another slot while a slot is already booked"){
                setError("Can't book another slot while a slot is already booked");
            }
            navigate('/my-bookings');
            } catch (err) {
                console.log(err);
            }
    };

    return (
        <div className="slot-picker">
        <h2>Booking slots</h2>
        <div className="days-container">
            {days.map((day, i) => (
            <button
                key={i}
                className={`day-btn ${
                selectedDay === day.date ? "active" : ""
                }`}
                onClick={() => {
                setSelectedDay(day.date);
                setSelectedSlot(null);
                }}
            >
                <span>{day.label}</span>
                <strong>{day.date}</strong>
            </button>
            ))}
        </div>

        {selectedDay && (
            <div className="slots-container">
            {slots[selectedDay]?.map((time, i) => (
                <button
                key={i}
                className={`slot-btn ${
                    selectedSlot === time ? "active" : ""
                }`}
                onClick={() => setSelectedSlot(time)}
                >
                {time}
                </button>
            ))}
            </div>
        )}
        {error.length>0 && <p className="error" >{error}</p>}
        <button
            className="book-btn"
            disabled={!selectedDay || !selectedSlot}
            onClick={handleBooking}
        >
            Book an appointment
        </button>
        </div>
    );
}

export default SlotPicker;
