import React from 'react'
import logo from '../images/logo.png'
import footballImg from '../images/headerphoto.png'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import { useState,useEffect } from 'react'
function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <div className='header'>
        <a className={`upLink btn btn-primary ${isVisible ? "show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} href="#nav" id='clickRef'><i class="fa-solid fa-arrow-up"></i></a>

        <div className='container'>
            <Nav/>
            <div className='header__content'>
                <div className='header__content--text'>
                  <h1>Order your food from the best restaurants around you!</h1>
                  <p>We have been working for you to order best food around your restaurants. Now its just one click away, order and we will deliver it for you for free!</p>
                  <Link to='/restaurants'><button className='btn btn-primary'>Explore Now &rarr;</button></Link>
                </div>
                <img src={footballImg} className='header__content--img'/>
            </div>
        </div>
        
    </div>
  )
}

export default Header