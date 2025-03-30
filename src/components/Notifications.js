import { jwtDecode } from 'jwt-decode';
import React, { useState,useEffect, useReducer, useRef } from 'react'
import Nav from './Nav';
import Footer from './Footer';


function Notifications() {
    const [notifications, setNotifications] = useState([])
    const token1 = JSON.parse(localStorage.getItem('token'));
    const userData = jwtDecode(token1);
    const [loading, setLoading] = useState(false)
    const id = userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    const notDiv = useRef()
    const btn = useRef()
    console.log(id)
    useEffect(() => {
      
        setLoading(true);
        fetch(`https://localhost:7092/api/Notification/getNotifications/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);    
            }
            return response.json();
          })
          .then((data) => {
            setNotifications(data || {});
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          })
          .finally(() => {
            setLoading(false);
          });
          setLoading(false)
      }, []);
    const setAsRead = (id) => {
        fetch(`https://localhost:7092/api/Notification/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              // Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);    
              }
              if(response.ok){
                notDiv.current.classList.remove("unread")
                notDiv.current.classList.add("read")
                btn.current.classList.add("btn-read")
              }
            })
            .finally(() => {
              setLoading(false);
            });
            setLoading(false)
    }
  return (
    <>
    <div className='container'>
<Nav/>
    <div className="notifications-container">
      <h2 className="notifications-title">Notifications</h2>
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item ${notification.isRead ? "read" : "unread"}`}
            ref={notDiv}
          >
            <p className="notiification-upperdata">By Admin | <span>{notification.date.split('T')[0]}</span></p>
            <div className="notification-content">
              <p className="notification-message">{notification.message}</p>
              <button ref={btn} className={`btn btn-primary ${notification.isRead ? "btn-read" : ""}`}  onClick={() => setAsRead(notification.id)}><i class="fa-solid fa-check"></i></button>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <p className="no-notifications">No notifications available.</p>
        )}
      </div>
    </div>
    </div>
    </>
    
  )
}

export default Notifications