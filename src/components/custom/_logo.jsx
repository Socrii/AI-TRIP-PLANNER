import React from 'react'

const logoStyle = {
    width: '100px', 
    height: '100px',
    borderRadius: '4%',
    objectFit: 'cover', 
  };

const Logo = () => {
  return (
     <img src='/logo.png' style={logoStyle} alt='Logo' />
  )
}

export default Logo