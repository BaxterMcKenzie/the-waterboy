import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageHeader = ({ title, image_url }) => {
    const navigate = useNavigate();

    const handleBackClick = (event) => {
        event.preventDefault();
        navigate(-1);
    }

  return (
    <div className='header-section' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(${image_url})`}}>
      <p className='back-button' onClick={handleBackClick}> Back</p>
      <h1 className='hero-h1'>{title}
      <span className="header-underlay-h1">{title}</span>
      </h1>

    </div>
  )
}

export default PageHeader
