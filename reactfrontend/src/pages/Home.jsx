import React from 'react'
import HomeTile from '../components/HomeTile'
import { useDispatch } from 'react-redux'

function Home() {
  return (
    <>
      <div className="tile-container">
        <HomeTile to="/" name="Home"/>
        <HomeTile to="/about" name="About"/>
        <HomeTile to="/gallery" name="Gallery"/>
        <HomeTile to="/blog" name="Blog"/>
        <HomeTile to="/dashboard" name="Dashboard"/>
      </div>
    </>
  )
}

export default Home