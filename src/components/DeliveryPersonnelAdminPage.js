import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import AddedToBasket from "./AddedToBasket";
import RemoveFromBasket from "./RemoveFromBasket";
import OrderDetail from "./OrderDetail";
import NavInAdmin from "./NavInAdmin";
import OrderFilter from "./OrderFilterDelivery";
import OrderFilterDelivery from "./OrderFilterDelivery";
function DeliveryPersonnelAdminPage() {
  const [deliveryPersonnelData, setDeliveryPersonnelData] = useState({});
  const [editMode, setEditMode] = useState(false)
  const [editedName, setEditedName] = useState("")
  const [editedVeichleType, setEditedVeichleType] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true)
  const [viewData, setviewData] = useState({})
  const [error, setError] = useState("")
  const [info, setInfo] = useState("")
  const [errorKey, setErrorKey] = useState(0)
  const [filter, setFilter] = useState("Prepared")


  const navigate = useNavigate()
  console.log(deliveryPersonnelData)

  let decodedtoken = jwtDecode(localStorage.getItem("token"))
  let role = decodedtoken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]


  //fetch deliverypersonnel datas
  useEffect(() => {
    setLoading(true);
    fetch(`/api/DeliveryPersonnel/${decodedtoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}`, {
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
        setDeliveryPersonnelData(data || {});
        setEditedName(data.name)
        setEditedPhoneNumber(data.phoneNumber)
        setEditedVeichleType(data.veichleType)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(`/api/DeliveryPersonnel/performance/${decodedtoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setviewData(data || {});
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  console.log(viewData)





  const sendEditedDeliveryPersonnel = async () => {
    const response = await fetch(`https://localhost:7092/api/DeliveryPersonnel/${decodedtoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({
            name: editedName,
            veichleType: editedVeichleType,
            phoneNumber: editedPhoneNumber,
        }),
        credentials:"include"
    });

    if (!response.ok) {
        console.log(response);
        setError("Please enter proper delivery personnel detail!");
        setErrorKey(prev => prev + 1)

    } if(response.ok) {
        setInfo("Delivery personnel details updated successfully!")
    }
};
  const handleDelete = () => {
    fetch(`https://localhost:7092/api/DeliveryPersonnel/${decodedtoken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            Accept: "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        setError("We had a problem while deleting your account")
        setErrorKey(prev => prev + 1)
      }
      if(response.ok){
        localStorage.removeItem("token");
        setInfo("Account deleted successfully!")
        navigate("/login")
      }
    });
  };


  if(loading){
    return <p>LOADING...</p>
  }



  if(loading){
    return <LoadingScreen setFilter={setFilter}/>
  }
  return (
    <>
  <div className="container">
    <NavInAdmin/>
    {error && <RemoveFromBasket text={error} errorkey={errorKey}/>}
    {info && <AddedToBasket text={info} />}
    {role === "DeliveryPersonnel" ? (
      <>
        {!editMode ? (
          <div className="deliveryPersonnelAdmin">
            <h1>Delivery Personnel Info</h1>
            <div className="restaurantAdmin__data">
                <div className="restaurantAdmin_dataWrap">
                  <div class="restaurantAdmin__card">
                    <h3 className="restaurantAdmin__card--h3">Name</h3>
                    <p className="restaurantAdmin__card--p">{deliveryPersonnelData.name}</p>
                  </div>
                </div>

                <div className="restaurantAdmin_dataWrap">
                  <div class="restaurantAdmin__card">
                    <h3 className="restaurantAdmin__card--h3">Veichle Type</h3>
                    <p className="restaurantAdmin__card--p">{deliveryPersonnelData.veichleType}</p>
                  </div>
                </div>
                <div className="restaurantAdmin_dataWrap">
                  <div class="restaurantAdmin__card">
                    <h3 className="restaurantAdmin__card--h3">Phone Number</h3>
                    <p className="restaurantAdmin__card--p">{deliveryPersonnelData.phoneNumber}</p>
                  </div>
                </div>
                </div>
            {/* <div className="deliveryPersonnelAdmin_dataWrap">
              <p>Name</p>
              <h3 className="deliveryPersonnelAdmin__name">
                {deliveryPersonnelData.name}
              </h3>
            </div>
            <div className="deliveryPersonnelAdmin_dataWrap">
              <p>Veichle Type</p>
              <p className="deliveryPersonnelAdmin__address">
                {deliveryPersonnelData.veichleType}
              </p>
            </div>
            <div className="deliveryPersonnelAdmin_dataWrap">
              <p>Phone Number</p>
              <p className="deliveryPersonnelAdmin__phone">
                {deliveryPersonnelData.phoneNumber}
              </p>
            </div> */}
            <div className="deliveryPersonnelAdmin__orders">
              <h2 style={{ textAlign: "center" }}>Orders</h2>
              <OrderFilterDelivery setFilter={setFilter}/>

              <div className="deliveryPersonnelAdmin__orders--inner">
                {filter == "All" && deliveryPersonnelData.orders.map((r) => (
                 (<OrderDetail order={r} />)
              ))}
              </div>
              {/* {filter == "Pending" && pendingOrders.map((r) => {
                 <OrderDetail order={r}/>
              })}
              {filter == "Delivered" && deliveredOrders.map((r) => {
                 <OrderDetail order={r}/>
              })} */}
               <div className="deliveryPersonnelAdmin__orders--inner">
                {deliveryPersonnelData.orders.map((r) => (
                 (filter==r.status) && (<OrderDetail order={r} />)
              ))}

              </div>
              {Object.keys(viewData).length > 0 && (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <caption style={{ fontSize: '1.5rem', marginBottom: '10px', fontWeight: 'bold' }}>
                  Delivery Personnel Performance
                </caption>
                <thead>
                  <tr>
                    <th
                      style={{
                        border: '1px solid #ddd',
                        textAlign: 'center',
                        padding: '10px',
                        backgroundColor: '#f4f4f4',
                      }}
                    >
                      Delivery Personnel ID
                    </th>
                    <th
                      style={{
                        border: '1px solid #ddd',
                        textAlign: 'center',
                        padding: '10px',
                        backgroundColor: '#f4f4f4',
                      }}
                    >
                      Delivery Personnel Name
                    </th>
                    <th
                      style={{
                        border: '1px solid #ddd',
                        textAlign: 'center',
                        padding: '10px',
                        backgroundColor: '#f4f4f4',
                      }}
                    >
                      Total Delivered Orders
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: '1px solid #ddd', textAlign: 'center', padding: '10px' }}>{viewData.deliveryPersonnelId}</td>
                    <td style={{ border: '1px solid #ddd', textAlign: 'center', padding: '10px' }}>{viewData.deliveryPersonnelName}</td>
                    <td style={{ border: '1px solid #ddd', textAlign: 'center', padding: '10px' }}>{viewData.totalDeliveredOrders}</td>
                  </tr>

                </tbody>
              </table>

              )}
            </div>
            <div className="deliveryPersonnelAdmin__btnWrap">
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
            <form action="" className="deliveryPersonnelAdmin">
              <h1>Edit Delivery Personnel Info</h1>
              <div className="deliveryPersonnelAdmin_dataWrap">
                <label htmlFor="" className="deliveryPersonnelAdmin_label">
                  Name
                </label>
                <input
                  type="text"
                  className="deliveryPersonnelAdmin_input"
                  value={editedName}
                  placeholder={deliveryPersonnelData.name}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>
              <div className="deliveryPersonnelAdmin_dataWrap">
                <label htmlFor="" className="deliveryPersonnelAdmin_label">
                  Veichle Type
                </label>
                <input
                  type="text"
                  className="deliveryPersonnelAdmin_input"
                  value={editedVeichleType}
                  placeholder={deliveryPersonnelData.veichleType}
                  onChange={(e) => setEditedVeichleType(e.target.value)}
                />
              </div>
              <div className="deliveryPersonnelAdmin_dataWrap">
                <label htmlFor="" className="deliveryPersonnelAdmin_label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="deliveryPersonnelAdmin_input"
                  value={editedPhoneNumber}
                  placeholder={deliveryPersonnelData.phoneNumber}
                  onChange={(e) => setEditedPhoneNumber(e.target.value)}
                />
              </div>
              <div className="deliveryPersonnelAdmin__btnWrap">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={sendEditedDeliveryPersonnel}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    setEditMode(false);
                  }}
                >
                  Leave
                </button>
              </div>
            </form>
          </div>
        )}
      </>
    ) : (
      <p style={{ textAlign: "center", fontSize: "5rem" }}>
        You are not a delivery personnel
      </p>
    )}
  </div>
  <Footer />
</>

  );
}

export default DeliveryPersonnelAdminPage