import React, { useRef, useState } from 'react'
import { useProduct } from '../context/ProductContext'
import { useSelector } from 'react-redux';
import logo from '../images/logo.png'
import { useDispatch } from 'react-redux'
import Footer from './Footer';
import { Link,Routes,Route } from 'react-router-dom'
import { setExactProduct } from '../store/Product'
import { changeQuantity } from '../store/Product'
import { useEffect } from 'react';
import { addBasket } from '../store/Product';
import Nav from './Nav';
const btn = document.querySelector('#clickRef');


function ProductDetail({p}) {
  const {exactProduct,addedProducts} = useSelector(state => state.Product);
  const [quantity, setQuantity] = useState();
  const data = useProduct();
  const datas = ((data[0].concat(data[1])));
  const btn = useRef();
  const dispatch = useDispatch();
 
  const handleAddBasket = () => {
    dispatch(addBasket(exactProduct));
  }

  const handleChange = (e) => {
    dispatch(changeQuantity(e.target.value));
  }
    
  return (
      <div id='productDetail'>
        <a href="#nav" className='btn btn-primary upLink' ref={btn}><i class="fa-solid fa-arrow-up"></i></a>
        <div className='container'>

        <Nav/>
          <div className='detail'>
              <img src={exactProduct.img} alt="" className='detail__img'/>
            
            <div className='detail__content'>
              <p className='detail__breadcrumb'>Home/T-Shirt</p>
              <h1 className='detail__name'>{exactProduct.name}</h1>
              <p className='detail__price'>${exactProduct.price}.00</p>
              <select className='detail__select'>
                  <option className='detail__option' value="">Select Size</option>
                  <option className='detail__option' value="sm">Small</option>
                  <option className='detail__option' value="md">Medium</option>
                  <option className='detail__option' value="lg">Large</option>
                  <option className='detail__option' value="XL">XL</option>
                  <option className='detail__option' value="2Xl">XXL</option>
                  <option className='detail__option' value="3XL">XXXL</option>
              </select>
              <div className='detail__wrap'>
                <input className='detail__quantity' value={exactProduct.quantity}  onChange={e => handleChange(e)}/>
                <button className="btn btn-primary" onClick={handleAddBasket}>Add to Cart</button>
              </div>
              <p className='detail__label'>Product Details</p>
              <p className='detail__text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra.</p>
            </div>
          </div>
          <div className='product__ft' style={{marginBottom:'5rem'}}>
            <div className='detail__inner-wrap'>
              <h3 className='product__ft--text'>Related Products</h3>
              <Link to='/products'>View More</Link>
            </div>
                <div className='product__ft--img-wrap'>
                {data[0].map((product,index) => {
                    const handleClick = () => {
                      dispatch(setExactProduct(product));
                      btn.current.click();
                    }
                      
                    return (
                          
                  <Link to='/productDetail' className='link' style={{textDecoration:'none',color:'black'}} >
                  <div className='product__itself' onClick={handleClick}>   
                  <>
                  <img src={product.img} className='product__ft--img'/>
                  <div className='product__ft--detail'>
                      <p className='product__ft--detail-name'>{product.name}</p>
                      <div className='product__ft--detail-star-wrap'>
                          {product.score > 4 ? (
                              <>
                                  <i class="fa-solid fa-star product__ft--detail-star"></i>
                                  <i class="fa-solid fa-star product__ft--detail-star"></i>
                                  <i class="fa-solid fa-star product__ft--detail-star"></i>
                                  <i class="fa-solid fa-star product__ft--detail-star"></i>
                                  <i class="fa-solid fa-star product__ft--detail-star"></i>
                              </>
                              
                          ) : (
                              <>
                                  <i class="fa-solid fa-star product__ft--detail-star"></i>
                                  <i class="fa-solid fa-star product__ft--detail-star"></i>
                                  <i class="fa-solid fa-star product__ft--detail-star"></i>
                                  <i class="fa-solid fa-star product__ft--detail-star"></i>
                                  <i class="fa-regular fa-star product__ft--detail-star"></i>
                              </>
                          )}
                      </div>
                      <p className='product__ft--detail-price'>${product.price}.00</p>   
                      </div>
                  </> 
                  </div>
                  </Link>
                )})
              }
                </div>
            </div>
        </div>
        <Footer/>
      </div>
  )}

export default ProductDetail;
  
