import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-8'>
      <div className='max-w-4xl w-full flex flex-col md:flex-row gap-8'>
        {/* Box 1 */}
        <div className='flex-1 bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105'>
          <h2 className='text-2xl font-bold mb-4 text-sky-600'>Simplify Your Travel Planning</h2>
          <p className='text-lg mb-4'>
            Are you tired of the endless search for the perfect travel plans? Our AI-powered platform takes the hassle out of trip planning by crafting personalized itineraries tailored to your interests, budget, and travel style.
          </p>
          <p className='text-lg'>
            Whether you're looking for thrilling adventures, relaxing getaways, or cultural explorations, our smart algorithms analyze your preferences to recommend destinations, activities, and accommodations that you'll love. Say goodbye to cookie-cutter travel plans and hello to your dream vacation.
          </p>
        </div>

        {/* Box 2 */}
        <div className='flex-1 bg-sky-600 text-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105'>
          <h2 className='text-2xl font-bold mb-4'>Ready to Explore?</h2>
          <p className='text-lg mb-4'>
            Discover the ultimate travel experience with personalized recommendations just for you. Our platform is designed to make your trip planning effortless and enjoyable. Let us help you create unforgettable memories with custom itineraries tailored to your unique preferences.
          </p>
          <Link to={'/create-trip'}>
            <Button className='bg-white text-sky-600 hover:bg-gray-100 px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105'>
              Get Started, It's Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
