import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import { useState } from 'react'
import RemoveFromBasket from './RemoveFromBasket'
import { useNavigate } from 'react-router-dom'
function RegisterAsRestaurant() {
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [workingHours, setWorkingHours] = useState("")
  const [image, setImage] = useState("")
  const [error, setError] = useState(null);
  const [errorKey, setErrorKey] = useState(0)
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  let token = localStorage.getItem("token")
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://localhost:7092/api/Account/Register/Restaurant', {
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
          workingHours:workingHours,
          image:image,
          orders:[],
          restaurantReviews:[],
          meals:[],
          categories:[],
          customers:[]
        }),
      });

      if (!response.ok) {
        let data = await response.json();
        console.log(data)
        setError(data[0]["description"]);
        setErrorKey(prev => prev + 1)
      }
      if(response.ok){  
        navigate(`/confirmEmail/${encodeURIComponent(email)}`)
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
            {error && <RemoveFromBasket text={error} errorkey={errorKey}/>} 
            <h2 className='register_head'>Register As Restaurant</h2>
            <form action="https://localhost:7092/api/Account/Register/Restaurant" className="register__form">
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
              <div style={{display:'flex',gap:'1rem'}}>
                <div className="register__input-wrap">
                  <label htmlFor="password" className='register__label'>Password</label>
                  <input type="password" className="register__input" id='password' htmlFor="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="register__input-wrap">
                  <label htmlFor="workingHours" className='register__label'>Working Hours</label>
                  <input type="text" className="register__input" id='workingHours' htmlFor="workingHours" value={workingHours} onChange={(e) => setWorkingHours(e.target.value)}/>
                </div>
              </div>
              <div className="register__input-wrap">
                <label htmlFor="image" className='register__label'>Image</label>
                <input type="text" className="register__input" id='image' htmlFor="image" value={image} onChange={(e) => setImage(e.target.value)}/>
              </div>
          <button type="button" onClick={e => handleRegister(e)} className='btn btn-primary'>Submit</button>
            
            </form>
          </div>
        ) : (      <p style={{textAlign:"center",fontSize:"5rem",marginBottom:'30rem'}}>You are already logged in</p>
        )}
        <Footer/>
        </div>      
      )
}

export default RegisterAsRestaurant