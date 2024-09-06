import React from 'react';
import { FaHotel, FaMapMarkerAlt } from 'react-icons/fa';

const Hotel = ({ tripData }) => {
  const getGoogleMapsUrl = (hotelName, hotelAddress) => {
    const query = hotelAddress || hotelName;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  };

  return (
    <div className='mt-5'>
      <h3 className='text-2xl font-semibold mb-6 text-blue-800'>Hotel Options</h3>
      {tripData?.hotelOptions?.length > 0 ? (
        tripData.hotelOptions.map((hotel, index) => (
          <div key={index} className='my-4 p-5 border border-gray-300 rounded-lg shadow-lg bg-white relative transition-transform transform hover:scale-105'>
            <div className='flex items-center mb-4'>
              <FaHotel className='text-5xl text-blue-500 mr-4' />
              <div>
                <h4 className='font-bold text-xl text-blue-900'>{hotel.hotelName}</h4>
                <p className='text-md text-gray-700'>{hotel.hotelAddress}</p>
              </div>
            </div>
            <div className='flex justify-between text-md text-gray-800 mb-2'>
              <p className='font-semibold'>Price: {hotel.price}</p>
              <p className='font-semibold'>Rating: {hotel.rating}⭐</p>
            </div>
            <p className='text-gray-600 mb-4'>{hotel.description}</p>
            <a 
              href={getGoogleMapsUrl(hotel.hotelName, hotel.hotelAddress)} 
              target="_blank" 
              rel="noopener noreferrer"
              className='absolute top-3 right-3 hover:text-blue-600 transition-colors'
            >
              <FaMapMarkerAlt className='text-2xl text-gray-500' />
            </a>
          </div>
        ))
      ) : (
        <p>No hotels available.</p>
      )}
    </div>
  );
};

export default Hotel;
