import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { addBasket } from '../store/Product';
import { useState } from 'react';
import { refreshBasket } from '../store/Product';
import AddedToBasket from './AddedToBasket';
import { Modal } from '@mui/material';
import BasketBtn from './BasketBtn';
function Food({product}) {
    const [quantity, setQuantity] = useState(1)
    
    /* eslint-disable no-alert */
    // const [showModal, setShowModal] = useState(false);

    // const handleAddBasket = () => {
    //   if (addedProducts[0] && product.restaurantId !== addedProducts[0].restaurantId) {
    //     setShowModal(true); // Modalı aç
    //   } else {
    //     dispatch(addBasket(product));
    //     triggerAddToBasketNotification();
    //   }
    // };
  
    // const confirmAdd = () => {
    //   dispatch(refreshBasket());
    //   dispatch(addBasket(product));
    //   triggerAddToBasketNotification();
    //   setShowModal(false); // Modalı kapat
    // };
  
    // const cancelAdd = () => {
    //   setShowModal(false); // Modalı kapat
    // };
  
    // const triggerAddToBasketNotification = () => {
    //   setShowAddToBasket(true);
    //   setTimeout(() => {
    //     setShowAddToBasket(false);
    //   }, 2000);
    // };
  
    // function AddToBasketNotification() {
    //   return <div>Ürün sepete eklendi!</div>;
    // }
/* eslint-enable no-alert */
    const handleQuantityChange = (event) => {
      const newQuantity = parseInt(event.target.value, 10);
      if (!isNaN(newQuantity) && newQuantity > 0) {
        setQuantity(newQuantity)
        product.quantity = newQuantity;
      } else {
        setQuantity(1)
        product.quantity = 1
      }
    };
    let newString = product.name.toString();
    let newDesc = product.description.toString();

    const changeName = () => {
      newString = newString.split("?").join("ı");
    };
    
    const changeDesc = () => {
      newDesc = newDesc.split("?").join("ı"); 
    };
    changeName();
    changeDesc();
    
  return (
    <>
     

     <div className='detail'>
              <img src={product.image} alt="" className='detail__img'/>
            
            <div className='detail__content'>
               <h1 className='detail__name'>{newString}</h1>
              <p className='detail__price'>{product.price}.00TL</p>
            
              <div className='detail__wrap'>
                <input className='detail__quantity' type='number' value={quantity}  onChange={e => handleQuantityChange(e)}/>
                <BasketBtn  product={product}/>
              </div>
              <p className='detail__label'>Product Details</p>
              <p className='detail__text'>{newDesc}</p>
            </div>
          </div>
    </>
    
             
  )
}

export default Food