import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import { useState } from 'react'
import RemoveFromBasket from './RemoveFromBasket'

function Register() {
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
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
      const response = await fetch('https://localhost:7092/api/Account/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name:name,
          phoneNumber:phoneNumber,
          address:address,
          email: email,
          password: password,
          orders:[],
          restaurantReviews:[],
          restaurants:[],
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
    {(!token || token=="undefined") ? (
      <div className='register__inner'>
        {error && <RemoveFromBasket text={error}/>} 
        <h2 className='register_head'>Register</h2>
        <form action="https://localhost:7092/api/Account/Register" className="register__form">
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
            <label htmlFor="address" className='register__label'>Address</label>
            <input type="text" className="register__input" id='address' htmlFor="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
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
          <button type="button" onClick={e  => handleRegister(e)} className='btn btn-primary'>Submit</button>
        </form>
      </div>
    ) : (
      <p style={{textAlign:"center",fontSize:"5rem",marginBottom:'30rem'}}>You are already logged in</p>
    )}
    <Footer/>
    </div>      
  )
}

export default Register