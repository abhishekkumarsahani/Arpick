import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>Inventory Products Here</h2>
        <div>
            <div className="hero-hand-icon">
                <p>Arpick</p>
                <img src={hand_icon} alt="" />
            </div>
            <p>inventory products</p>
            <p>for everyone</p>
        </div>
        <div className="hero-latest-button">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="" />
        </div>
      </div>
     
    </div>
  )
}

export default Hero
