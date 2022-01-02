import React from 'react'
import bgImage from '../../libs/Data/img/coinerslotHero.jpg'

export default function HeroSection() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ color: '#fff' }}>Welcome Coinerslot</h1>
    </div>
  )
}
