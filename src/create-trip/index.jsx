import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If Input is a custom component, import it here. For now, use a standard input element.

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [days, setDays] = useState('');

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>
      <div className='mt-20'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          {/* Uncomment and configure this component after getting the API key */}
          {/* <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => setPlace(v),
            }}
          /> */}
        </div>
      </div>
      <div className='mt-10'>
        <h2 className='text-xl my-3 font-medium'>How many days are you planning for the trip?</h2>
        {/* Use a standard input element if Input is not defined */}
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder='Ex. 3'
          className='border p-2 rounded'
        />
      </div>
    </div>
  );
}

export default CreateTrip;
