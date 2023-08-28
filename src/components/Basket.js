import React, { useEffect } from 'react';
import logo from '../images/logo.png'
import footballImg from '../images/image1.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { removeProductFromBasket } from '../store/Product';
import { ExpandCircleDownOutlined } from '@mui/icons-material';
import { fetchAsyncData } from '../store/Product';
import { Alert,AlertTitle } from '@mui/material';
import { useState } from 'react';
import Nav from './Nav';


function Basket() {
    const dispatch = useDispatch();
    const {addedProducts} = useSelector(state => state.Product);
    const [alert, setAlert] = useState(false)
    const fetchData = () => {
        dispatch(fetchAsyncData());
    };
    useEffect(() => {
        fetchData();
    },[])
    console.log(addedProducts);
    let count = 0;
    addedProducts.map((product) => {
        count+=(product.price*product.quantity);
    })
    // function deleteData(id) {
    //     fetch(`http://localhost:3000/addedProducts/${id}`, {
    //       method: 'DELETE',
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log('Veri silindi:', data);
    //     })
    //     .catch(error => {
    //       console.error('Hata:', error);
    //     });
    // }

    
   
  return (
    <>
        <div className='container'>
        <Nav/>
            <div className='basket'>
                <div className='basket__header'>
                    <p>Product</p>
                    <div className='basket__header-qs'>
                        <p>Quantity</p>
                        <p>Subtotal</p>
                    </div>
                </div>
                <div className='basket__wrap'> 
                {addedProducts.map((product) => {
                    console.log(product.id)
                    return (
                        <div className='basket__product-wrap'>
                            <div className='basket__product-info-wrap'>
                                <img src={product.img} className='basket__product-img'/>                                
                                <div className='basket__product-inner-wrap'>
                                    <p className='basket__product-name'>{product.name}</p>
                                    <p className='basket__product-price'>Price: ${product.price}.00</p>
                                    <button className='basket__product-btn' onClick={() =>{
                                        dispatch(removeProductFromBasket(product.id));
                                        window.location.reload();
                                    } }>Remove</button>
                                </div> 
                            </div>
                            <div className='basket__product-qs'>
                                <p className='basket__product-quantity'>{product.quantity}</p>
                                <p className='basket__product-subtotal'>${product.quantity * product.price}.00</p>
                            </div>
                        </div>
                    )
                })}
                {addedProducts[0] && (
                    <div className='basket__payment'>
                    <div className='border-bottom'></div>
                    <div className='basket__inner-subtotal'>
                        <p className='basket__label'>Subtotal</p>
                        <p className='basket__price'>${count}.00</p>
                    </div>
                    <button type="" className='btn btn-primary' onClick={() => {
                        setAlert(true)
                    }}>Order Now</button>
                </div>
                )}
                {alert && (
                <Alert severity="success">
                    <AlertTitle style={{fontSize:'1.3rem',display:'block'}}>Success</AlertTitle>
                    <p style={{fontSize:'1.2rem'}}>Order Has Given</p>
                  </Alert>
                )}
                </div>
                
                
            </div>
        </div>
    </>
  )
}

export default Basket