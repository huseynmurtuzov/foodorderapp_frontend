import React from 'react'
import { useParams } from 'react-router-dom';
import RemoveFromBasket from './RemoveFromBasket';
import Nav from './Nav';
import Footer from './Footer';
import { useState } from 'react';
import AddedToBasket from './AddedToBasket';
function ConfirmEmail() {
    const { email } = useParams();
    const [error, setError] = useState("")
    const [code, setCode] = useState("")
    const [info, setInfo] = useState("")
    const [loading, setLoading] = useState(false)
      const [errorKey, setErrorKey] = useState(0)
    

    const handleConfirm = async (e) => {
        e.preventDefault();
        setLoading(true)
    
        try {
          const response = await fetch('https://localhost:7092/api/Account/ConfirmEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          });
    
          const data = await response.json();
          console.log(data)
          if (!response.ok) {
              setError(data[""][0]);
          setErrorKey(prev => prev + 1)

          }
          else{
            setInfo("Account confirmed successfully")
          }
        } catch (e) {
        } finally {
          setLoading(false)
        }
      };
  return (
    <div className="register">
    <Nav/>

      <div className='register__inner'>
        {error && <RemoveFromBasket text={error} errorkey={errorKey}/>} 
        {info && <AddedToBasket text={info}/>}
        <h2 className='register_head'>Confirm Email</h2>
        <p className='register_head'>We sent u a verification email, check your email to confirm your account!</p>
        {/* <form className="register__form">
          <div style={{display:'flex', gap:'1rem'}}>
          <div className="register__input-wrap">
            <label htmlFor="name" className='register__label'>OTP Code</label>
            <input type="text" className="register__input" onChange={(e) => setCode(e.target.value)}/>
          </div>
          
          </div>
          
          <button type="button" onClick={e  => handleConfirm(e)} className='btn btn-primary'>Confirm</button>
        </form> */}
      </div>

    <Footer/>
    </div>    
  )
}

export default ConfirmEmail