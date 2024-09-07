import React from 'react';

const Bg = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: `url('/ai-4.jpg')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {children} 
    </div>
  );
}

export default Bg;
