import React from 'react'
import exclusive from '../images/exclusive.png'

function Exclusive() {
  return (
    <div className='exclusive'>
        <div className='container'>
            <div className='exclusive__content'>
                <img src={exclusive} alt="" className='exclusive__img'/>
                <div className='exclusive__texts'>
                    <p className='exclusive__label'>Exclusively Available on RedStore</p>
                    <h2 className='exclusive__name'>Smart Band 4</h2>
                    <p className='exclusive__desc'>The Mi Smart Band 4 a 39.9% larger (than Mi Band 3) AMOLED color full-touch display with adjustable brightness so everything is clear as can be. </p>
                    <button className='btn btn-primary'>Buy Now &rarr;</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Exclusive