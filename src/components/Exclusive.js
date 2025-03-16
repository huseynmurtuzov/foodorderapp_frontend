import React from 'react'
import exclusive from '../images/headerphoto.png'

function Exclusive() {
  return (
    <div className='exclusive'>
        <div className='container'>
            <div className='exclusive__content'>
                <img src={exclusive} alt="" className='exclusive__img'/>
                <div className='exclusive__texts'>
                    <p className='exclusive__label'>Exclusively Available on MirtizOrder</p>
                    <h2 className='exclusive__name'>Larger Burger</h2>
                    <p className='exclusive__desc'>This Larger Burger Menu will make you feel like you are in heaven! If you wont feel that we will refund your money back! Heaven feel guaranteed!</p>
                    <button className='btn btn-primary'>Buy Now &rarr;</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Exclusive