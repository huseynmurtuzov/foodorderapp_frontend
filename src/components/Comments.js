import React from 'react'
import user1 from '../images/user-1.png'
import user2 from '../images/user-2.png'
import user3 from '../images/user-3.png'

function Comments() {
  return (
    <div className='container'>
        <div className='comment'>
            <div className='comment__item'>
                <div className='comment__quotes'>
                  <i class="fa-solid fa-quote-left"></i>
                </div>
                <p className='comment__text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                <div className='product__ft--detail-star-wrap'>
                    <i class="fa-solid fa-star product__ft--detail-star"></i>
                    <i class="fa-solid fa-star product__ft--detail-star"></i>
                    <i class="fa-solid fa-star product__ft--detail-star"></i>
                    <i class="fa-solid fa-star product__ft--detail-star"></i>
                    <i class="fa-regular fa-star product__ft--detail-star"></i>
                </div>
                <img src={user1} className='comment__img'/>
                <p className='comment__name'>Sean Parker</p>
            </div>  
            <div className='comment__item'>
                <div className='comment__quotes'>
                  <i class="fa-solid fa-quote-left"></i>
                </div>
                <p className='comment__text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                <div className='product__ft--detail-star-wrap'>
                    <i class="fa-solid fa-star product__ft--detail-star"></i>
                    <i class="fa-solid fa-star product__ft--detail-star"></i>
                    <i class="fa-solid fa-star product__ft--detail-star"></i>
                    <i class="fa-solid fa-star product__ft--detail-star"></i>
                    <i class="fa-regular fa-star product__ft--detail-star"></i>
                </div>
                <img src={user2} className='comment__img'/>
                <p className='comment__name'>Mike Smith</p>
            </div>  
            <div className='comment__item'>
                <div className='comment__quotes'>
                    <i class="fa-solid fa-quote-left"></i>
                </div>
                <p className='comment__text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                <div className='product__ft--detail-star-wrap'>
                    <i class="fa-solid fa-star product__ft--detail-star"></i>
                    <i class="fa-solid fa-star product__ft--detail-star"></i>
                    <i class="fa-solid fa-star product__ft--detail-star"></i>
                    <i class="fa-solid fa-star product__ft--detail-star"></i>
                    <i class="fa-regular fa-star product__ft--detail-star"></i>
                </div>
                <img src={user3} className='comment__img'/>
                <p className='comment__name'>Mabel Joe</p>
            </div>  
        </div>
    </div>
  )
}

export default Comments