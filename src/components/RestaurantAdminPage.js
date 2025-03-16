import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import EditFood from "./EditFood";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import RemoveFromBasket from "./RemoveFromBasket";
import AddedToBasket from "./AddedToBasket";
import { SettingsInputAntenna } from "@mui/icons-material";

function RestaurantAdminPage() {
  const [restaurantData, setRestaurantData] = useState({});
  const [editedName, setEditedName] = useState("");
  const [editedAdress, setEditedAddress] = useState("");
  const [editedWorkingHours, setEditedWorkingHours] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [editedMealName, setEditedMealName] = useState("");
  const [editedMealPrice, setEditedMealPrice] = useState("");
  const [editedMealDescription, setEditedMealDescription] = useState("");
  const [editedMealImageLink, setEditedMealImageLink] = useState("");
  const [restaurantOrders, setRestaurantOrders] = useState([]);
  const [editedMeals, setEditedMeals] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [meals, setMeals] = useState([]);
  const [editMealMode, seteditMealMode] = useState(false);
  const [addMealMode, setaddMealMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [restaurantReviews, setRestaurantReviews] = useState([]);
  const [averageMealPrice, setaverageMealPrice] = useState(0);
  const [totalRevenue, settotalRevenue] = useState(0);
  const [error, setError] = useState("")
  const [info, setInfo] = useState("")


  const navigate = useNavigate(); 
  let decodedtoken = jwtDecode(localStorage.getItem("token"));

  console.log(
    decodedtoken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ]
  );
  let role =
    decodedtoken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];

    //set restaurant datas
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://localhost:7092/api/Restaurant/${decodedtoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRestaurantData(data || {});
        setEditedName(data.name)
        setEditedAddress(data.address)
        setEditedImage(data.image)
        setEditedWorkingHours(data.workingHours)
        setEditedPhoneNumber(data.phoneNumber)
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  //fetch orders
  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://localhost:7092/api/Orders/${decodedtoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}/ordersByRestaurant`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`, // Ensure this token is valid
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const orders = await response.json();
        setRestaurantOrders(orders || {});
        console.log("Fetched orders:", orders);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    return () => {};
  }, []);

  //fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://localhost:7092/api/Orders/${decodedtoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}/ordersByRestaurant`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`, // Ensure this token is valid
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const orders = await response.json();
        setRestaurantOrders(orders || {});
        console.log("Fetched orders:", orders);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    return () => {};
  }, []);

  //fetch average meal price
  useEffect(() => {
    const fetchAverageMealPrice = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://localhost:7092/api/Restaurant/${decodedtoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}/getAverageMealPrice`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`, // Ensure this token is valid
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const price = await response.json();
        setaverageMealPrice(price.averagePrice);
        settotalRevenue(price.totalRevenue);
        console.log("Fetched price:", price);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAverageMealPrice();

    return () => {};
  }, []);

  //yemekleri fetch etme
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://localhost:7092/api/Restaurant/get-meals-inadmin/${decodedtoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`, // Ensure this token is valid
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const meals = await response.json();
        setMeals(meals || {});
        console.log("Fetched meals:", meals);
      } catch (error) {
        console.error("Error fetching meals:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();

    return () => {};
  }, []);

  //review fetch etme
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://localhost:7092/api/RestaurantReviews/${decodedtoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}/reviewsByRestaurant-inAdmin`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`, // Ensure this token is valid
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const reviews = await response.json();
        setRestaurantReviews(reviews || {});
        console.log("Fetched reviews:", restaurantReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();

    return () => {};
  }, []);
  //meal add etme
  const AddMeal = async () => {
    const response = await fetch("https://localhost:7092/api/Meals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify({
        name: editedMealName,
        price: parseFloat(editedMealPrice),
        description: editedMealDescription,
        image: editedMealImageLink,
        restaurantId: parseInt(
          decodedtoken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ]
        ),
        isAvailable: true,
        quantity: 1,
        categories: [],
        orders: [],
      }),
      credentials: "include",
    });
    if (!response.ok) {
      setError("Please enter the proper meal details")
      setLoading(false);
    } else {
      const data = await response.json();
      console.log("Response:", data);
      setInfo("The meal has been added successfully")
      setLoading(false);
      setaddMealMode(false);
      seteditMealMode(false);
    }
  };

  //restoran datalarini fetch et
  
  //restoran datalarini editle
  const sendEditedRestaurant = async () => {
    const response = await fetch(
      `https://localhost:7092/api/Restaurant/${decodedtoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({
          name: editedName,
          address: editedAdress,
          phoneNumber: editedPhoneNumber,
          workingHours: editedWorkingHours,
          image: editedImage,
        }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      console.error("Error in API request:", response);
      setError("Please enter the proper meal details")
      setLoading(false);
      // setEditMode(false)
    } else {
      const data = await response.json();
      console.log("Response:", data);
      setInfo("The restaurant has been edited successfully")
      navigate("/")
    }
  };
  //restorani sil
  const handleDelete = () => {
    fetch(
      `https://localhost:7092/api/Restaurant/${decodedtoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          setError("We had a problem while trying to delete your account!")
        }
        setInfo("Your account has been deleted successfully!")
        return response.json();
      })
      .then(() => {})
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const editMeals = () => {
    seteditMealMode(true);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="container">
      {error && <RemoveFromBasket text={error} />}
      {info && <AddedToBasket text={info} />}
        <Nav />
        {role === "Restaurant" ? (
          <>
            {!loading && !editMode && (
              <div className="restaurantAdmin">
                <h1>Restaurant Info</h1>
                <div className="restaurantAdmin__data">
                <div className="restaurantAdmin_dataWrap">
                  <div class="restaurantAdmin__card">
                    <h3 className="restaurantAdmin__card--h3">Name</h3>
                    <p className="restaurantAdmin__card--p">{restaurantData.name}</p>
                  </div>
                </div>
               
                <div className="restaurantAdmin_dataWrap">
                  <div class="restaurantAdmin__card">
                    <h3 className="restaurantAdmin__card--h3">Address</h3>
                    <p className="restaurantAdmin__card--p">{restaurantData.address}</p>
                  </div>
                </div>
                <div className="restaurantAdmin_dataWrap">
                  <div class="restaurantAdmin__card">
                    <h3 className="restaurantAdmin__card--h3">Phone Number</h3>
                    <p className="restaurantAdmin__card--p">{restaurantData.phoneNumber}</p>
                  </div>
                </div>
                <div className="restaurantAdmin_dataWrap">
                  <div class="restaurantAdmin__card">
                    <h3 className="restaurantAdmin__card--h3">Working Hours</h3>
                    <p className="restaurantAdmin__card--p">{restaurantData.workingHours}</p>
                  </div>
                </div>
                <div className="restaurantAdmin_dataWrap">
                  <div class="restaurantAdmin__card">
                    <h3 className="restaurantAdmin__card--h3">Average Meal Price</h3>
                    <p className="restaurantAdmin__card--p">{averageMealPrice} TL</p>
                  </div>
                </div>
                <div className="restaurantAdmin_dataWrap">
                  <div class="restaurantAdmin__card">
                    <h3 className="restaurantAdmin__card--h3">Total Revenue</h3>
                    <p className="restaurantAdmin__card--p">{totalRevenue} TL</p>
                  </div>
                </div>
                
                
                </div>
                <div className="restaurantAdmin_dataWrap restaurantAdmin__image">
                  <div class="restaurantAdmin__card ">
                    <h3 className="restaurantAdmin__card--h3">Image</h3>
                    <img className="restaurantAdmin__card--img" src={restaurantData.image} alt="" />
                  </div>
                </div>

                <div className="deliveryPersonnelAdmin__orders">
                  <h2 style={{ textAlign: "center" }}>Orders</h2>
                  {restaurantOrders.length == 0 && <p style={{textAlign:'center',fontSize:'3rem'}}>There are no orders yet.</p>}
                  {restaurantOrders.map((r) => (
                    <div key={r.id} className="deliveryPersonnelAdmin__order">
                      <div className="deliveryPersonnelAdmin__order--inner">
                        <p>Order Date: {r.orderDate.split("T")[0]}</p>
                        <p>Total Amount: {r.totalAmount}</p>
                      </div>
                      <div className="deliveryPersonnelAdmin__order--inner">
                        <p>Status: {r.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="deliveryPersonnelAdmin__orders">
                  <h2 style={{ textAlign: "center" }}>Reviews</h2>
                  {restaurantReviews.length == 0 && <p style={{textAlign:'center',fontSize:'3rem'}}>There are no reviews yet.</p>}
                  {restaurantReviews.map((r) => (
                    <div key={r.id} className="deliveryPersonnelAdmin__order">
                      <div className="deliveryPersonnelAdmin__order--inner">
                        <p>{r.comment}</p>
                      </div>
                      <div className="deliveryPersonnelAdmin__order--inner">
                        <p>Rating: {r.rating}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="restaurantAdmin__btnWrap">
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
            )}
            {!loading && editMode && (
              <form className="restaurantAdmin">
                <h1>Edit Restaurant Info</h1>
                <div className="restaurantAdmin_dataWrap">
                  <label className="restaurantAdmin_label">Name</label>
                  <input
                    type="text"
                    className="restaurantAdmin_input"
                    value={editedName}
                    placeholder={restaurantData.name}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                </div>
                <div className="restaurantAdmin_dataWrap">
                  <label className="restaurantAdmin_label">Address</label>
                  <input
                    type="text"
                    className="restaurantAdmin_input"
                    value={editedAdress}
                    placeholder={restaurantData.address}
                    onChange={(e) => setEditedAddress(e.target.value)}
                  />
                </div>
                <div className="restaurantAdmin_dataWrap">
                  <label className="restaurantAdmin_label">Phone Number</label>
                  <input
                    type="text"
                    className="restaurantAdmin_input"
                    value={editedPhoneNumber}
                    placeholder={restaurantData.phoneNumber}
                    onChange={(e) => setEditedPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="restaurantAdmin_dataWrap">
                  <label className="restaurantAdmin_label">Working Hours</label>
                  <input
                    type="text"
                    className="restaurantAdmin_input"
                    value={editedWorkingHours}
                    placeholder={restaurantData.workingHours}
                    onChange={(e) => setEditedWorkingHours(e.target.value)}
                  />
                </div>
                <div className="restaurantAdmin_dataWrap">
                  <label className="restaurantAdmin_label">Image Link</label>
                  <input
                    type="text"
                    className="restaurantAdmin_input"
                    value={editedImage}
                    placeholder={restaurantData.image}
                    onChange={(e) => setEditedImage(e.target.value)}
                  />
                </div>
                {/* Diğer input'lar buraya aynı formatta */}
                <div className="restaurantAdmin__btnWrap">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={sendEditedRestaurant}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={editMeals}
                  >
                    EditMeals
                  </button>
                </div>
              </form>
            )}
            {!loading && editMealMode && (
              <div className="restaurantAdmin">
                <div
                  className="product__ft--img-wrap"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {meals.map((product, index) => {
                    return <EditFood product={product} key={index} />;
                  })}
                </div>
                <div className="restaurantAdmin__btnWrap">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      seteditMealMode(false);
                      setaddMealMode(true);
                    }}
                  >
                    Add Meal
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      seteditMealMode(false);
                    }}
                  >
                    Leave
                  </button>
                </div>
              </div>
            )}
            {!loading && addMealMode && (
              <div className="restaurantAdmin">
                <form action="" className="restaurantAdmin">
                  <h1>Add Meal Info</h1>
                  <div className="restaurantAdmin_dataWrap">
                    <label htmlFor="" className="restaurantAdmin_label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="restaurantAdmin_input"
                      value={editedMealName}
                      onChange={(e) => setEditedMealName(e.target.value)}
                    />
                  </div>
                  <div className="restaurantAdmin_dataWrap">
                    <label htmlFor="" className="restaurantAdmin_label">
                      Price
                    </label>
                    <input
                      type="text"
                      className="restaurantAdmin_input"
                      value={editedMealPrice}
                      onChange={(e) => setEditedMealPrice(e.target.value)}
                    />
                  </div>
                  <div className="restaurantAdmin_dataWrap">
                    <label htmlFor="" className="restaurantAdmin_label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="restaurantAdmin_input"
                      value={editedMealDescription}
                      onChange={(e) => setEditedMealDescription(e.target.value)}
                    />
                  </div>
                  <div className="restaurantAdmin_dataWrap">
                    <label htmlFor="" className="restaurantAdmin_label">
                      Image Link
                    </label>
                    <input
                      type="text"
                      className="restaurantAdmin_input"
                      value={editedMealImageLink}
                      onChange={(e) => setEditedMealImageLink(e.target.value)}
                    />
                  </div>
                  <div className="restaurantAdmin__btnWrap">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={AddMeal}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        setaddMealMode(false);
                      }}
                    >
                      Leave
                    </button>
                  </div>
                </form>
                {/* <div className="restaurantAdmin__btnWrap">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      seteditMealMode(false);
                      setaddMealMode(true);
                    }}
                  >
                    Add Meal
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      seteditMealMode(false);
                    }}
                  >
                    Leave
                  </button>
                </div> */}
              </div>
            )}
          </>
        ) : (
          <p style={{ textAlign: "center", fontSize: "5rem" }}>
            You are not a restaurant admin
          </p>
        )}
      </div>
    </>
  );
}

export default RestaurantAdminPage;
