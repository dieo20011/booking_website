import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
export const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(()=>{
      axios.get('/api/places').then(response=>{
        setPlaces(response.data)
      });
  }, []);
  return (
    <div className='mt-8 mx-8 grid gap-x-6 gap-y-8 grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
      {places.length > 0 && places.map(place=>(
        <Link to={'/places/'+place._id} key={place._id}>
          <div className='bg-gray-500 rounded-2xl flex'>
          {place.photos?.[0] &&(
            <img className='rounded-2xl object-cover aspect-square' src={`http://localhost:5000/api/uploads/`+place.photos?.[0]}
                alt={`abc`}/>
          )}
          </div>
          <h3 className='font-bold truncate'>{place.address}</h3>
          <h2 className='font-md truncate text-gray-500'>{place.title}</h2>
          <h3 className='mt-2'><span className='font-bold'>{place.price}$</span> per night</h3>
        </Link>
      ))}
    </div>
  )
}