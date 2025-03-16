import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { addBasket } from '../store/Product';
import { refreshBasket } from '../store/Product';
import AddedToBasket from './AddedToBasket';

function BasketBtn({product}) {
  const [showModal, setShowModal] = useState(false);
  const [showAddToBasket, setShowAddToBasket] = useState(false)


  const storedToken = localStorage.getItem('token');

  const dispatch = useDispatch();
  const {addedProducts} = useSelector(state => state.Product);

  const handleAddBasket = () => {
    if (addedProducts[0] && product.restaurantId !== addedProducts[0].restaurantId) {
      setShowModal(true); 
    } else if(!storedToken){
      setShowModal(true); 
    }
    else {
      dispatch(addBasket(product));
      triggerAddToBasketNotification();
    }
  };

  const confirmAdd = () => {
    dispatch(refreshBasket());
    dispatch(addBasket(product));
    triggerAddToBasketNotification();
    setShowModal(false); 
  };

  const cancelAdd = () => {
    setShowModal(false); 
  };

  const triggerAddToBasketNotification = () => {
    setShowAddToBasket(true);
    setTimeout(() => {
      setShowAddToBasket(false);
    }, 2000);
  };

  return (
    <>
    {showAddToBasket && <AddedToBasket text={product.name + ' ' + 'has been added to the basket'} />}
    <div>
      <button className='btn btn-primary' onClick={handleAddBasket}>Sepete Ekle</button>
      

      <Modal
        open={showModal}
        onClose={cancelAdd}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 500, 
          bgcolor: 'background.paper', 
          boxShadow: 24, 
          p: 4, 
          borderRadius: 2 
        }}>
          <Typography id="modal-title" variant="h6" component="h2" style={{fontSize:"2.2rem"}}>
            Uyarı
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }} style={{fontSize:"2.2rem"}}>
          {(!storedToken) && "Sepete urun ilave etmek icin login olmaniz gerekir"}
            {(addedProducts[0] && product.restaurantId !== addedProducts[0].restaurantId) && "Sepetinize diğer restorandan ürün ilave ederseniz, mevcut sepetteki tüm ürünler silinir. Devam etmek istiyor musunuz?"}

            
          </Typography>
          {(!storedToken) && (
            <Button href='/login'  color="primary" variant="contained" style={{fontSize:"1.5rem"}} sx={{ mt: 2, mr: 1 }}>
            Login
          </Button>)}
          {(addedProducts[0] && product.restaurantId !== addedProducts[0].restaurantId) && (
            <>
            <Button onClick={confirmAdd} color="primary" variant="contained" style={{fontSize:"1.5rem"}} sx={{ mt: 2, mr: 1 }}>
            Evet
          </Button>
          <Button onClick={cancelAdd} color="secondary" variant="outlined" style={{fontSize:"1.5rem"}} sx={{ mt: 2 }}>
            Hayır
          </Button>
            </>
            )}
          
        </Box>
      </Modal>
      
    </div>
    </>
    
  );
}



export default BasketBtn;
