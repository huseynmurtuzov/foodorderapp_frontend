import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromBasket } from "../store/Product";
import { refreshBasket } from "../store/Product";
import { Alert, AlertTitle } from "@mui/material";
import { useState } from "react";
import Nav from "./Nav";
import RemoveFromBasket from "./RemoveFromBasket";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import PaymentOptions from "./PaymentOptions";
import { removeProccess } from "../store/Product";
import { activeProccess } from "../store/Product";
import LoadingScreen from "./LoadingScreen";


function Basket() {
  const [showRemoveFromBasket, setshowRemoveFromBasket] = useState(false);
  const { addedProducts } = useSelector((state) => state.Product);
  const { process } = useSelector((state) => state.Product);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isCreditCard, setIsCreditCard] = useState(false)
  const [isCreditCardValid, setisCreditCardValid] = useState(false)
  // const [totalAmount, setTotalAmount] = useState(0)
  const [customerId, setCustomerId] = useState(0);
  let dispatch = useDispatch()
  let paymentMethod=isCreditCard ? "Credit card" : "Cash"

  const navigate = useNavigate();

  let count = 0;
  addedProducts.map((product) => {
    count += product.price;
    // setTotalAmount(count);
  });
  console.log(addedProducts);
  let paymentObject = {
    paymentMethod: paymentMethod,
    amount: count,
    isSuccessful: true,
  };

  let token = JSON.parse(localStorage.getItem("token"));
  const order = async (e) => {
    let data;
    const userData = jwtDecode(token);
    console.log(customerId);
    e.preventDefault();
    setLoading(true);
    setError(null);

    if(isCreditCard && !isCreditCardValid){
      setError("Invalid Credit Card Information")
      console.log("Invalid Credit Card Information")
      return
    }
    else{
      const userEmail =
      userData[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ];
      const userId = userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    if (!userEmail) {
      console.error("User email is not defined");
      setLoading(false);
    } else {
      try {
        const response2 = await fetch(
          `https://localhost:7092/api/Customers/getByEmail/${userEmail}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response2.ok) {
          console.error(
            `HTTP Error: ${response2.status} - ${response2.statusText}`
          );
          setLoading(false);
        } else {
          // Yanıtın içeriği varsa JSON olarak çöz.
          const contentType = response2.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            data = await response2.json();
            console.log("Customer data:", data);
            setCustomerId(data.id)
          } else {
            console.warn("Response is not JSON or body is empty.");
          }
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }
    console.log(customerId)
    var entity = JSON.stringify({
      orderDate: new Date().toISOString(),
      totalAmount: count,
      status: "pending",
      customerId: parseInt(userId),
      restaurantId: addedProducts[0].restaurantId,
      deliveryPersonelId: -10,
      paymentMethod: paymentMethod,
      meals: addedProducts,
    });
    try {
      if (!token) throw new Error("Token bulunamadı!");
      const response = await fetch("https://localhost:7092/api/Orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: entity,
        mode: "cors",
      });

      if (!response.ok) {
        console.log(await response.json());
        throw new Error(response);
      }
      setAlert(true);
      dispatch(activeProccess());
      setTimeout(() => {
        dispatch(removeProccess());
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      dispatch(refreshBasket());
    }
    }

    
  };

  // const fetchData = () => {
  //     dispatch(fetchAsyncData());
  // };
  // useEffect(() => {
  //     fetchData();
  // },[])

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
    {process && <LoadingScreen/>}
      {showRemoveFromBasket && (
        <RemoveFromBasket text={"Meal has been removed from the basket"} />
      )}
      <div className="container">
        <Nav />
        {error && <RemoveFromBasket text={error} />}

        <div className="basket">
          <div className="basket__header">
            <p>Product</p>
            <div className="basket__header-qs">
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
          </div>
          <div className="basket__wrap">
            {addedProducts.map((product) => {
              return (
                <div>
                  <div className="basket__product-wrap">
                    <div className="basket__product-info-wrap">
                      <img
                        src={product.image}
                        className="basket__product-img"
                      />
                      <div className="basket__product-inner-wrap">
                        <p className="basket__product-name">{product.name}</p>
                        <p className="basket__product-price">
                          Price: {product.price}.00TL
                        </p>
                        <button
                          className="basket__product-btn"
                          onClick={() => {
                            setshowRemoveFromBasket(true);
                            setTimeout(() => {
                              setshowRemoveFromBasket(false);
                            }, 2000);
                            dispatch(removeProductFromBasket(product.id));
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="basket__product-qs">
                      <p className="basket__product-quantity">
                        {product.quantity}
                      </p>
                      <p className="basket__product-subtotal">
                        {product.quantity * product.price}.00TL
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            {addedProducts[0] && (
              <div className="basket__payment--wrap">
              <PaymentOptions setIsCreditCard={setIsCreditCard} setisCreditCardValid={setisCreditCardValid}/>
              <div className="basket__payment">
                 <div className="border-bottom"></div>
                <div className="basket__inner-subtotal">
                  <p className="basket__label">Subtotal</p>
                  <p className="basket__price">{count}.00TL</p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => order(e)}
                >
                  Order Now
                </button>
              </div>
              </div>
            )}
            {alert && (
              <Alert severity="success">
                <AlertTitle style={{ fontSize: "1.3rem", display: "block" }}>
                  Success
                </AlertTitle>
                <p style={{ fontSize: "1.2rem" }}>Order Has Given</p>
              </Alert>
              
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Basket;
