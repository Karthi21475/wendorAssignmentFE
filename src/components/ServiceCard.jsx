import React from 'react'
import '../styles/ServiceCard.css'
function ServiceCard({service}) {
    return (
        <>
            <div className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p>₹{service.price}</p>
                <p><b>Category:</b> {service.category}</p>
                <p><b>Duration:</b> {service.duration}</p>
                <p>{service.isAvailable ? "🟢Available" : "🔴Not Available"}</p>
            </div>
        </>
    )
}

export default ServiceCard