import React from 'react'
import company1 from '../images/logo-godrej.png'
import company2 from '../images/logo-oppo.png'
import company3 from '../images/logo-coca-cola.png'
import company4 from '../images/logo-paypal.png'
import company5 from '../images/logo-philips.png'

function Companies() {
  return (
    <div className='container'>
        <div className='companies'>
            <img src={company1} alt="" className='companies__img'/>
            <img src={company2} alt="" className='companies__img'/>
            <img src={company3} alt="" className='companies__img'/>
            <img src={company4} alt="" className='companies__img'/>
            <img src={company5} alt="" className='companies__img'/>
        </div>
    </div>
  )
}

export default Companies