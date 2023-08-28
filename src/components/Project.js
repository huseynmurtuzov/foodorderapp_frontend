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
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Button closeButton></Button> 
        
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
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