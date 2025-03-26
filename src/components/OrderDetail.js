import { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Info, Margin } from '@mui/icons-material';
import { alignPropType } from 'react-bootstrap/esm/types';
import { jwtDecode } from 'jwt-decode';

function OrderDetail({ order }) {
    const [activeOrderId, setActiveOrderId] = useState(null);
    console.log(order.id)
let decodedtoken = jwtDecode(localStorage.getItem("token"))
  let role = decodedtoken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    const setAsDelivered = (id) => {
        fetch(`https://localhost:7092/api/Orders/${id}/setAsDelivered`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (response.ok) {
                window.location.href = "/DeliveryPersonnelAdminPage";
            }
        });
    };

    const setAsPrepared = (id) => {
        fetch(`https://localhost:7092/api/Orders/${id}/setAsPrepared`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (response.ok) {
                window.location.href = "/RestaurantAdminPage";
            }
        });
    };

    const cancelOrder = (id) => {
        fetch(`https://localhost:7092/api/Orders/${id}/CancelOrder`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (response.ok) {
                if(role == "Customer"){
                    window.location.href = "/CustomerAdminPage"
                }
                if(role == "Restaurant")
                {
                    window.location.href = "/RestaurantAdminPage";
                }
            }
        });
    }

    const cancelAdd = () => {
        setActiveOrderId(null);
    };

    const showExactModal = () => {
        setActiveOrderId(order.id);
    };

    return (
        <div key={order.id} className="order-card">
            <div className="order-header">
                <p><strong>Order Date:</strong> {order.orderDate.split("T")[0]}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <Info className="info-icon" onClick={showExactModal} />
            </div>
            <div className="order-body">
                <p><strong>Total Amount:</strong> {order.totalAmount} TL</p>
                <div className="meals-list">
                    <p><strong>Meals:</strong></p>
                    <ul>
                        {order.meals.map((meal, index) => (
                            <li key={index}>{meal}</li>
                        ))}
                    </ul>
                </div>
            </div>
            {(role == "DeliveryPersonnel" && (order.status === "Preparing")) && (
                <button className="order-button" onClick={() => setAsDelivered(order.id)}>
                    Set as Delivered
                </button>
            )}
            {(role == "Restaurant" && (order.status === "pending")) && (
                <button className="order-button" onClick={() => setAsPrepared(order.id)}>
                    Set as Prepared
                </button>
            )}
            {(role == "Restaurant" && (order.status === "pending")) && (
                <button className="order-button" onClick={() => cancelOrder(order.id)}>
                    Cancel Order
                </button>
            )}
            {(role == "Customer" && (order.status === "pending")) && (
                <button className="order-button" onClick={() => cancelOrder(order.id)}>
                    Cancel Order
                </button>
            )}


            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                open={activeOrderId === order.id}
                onClose={cancelAdd}
            >
                <Box className="modal-box">
                    <Typography id="modal-title" variant="h4" style={{textAlign:"center",padding:"1rem"}}>
                        Order Info
                    </Typography>
                    <Typography id="modal-description" variant='h5' style={{textAlign:"center",padding:"1rem",display:"flex",flexDirection:"column",rowGap:"1rem"}}>
                        <p>Customer Name : {order.orderCustomerName}</p>
                        <p>Customer Phone Number : {order.orderCustomerPhoneNumber}</p>
                        <p>Customer Address : {order.orderCustomerAddress}</p>
                        <p>Restaurant : {order.orderRestaurantName}</p>
                        <p>Restaurant Contact : {order.orderRestaurantPhoneNumber}</p>
                    </Typography>
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button onClick={cancelAdd} variant="contained" style={{backgroundColor:"orangered"}}>Close</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default OrderDetail;
