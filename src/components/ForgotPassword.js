import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import { useState } from 'react'
import RemoveFromBasket from './RemoveFromBasket'
import { useNavigate } from 'react-router-dom'
function ForgotPassword() {
    const [name, setName] = useState("")
      const [phoneNumber, setPhoneNumber] = useState("")
      const [address, setAddress] = useState("")
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [error, setError] = useState(null);
      const [errorKey, setErrorKey] = useState(0)
      const [loading, setLoading] = useState(false);
      let token = localStorage.getItem("token")
      let navigate = useNavigate();  
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://localhost:7092/api/Account/ForgotPassword/${email}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            });
            if (!response.ok) {
              let data = await response.json();
              console.log(data)
              setError(data[0]["description"]);
              setErrorKey(prev => prev + 1)
            }
            if(response.ok){  
              navigate(`/forgotPasswordNotification`)
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
        {error && <RemoveFromBasket text={error} errorkey={errorKey}/>} 
        <h2 className='register_head'>Enter your mail</h2>
        <form  className="register__form"> 
          <div className="register__input-wrap">
            <label htmlFor="email" className='register__label'>Email</label>
            <input type="email" className="register__input" id='email' htmlFor="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <button type="button" onClick={e  => handleForgotPassword(e)} className='btn btn-primary'>Submit</button>
        </form>
      </div>
    ) : (
      <p style={{textAlign:"center",fontSize:"5rem",marginBottom:'30rem'}}>You are already logged in</p>
    )}
    <div style={{marginTop:"11rem"}}>
    <Footer/>
    </div>
    </div>      
  )
}

export default ForgotPassword