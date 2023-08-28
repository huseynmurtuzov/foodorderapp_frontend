import React from 'react'
import logo from '../images/logo.png'
import footballImg from '../images/image1.png'
import { Link } from 'react-router-dom'
import Nav from './Nav'
function Header() {
  return (
    <div className='header'>
        <a href="#nav" className='btn btn-primary upLink' id='clickRef'><i class="fa-solid fa-arrow-up"></i></a>

        <div className='container'>
            <Nav/>
            <div className='header__content'>
                <div className='header__content--text'>
                  <h1>Give Your Workout A New Style!</h1>
                  <p>Success isn't always about greatness.It's about consistency. Consistent hard work gains success . Greatness will come.</p>
                  <Link to='/products'><button className='btn btn-primary'>Explore Now &rarr;</button></Link>
                </div>
                <img src={footballImg} className='header__content--img'/>
            </div>
        </div>
        
    </div>
  )
}

export default Header