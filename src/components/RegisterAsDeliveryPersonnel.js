import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import { useState } from 'react'
import RemoveFromBasket from './RemoveFromBasket'
function RegisterAsDeliveryPersonnel() {
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [veichleType, setVeichleType] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let token = localStorage.getItem("token")

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://localhost:7092/api/Account/Register/DeliveryPersonnel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name:name,
          phoneNumber:phoneNumber,
          veichleType:veichleType,
          email: email,
          password: password,
          orders:[]
        }),
      });

      if (!response.ok) {
        let data = await response.json();
        console.log(data)
        setError(data[0]["description"]);
      }
      if(response.ok){
        window.location.href="/"
      }



    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register">
        <Nav/>
        {(token=="undefined" || !token) ? ( 
        <div className='register__inner'>
          {error && <RemoveFromBasket text={error}/>}
          <h2 className='register_head'>Register As Delivery Personnel</h2>
          <form action="https://localhost:7092/api/Account/Register/DeliveryPersonnel" className="register__form">
            <div style={{display:'flex', gap:'1rem'}}>
            <div className="register__input-wrap">
              <label htmlFor="name" className='register__label'>Name</label>
              <input type="text" className="register__input" id='name' htmlFor="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="register__input-wrap">
              <label htmlFor="phoneNumber" className='register__label'>Phone Number</label>
              <input type="tel" className="register__input" id='phoneNumber' htmlFor="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            </div>
            </div>
            <div style={{display:'flex',gap:'1rem'}}>
            <div className="register__input-wrap">
              <label htmlFor="veichleType" className='register__label'>Veichle Type</label>
              <input type="text" className="register__input" id='veichleType' htmlFor="veichleType" value={veichleType} onChange={(e) => setVeichleType(e.target.value)}/>
            </div>
            <div className="register__input-wrap">
              <label htmlFor="email" className='register__label'>Email</label>
              <input type="email" className="register__input" id='email' htmlFor="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            </div>
            <div className="register__input-wrap">
                <label htmlFor="password" className='register__label'>Password</label>
                <input type="password" className="register__input" id='password' htmlFor="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
        <button type="button" onClick={e => handleRegister(e)} className='btn btn-primary'>Submit</button>
          
          </form>
        </div>) : (
                <p style={{textAlign:"center",fontSize:"5rem",marginBottom:'30rem'}}>You are already logged in</p>
        )}
        <Footer/>
        </div>      
  )
}

export default RegisterAsDeliveryPersonnel