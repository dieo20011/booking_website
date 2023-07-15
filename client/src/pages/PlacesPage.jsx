import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { PlacesFormPage } from "./PlacesFormPage";
import { AccountNav } from "../AccountNav";
import axios from "axios";
import { PlaceImg } from "../PlaceImg";
export const PlacesPage = () => {
  const[places, setPlaces] = useState([]);
  useEffect(()=>{
    axios.get('/api/user-places').then(({data})=>{
      setPlaces(data);
    })
  })
  return (
    <div>
    <AccountNav/>
        <div className="text-center mt-4">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full "
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new places
          </Link>
        </div>
        <div className="mx-10 mt-4 grid gap-4" >
          {places.length > 0 && places.map((place, index) =>(
            <Link to={'/account/places/' + place._id} className=" flex  gap-4 bg-gray-200 p-4 border rounded-2xl cursor-pointer" key={index}>
            <div className="flex w-32 h-32 bg-gray-300 grow shrink-0 max-w-200">
              <PlaceImg place={place}/>
            </div>
             <div className="grow-0 shrink">
             <h2 className="text-xl ">{place.title}</h2>
             <p className="text-sm mt-2">{place.description}</p>
             </div>
            </Link>
          ))}
        </div>
    </div>
  );
};
