import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Comments from './Comments';
import Companies from './Companies';
import Exclusive from './Exclusive';
import Footer from './Footer';
import Header from './Header';
import Products from './Products';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {AiOutlineBars} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../css/style.css';
import ProductDetail from './ProductDetail';
export function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2 nav__toggle">
        <AiOutlineBars/>
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props} className='nav__offcanvas'>
        <Button onClick={() => setShow(false)} className='nav__offcanvas-btn'>X</Button> 
        <Offcanvas.Body>
          <ul>
            <li className='nav__item'><Link className='nav__link' to='/'>Home</Link></li>
            <li className='nav__item'><Link className='nav__link' to='/products'>Products</Link></li>
            <li className='nav__item'><a href="" className='nav__link'>About</a></li>
            <li className='nav__item'><Link className='nav__link' to='/account'>Account</Link></li> 
            <li className='nav__item'><Link className='nav__svg nav__link' to='/basket'>Basket</Link></li>
          </ul>    
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
function Project() {
  return (
    <div>
      <Header/>
      <Products/>
      <Exclusive/>
      <Comments/>
      <Companies/>
      <Footer/>
    </div>
  )
}

export default Project