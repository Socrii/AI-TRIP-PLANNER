import React from 'react';
import { BsFillShareFill } from "react-icons/bs";
import Hotel from './Hotel';
import Itinerary from './Itinerary';

function InfoSec({ trip }) {
  const tripData = JSON.parse(trip?.tripData || '{}');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out this trip to ${trip?.userSelection?.city}`,
          text: `I'm planning a trip to ${trip?.userSelection?.city}. It will be ${trip?.userSelection?.noOfDays} days long with a budget of ${trip?.userSelection?.budget}.`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing the trip:', error);
      }
    } else {
      alert('Share functionality is not supported in this browser.');
    }
  };

  return (
    <div className='p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-r from-blue-100 via-white to-blue-50 rounded-xl shadow-lg'>
      {/* Display city name */}
      <div className='h-[340px] w-full flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-300 rounded-xl overflow-hidden'>
        <h1 className='text-6xl font-bold text-white'>{trip?.userSelection?.city || 'PLACE'}</h1>
      </div>

      <div className='mt-6'>
        <button 
          onClick={handleShare} 
          className='p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300'>
          <BsFillShareFill className='text-2xl' />
        </button>
        <div className='mt-4'>
          <h2 className='font-bold text-3xl text-blue-900'>{trip?.userSelection?.city}</h2>
          <div className='flex gap-4 mt-4'>
            <span className='p-2 px-4 bg-blue-100 text-blue-700 rounded-full text-sm md:text-md shadow-md'>
              📅 {trip?.userSelection?.noOfDays} Day(s)
            </span>
            <span className='p-2 px-4 bg-blue-100 text-blue-700 rounded-full text-sm md:text-md shadow-md'>
              💰 {trip?.userSelection?.budget}
            </span>
            <span className='p-2 px-4 bg-blue-100 text-blue-700 rounded-full text-sm md:text-md shadow-md'>
              🧳 {trip?.userSelection?.travelers}
            </span>
          </div>
        </div>
      </div>

      <Hotel tripData={tripData} />
      <Itinerary tripData={tripData} />
    </div>
  );
}

export default InfoSec;
