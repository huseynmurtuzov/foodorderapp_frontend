import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import ProductDetail from './ProductDetail'
import { Link,Routes,Route } from 'react-router-dom'
import { useProduct } from '../context/ProductContext'
import { setExactProduct } from '../store/Product'
import { useDispatch, useSelector } from 'react-redux'


function ProductItself({product}) {
    const data = useProduct();
    const {exactProduct} = useSelector((state => state.Product));
    const btn = useRef()

    // useEffect(() => {
    //     window.location.reload()
    // },[exactProduct])
    const datas = ((data[0].concat(data[1])));
        const dispatch = useDispatch();
        // let path = `/productDetail/${product.name}`
        const handleClick = () => {
            dispatch(setExactProduct(product));
            btn.current.click();
        }
    
  return (
    <>
    <Link to='/productDetail' ref={btn}  className='link' style={{textDecoration:'none',color:'black'}} >
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
    </>
    )}


export default ProductItself