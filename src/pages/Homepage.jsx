import React from 'react'
import Nav from '../components/Nav.jsx';
import { useNavigate } from 'react-router-dom';
function Homepage() {

  const navigate=useNavigate();

  const categories = [
    {
      id: 1,
      name: 'Spa',
      image:"spa.png"
    },
    {
      id: 2,
      name: 'Salon',
      image:"salon.png"
    },
    {
      id: 3,
      name: 'Home Cleaning',
      image:"homeCleaning.png"
    },
    {
      id: 4,
      name: 'Plumbing',
      image:"plumbing.png"
    },
    {
      id: 5,
      name: 'Appliance Repair',
      image:"applianceRepair.png"
    },
    {
      id: 6,
      name: 'Electrician',
      image:"electrician.png"
    }
  ];

  return (
    <>
        <Nav/>
        <div className='flex justify-center'>
            <h1 className='text-[36px]'>Categories</h1>
        </div>
        <div className='services-container'>
          {categories.map((cat)=>{
            return (
              <div key={cat.id} className='provider-card flex flex-col items-center cursor-pointer' onClick={()=>{navigate(`/services/${cat.name}`)}}>
                <img src={cat.image} />
                <p>{cat.name}</p>
              </div>)
          })}
        </div>
    </>
  )
}

export default Homepage