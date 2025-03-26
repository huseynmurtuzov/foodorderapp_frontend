import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import RemoveFromBasket from "./RemoveFromBasket";
import AddedToBasket from "./AddedToBasket";
import OrderDetail from "./OrderDetail";
import NavInAdmin from "./NavInAdmin";
import OrderFilter from "./OrderFilterDelivery";
import OrderFilterCustomer from "./OrderFilterCustomer";
function CustomerAdminPage() {
  const [customerData, setCustomerData] = useState("");
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [orders, setOrders] = useState([])
  const [comments, setComments] = useState([])
  const [error, setError] = useState("")
  const [info, setInfo] = useState("") 
  const [errorKey, setErrorKey] = useState(0)
  const [filter, setFilter] = useState("pending")
  
  let decodedtoken = jwtDecode(localStorage.getItem("token"))
  let role = decodedtoken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]


  console.log(typeof customerData.address)

  const navigate = useNavigate()
  
  //fetch customer data

  useEffect(() => {
  
    setLoading(true);
    fetch(`https://localhost:7092/api/Customers/${decodedtoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCustomerData(data || {});
        setEditedName(data.name)
        setEditedAddress(data.address)
        setEditedPhoneNumber(data.phoneNumber)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);



//fetch customer orders
  useEffect(() => {
  
    setLoading(true);
    fetch(`https://localhost:7092/api/Customers/${decodedtoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data || {});
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
      setLoading(false)
  }, []);



//fetch customer reviews
  useEffect(() => {
  
    setLoading(true);
    fetch(`https://localhost:7092/api/Customers/${decodedtoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setComments(data || {});
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);






  const sendEditedCustomer = async () => {

    const response = await fetch(`https://localhost:7092/api/Customers/${decodedtoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({
            name: editedName,
            address: editedAddress,
            phoneNumber: editedPhoneNumber,
        }),
        credentials:"include" 
    });

    if (!response.ok) {
        console.log(response);
        setError("Please enter the proper meal details")
        setErrorKey(prev => prev + 1)
        setLoading(false);
    } else {
        const data = await response.json();
        console.log('Response:', data);
        setInfo("The restaurant has been edited successfully")
    }
};
  const handleDelete = () => {
    fetch(`https://localhost:7092/api/Customers/${decodedtoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,

      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if(response.ok){
        localStorage.removeItem("token");
        window.location.href = "/"
      }
    });
  };

  const DeleteComment = (id) => {
    fetch(`https://localhost:7092/api/RestaurantReviews/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }).then((response) => {
      if (!response.ok) {
        setError("We had a problem while deleting comment! Try again later!")
        setErrorKey(prev => prev + 1)
      }
      if(response.ok){
        setInfo("The comment has been edited successfully!");
        let div = document.querySelector(".reviews");
        let element = document.getElementById(id);
        div.removeChild(element)
      }
    });

  }


  // console.log(response);
  if(loading){
    return <LoadingScreen/>
  }
  
  return (
    <>
    {loading && <LoadingScreen/>}
    <div className="container">
      {error && <RemoveFromBasket text={error} errorkey={errorKey}/>}
            {info && <AddedToBasket text={info} />}
    {/* {loading && <LoadingScreen/>} */}
      <NavInAdmin />
      {role === "Customer" ? (
        !editMode ? ( 
          <div className="customerAdmin">
            <h1>User Info</h1>
            <div className="restaurantAdmin__data">
                <div className="restaurantAdmin_dataWrap">
                  <div class="restaurantAdmin__card">
                    <h3 className="restaurantAdmin__card--h3">Name</h3>
                    <p className="restaurantAdmin__card--p">{customerData.name}</p> 
                  </div>
                </div>
               
                <div className="restaurantAdmin_dataWrap">
                  <div class="restaurantAdmin__card">
                    <h3 className="restaurantAdmin__card--h3">Address</h3>
                    <p className="restaurantAdmin__card--p">{customerData.address}</p>
                  </div>
                </div>
                <div className="restaurantAdmin_dataWrap">
                  <div class="restaurantAdmin__card">
                    <h3 className="restaurantAdmin__card--h3">Phone Number</h3>
                    <p className="restaurantAdmin__card--p">{customerData.phoneNumber}</p>
                  </div>
                </div> 
                <div className="restaurantAdmin_dataWrap">
                  <div class="restaurantAdmin__card">
                    <h3 className="restaurantAdmin__card--h3">Order Count</h3>
                    <p className="restaurantAdmin__card--p">{customerData.orderCount}</p>
                  </div>
                </div>
                <div className="restaurantAdmin_dataWrap">
                  <div class="restaurantAdmin__card">
                    <h3 className="restaurantAdmin__card--h3">Phone Number</h3>
                    <p className="restaurantAdmin__card--p">{customerData.phoneNumber}</p>
                  </div>
                </div>
                <div className="restaurantAdmin_dataWrap">
                  <div class="restaurantAdmin__card">
                    <h3 className="restaurantAdmin__card--h3">Total Spending</h3>
                    <p className="restaurantAdmin__card--p">{customerData.totalSpending} TL</p>
                  </div>
                </div>               
                </div>
            {/* <div className="customerAdmin_dataWrap">
              <p>Name</p>
              <h3 className="customerAdmin__name">{customerData.name}</h3>
            </div>
            <div className="customerAdmin_dataWrap">
              <p>Address</p>
              <p className="customerAdmin__address">{customerData.address}</p>
            </div>
            <div className="customerAdmin_dataWrap">
              <p>Phone Number</p>
              <p className="customerAdmin__phone">{customerData.phoneNumber}</p>
            </div>
            <div className="customerAdmin_dataWrap">
              <p>Order Count</p>
              <p className="customerAdmin__phone">{customerData.orderCount}</p>
            </div>
            <div className="customerAdmin_dataWrap">
              <p>Total Spending</p>
              <p className="customerAdmin__phone">{customerData.totalSpending} TL</p>
            </div> */}
  
            <div className="deliveryPersonnelAdmin__orders">
              <h2 style={{ textAlign: "center" }}>Orders</h2>
              
              <OrderFilterCustomer setFilter={setFilter}/>
                {orders.length === 0 && <p style={{textAlign:'center',fontSize:'2rem'}}>There are no orders yet.</p>}
              <div className="deliveryPersonnelAdmin__orders--inner">
              {filter == "All" && orders.map((r) => (
                 (<OrderDetail order={r} />)
              ))}
              </div>
              
              <div className="deliveryPersonnelAdmin__orders--inner">
                {orders.map((r) => (
                 (filter==r.status) && (<OrderDetail order={r} />)
              ))}

              </div>
            </div> 
            
  
            <div className="deliveryPersonnelAdmin__orders reviews">
              <h2 style={{ textAlign: "center" }}>Reviews</h2>
              {comments.length === 0 && <p style={{textAlign:'center',fontSize:'2rem'}}>There are no comments yet.</p>}
              {comments?.map((review) => (
                <div key={review.id} className="reviewCard" id={review.id}>
                <div className="reviewCard__content">
                  <p>{review.comment}</p>
                </div>
                <div className="reviewCard__actions">
                  <p><strong>Rating:</strong> {review.rating}</p>
                  <button className="reviewCard__deleteBtn" onClick={() => DeleteComment(review.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
              
              ))}
            </div>
  
            <div className="customerAdmin__btnWrap">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setEditMode(true)}
              >
                Edit Account
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete Account
              </button>
            </div>
          </div>
        ) : (
          <div>
            <form action="" className="customerAdmin">
              <h1>Edit User Info</h1>
              <div className="customerAdmin_dataWrap">
                <label htmlFor="" className="customerAdmin_label">
                  Name
                </label>
                <input
                  type="text"
                  className="customerAdmin_input"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder={customerData.name}
                  defaultValue={customerData.name}
                />
              </div>
              <div className="customerAdmin_dataWrap">
                <label htmlFor="" className="customerAdmin_label">
                  Address
                </label>
                <input
                  type="text"
                  className="customerAdmin_input"
                  value={editedAddress}
                  onChange={(e) => setEditedAddress(e.target.value)}
                  placeholder={customerData.address}
                  defaultValue={customerData.address}
                />
              </div>
              <div className="customerAdmin_dataWrap">
                <label htmlFor="" className="customerAdmin_label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="customerAdmin_input"
                  value={editedPhoneNumber}
                  onChange={(e) => setEditedPhoneNumber(e.target.value)}
                  placeholder={customerData.phoneNumber}
                  defaultValue={customerData.phoneNumber}
                />
              </div>
              <div className="customerAdmin__btnWrap">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={sendEditedCustomer}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setEditMode(false)}
                >
                  Leave
                </button>
              </div>
            </form>
          </div>
        )
      ) : (
        <p style={{ fontSize: "5rem", textAlign: "center" }}>
          You are not a customer
        </p>
      )}
    </div>
      <Footer />
  </>
  
  );

}

export default CustomerAdminPage;
