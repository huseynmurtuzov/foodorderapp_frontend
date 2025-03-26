import React from 'react'
import googlePlay from '../images/play-store.png';
import appStore from '../images/app-store.png';
import whiteLogo from '../images/onlinefoodlogo-removebg-preview.webp'
 
function Footer() {
  return (
    <div className='footer'>
        <div className='container'>
            <div className='footer__inner'>
                <div className='footer__inner-1'>
                    <h5>Download Our App</h5>
                    <p>Download App for Android and ios mobile phone.</p>
                    <div className='footer__inner-1-img-wrap'>
                        <img src={googlePlay} alt="" className='footer__inner-1-img'/>
                        <img src={appStore} alt="" className='footer__inner-1-img'/>
                    </div>
                </div>
                <div className='footer__inner-2'>
                    <div style={{display:"flex",alignItems:"center"}}>
                    <img src={whiteLogo} className='footer__inner-2-img' /> <span style={{color:"orangered",fontWeight:"bold",fontSize:"3rem",textAlign:"center"}}>MurtuzOrder.com</span>
                    </div>
                    <p>Our Purpose is To Sustainably Make the Pleasure and Benefits of Sports Accessible to the Many</p>
                </div>
                <div className='footer__inner-3'>
                    <h5>Useful Links</h5>
                    <ul>
                        <li><a href="/registerAsRestaurant">Register as Restaurant</a></li>
                        <li><a href="/registerAsDeliveryPersonnel">Register as Delivery Personnel</a></li>
                        <li><a href="">Roturn Policy </a></li>
                        <li><a href="">Join Affiliate</a></li>
                    </ul>
                </div>
                <div className='footer__inner-3'>
                    <h5>Follow Us</h5>
                    <ul>
                        <li><a href="">Facebook</a></li>
                        <li><a href="">Twitter</a></li>
                        <li><a href="">Instagram</a></li>
                        <li><a href="">Youtube</a></li>
                    </ul>
                </div>
            </div>
            <div className='footer__copyright'>
               <p>Copyright 2025 MirtizDev</p> 
            </div>
        </div>
    </div>
  )
}

export default Footer