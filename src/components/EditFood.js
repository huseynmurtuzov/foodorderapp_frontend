import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { addBasket } from '../store/Product';
import { useState } from 'react';
import { refreshBasket } from '../store/Product';
import AddedToBasket from './AddedToBasket';
import { Modal } from '@mui/material';
import BasketBtn from './BasketBtn';
function Food({product}) {
    let deletedProduct = useRef()
    const storedToken = JSON.parse(localStorage.getItem("token"));

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
  const DeleteMeal = async(id) => {
    try {
      const response = await fetch(
        `https://localhost:7092/api/Meals/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      deletedProduct.current.style.display = "none"

  }
  catch (error) {
    console.error("Error fetching meals:", error.message);
  }
}

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
     

     <div className='editFood' ref={deletedProduct}>
            <img src={product.image} alt="" className='editFood__img'/>
            <div className='editFood__content'>
               <h1 className='editFood__name'>{newString}</h1>
              <p className='editFood__price'>{product.price}.00TL</p>
              <p className='editFood__label'>Product Details</p>
              <p className='editFood__text'>{newDesc}</p>
            </div>
            <button onClick={() => DeleteMeal(product.id)} className='btn btn-primary editFood_removeBtn'>X</button>
      </div>
    </>
    
             
  )
}

export default Food