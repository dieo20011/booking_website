import React from 'react'

export const PlaceImg = ({place, index=0, className}) => {
    if (!place?.photos?.length){
        return'';
    }
    if(!className){
        className= 'object-cover'
    }
  return (
        <img className={className} src={'http://localhost:5000/api/uploads/'+place.photos[index]} alt=""/>                           
  )
}
