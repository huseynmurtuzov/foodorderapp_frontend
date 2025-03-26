import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import { useState } from 'react'
import RemoveFromBasket from './RemoveFromBasket'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
function ForgotPasswordConfirm() {
      const [password, setPassword] = useState("")
      const [repeatPassword, setRepeatPassword] = useState("")
      const [error, setError] = useState(null);
      const [errorKey, setErrorKey] = useState(0)
      const [loading, setLoading] = useState(false);
      const {email} = useParams();
      console.log(email)
      let token = localStorage.getItem("token")
      let navigate = useNavigate();  
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        if(password === repeatPassword){
          try {
            const response = await fetch(`https://localhost:7092/api/Account/ForgotPasswordConfirm/${email}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json', 
              },
              body:JSON.stringify({
                password:password
              })
            });
            if (!response.ok) {
              let data = await response.json();
              console.log(data)
              setError(data[0]["description"]);
              setErrorKey(prev => prev + 1)
            }
            if(response.ok){
              navigate("/ForgotPasswordNotificationAfter")
            }
          } catch (err) {
          } finally {
            setLoading(false);
          }
        }else{
          setError("Password and repeat password are not equal");
        }
        
        } 
  return (
    <div className="register">
    <Nav/>
    {(!token || token=="undefined") ? (
      <div className='register__inner'>
        {error && <RemoveFromBasket text={error} errorkey={errorKey}/>} 
        <h2 className='register_head'>Change Your Password</h2>
        <form  className="register__form"> 
        <div className="register__input-wrap">
            <label htmlFor="password" className='register__label'>Password</label>
            <input type="password" className="register__input" id='password' htmlFor="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="register__input-wrap">
            <label htmlFor="password" className='register__label'>Repeat Password</label>
            <input type="password" className="register__input" id='repeatPassword' htmlFor="repeatPassword" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/>
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

export default ForgotPasswordConfirm