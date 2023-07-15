import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { AddressLink } from '../AddressLink';
import { PlaceGallery } from '../PlaceGallery';
import { BookingDate } from '../BookingDate';

export const BookingPage = () => {
    const {id} = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(()=>{
      if(id){
        axios.get('/api/bookings').then(response=>{
          const foundBooking = response.data.find(({_id})=> _id === id)
          if(foundBooking){
            setBooking(foundBooking);
          }
        })
      }
    }, [id]);
    if(!booking){
      return '';
    }
  return (
    <div className='my-8'>
      <h1 className='text-2xl font-bold'>{booking.place.title}</h1>
      <AddressLink>{booking.place.address}</AddressLink>
      <div className='bg-gray-200 p-6 my-6 rounded-2xl flex justify-between items-center'>
        <div>
        <h2 className='text-xl mb-4'>Your booking information:</h2>
        <BookingDate booking={booking}/>
        </div>
        <div className='bg-primary p-4 text-white rounded-2xl'>
          <div className='text-xl'>Total price:</div>
          <div className='text-xl'>${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place}/>
    </div>
  )
}
