import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {AiOutlineBars} from 'react-icons/ai';
import { OffCanvasExample } from './Project';



function Nav() {
  return (
    <>
        <nav className='nav' id='nav'>
            <Link to='/'><img src={logo} className='nav__logo'/></Link>
            <ul>
                <li className='nav__item'><Link className='nav__link' to='/'>Home</Link></li>
                <li className='nav__item'><Link className='nav__link' to='/products'>Products</Link></li>
                <li className='nav__item'><a href="" className='nav__link'>About</a></li>
                <li className='nav__item'><Link className='nav__link' to='/account'>Account</Link></li> 
                <li className='nav__item'><Link className='nav__svg' to='/basket'><i class="fa-solid fa-bag-shopping fa-3x" ></i></Link></li>
                <OffCanvasExample/>
            <div>
            </div>
            </ul>
            </nav>
            </>
  )
}

export default Nav