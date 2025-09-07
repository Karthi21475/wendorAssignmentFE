import React from 'react'
import Nav from '../components/Nav.jsx';
import { useNavigate } from 'react-router-dom';
function Homepage() {

  const navigate=useNavigate();

  const categories = [
    {
      id: 1,
      name: 'Spa'
    },
    {
      id: 2,
      name: 'Salon'
    },
    {
      id: 3,
      name: 'Home Cleaning'
    },
    {
      id: 4,
      name: 'Plumbing'
    },
    {
      id: 5,
      name: 'Appliance Repair'
    },
    {
      id: 6,
      name: 'Electrician'
    }
  ];
  const image="https://placehold.co/200x200";

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
                <img src={image} />
                <p>{cat.name}</p>
              </div>)
          })}
        </div>
    </>
  )
}

export default Homepage