import React, { useRef, useState } from 'react'
import { useProduct } from '../context/ProductContext';
import { setExactProduct } from '../store/Product'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'
import Footer from './Footer';
import { useEffect } from 'react';
import Nav from './Nav';


function AllProducts() {
    const data = useProduct();
    const datas = ((data[0].concat(data[1])));
    const {exactProduct} = useSelector(state => state.Product);
    const [selectValue, setSelectValue] = useState(0);

    // useEffect(() => {
    //     window.location.reload()
    // },[exactProduct])

    const select = useRef()
    const dispatch = useDispatch();
    const sortedByDecreasingPrice = ((data[0].concat(data[1]))).sort((a,b) => b.price - a.price);
    const sortedByScore = ((data[0].concat(data[1]))).sort((a,b) => b.score - a.score);
    const sortedByIncreasingPrice = ((data[0].concat(data[1]))).sort((a,b) => a.price - b.price);

    
    useEffect(() => {
        // console.log(select.current.value)
    },[selectValue])

  

  return (
    <>
    <a href="#nav" className='btn btn-primary upLink'><i class="fa-solid fa-arrow-up"></i></a>
    <div className='container'>
    <Nav/>
            <div className='detail__inner-wrap' style={{margin:'2rem 0'}}>
                <h2>All Products</h2>
                <select className='detail__select' value={selectValue} ref={select} onChange={e => setSelectValue(e.target.value)}>
                    <option value="0" >Default Sorting</option>
                    <option value="1" >Sort by Price (increasing)</option>
                    <option value="2" >Sort by Price (decreasing)</option>
                    <option value="3" >Sort by Score</option>
                </select>
            </div>
        
        <div className='flex' style={{margin:'3rem 0'}}>
        {
            (selectValue == 0 && (
                datas.map((product) => {
                    const handleClick = () => {
                        dispatch(setExactProduct(product));
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
                    )
                })
            ))
        }
        {
            (selectValue == 1 && (
                sortedByIncreasingPrice.map((product) => {
                    const handleClick = () => {
                        dispatch(setExactProduct(product));
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
                    )
                })
            ))
        }
        {
(selectValue == 2 && (
                sortedByDecreasingPrice.map((product) => {
                    const handleClick = () => {
                        dispatch(setExactProduct(product));
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
                    )
                })
            ))
        }
            
        {
(selectValue == 3 && (
                sortedByScore.map((product) => {
                    const handleClick = () => {
                        dispatch(setExactProduct(product));
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
                    )
                })
            ))
        }
            
            
        
        </div>
    </div>
    <Footer/>
    </>
    
  )
}

export default AllProducts