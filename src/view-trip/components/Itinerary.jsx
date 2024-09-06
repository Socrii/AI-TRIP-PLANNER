import React from 'react';
import { FaMapMarkerAlt, FaClock, FaTicketAlt } from 'react-icons/fa';

const Itinerary = ({ tripData }) => {
  const getGoogleMapsUrl = (placeName, placeAddress) => {
    const query = placeAddress || placeName;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  };

  return (
    <div className='mt-6'>
      <h3 className='text-2xl font-semibold mb-6 text-blue-900'>Itinerary</h3>
      {Object.entries(tripData?.itinerary || {}).length > 0 ? (
        Object.entries(tripData.itinerary).map(([day, itinerary], dayIndex) => (
          <div key={dayIndex} className='mb-8'>
            <h4 className='text-xl font-bold mb-4 border-b-2 border-blue-300 pb-2'>{`Day ${dayIndex + 1}`}</h4>
            {itinerary.plan.map((place, index) => (
              <div key={index} className='p-5 border rounded-lg shadow-lg bg-white relative transition-transform transform hover:scale-105'>
                <div className='flex items-start mb-4'>
                  <a 
                    href={getGoogleMapsUrl(place.placeName, place.placeAddress)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className='mr-4'
                  >
                    <FaMapMarkerAlt className='text-4xl text-blue-500 hover:text-blue-700 transition-colors' />
                  </a>
                  <div>
                    <h4 className='font-semibold text-xl text-blue-800'>{place.placeName}</h4>
                    <p className='text-sm text-gray-700'>{place.placeDetails}</p>
                  </div>
                </div>
                <div className='text-sm text-gray-700 space-y-2'>
                  <div className='flex items-center'>
                    <FaClock className='mr-2 text-gray-500' />
                    <p className='font-medium'>Best Time to Visit: <span className='text-gray-800'>{place.bestTimeToVisit}</span></p>
                  </div>
                  <div className='flex items-center'>
                    <FaMapMarkerAlt className='mr-2 text-gray-500' />
                    <p className='font-medium'>Time to Travel: <span className='text-gray-800'>{place.timeToTravel}</span></p>
                  </div>
                  <div className='flex items-center'>
                    <FaTicketAlt className='mr-2 text-gray-500' />
                    <p className='font-medium'>Ticket Pricing: <span className='text-gray-800'>{place.ticketPricing}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className='text-gray-700'>No itinerary available.</p>
      )}
    </div>
  );
};

export default Itinerary;
