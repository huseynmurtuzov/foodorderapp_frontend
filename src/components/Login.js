import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Import for decoding JWTs
import Nav from './Nav';
import Footer from './Footer';
import footballImg from '../images/onlinefoodlogo-removebg-preview.webp';
import RemoveFromBasket from './RemoveFromBasket';
import AddedToBasket from './AddedToBasket';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInId, setToken } from '../store/Product';
import { setTokenRole } from '../store/Product';
import { setTokenName } from '../store/Product';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setIsLoggedIn } from '../store/Product';
import { setLoading } from '../store/Product';
import { setError } from '../store/Product';
function Login() {
  const [inputValue, setInputValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  let token = localStorage.getItem("token")

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const response = await fetch('https://localhost:7092/api/Account/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: inputValue,
          password: passwordValue,
        }),
      });

      const data = await response.json();
      console.log(data)
      if (!response.ok) {
          setError(data[""][0]);
      }

      const token = data.token;

      localStorage.setItem('token', JSON.stringify(token));
      const userData = jwtDecode(token);
      console.log(userData)
   
      navigate("/")
    } catch (e) {
    } finally {
      setLoading(false)
    }
  };

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   if (storedToken) {
  //     try {
  //       const decoded = jwtDecode(JSON.parse(storedToken));
  //       setIsLoggedIn(true);
  //     } catch (err) {
  //       console.error('Invalid token:', err);
  //       localStorage.removeItem('token'); 
  //     }
  //   }
  // }, []); 

  return (
    <>
    {error && <AddedToBasket text={error} />}
      <div className="header"> 
        <div className="container">
          <Nav />
          {(token!="undefined" && token) ? (<p style={{textAlign:'center',fontSize:'5rem'}}>Already Logged in</p>) : (<div className="header__content">
            <img src={footballImg} className="header__content--img" alt="Header Logo" />
            <div className="contact__form-wrap">
              <div className="contact__form-mode-wrap">
                <span className="contact__form-mode" style={{fontSize:"1.6rem"}}>Login</span>
                <div className="border-bottom"></div>
              </div>
              <form onSubmit={handleLogin}>
                <div className="contact__form">
                  <div className="contact__form-login active">
                    <input
                      placeholder="Email"
                      type="email"
                      className="contact__input"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      required
                    />
                    <input
                      placeholder="Password"
                      type="password"
                      className="contact__input"
                      value={passwordValue}
                      onChange={(e) => setPasswordValue(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="btn btn-primary loginBtn"
                      disabled={loading}
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </button>
                    
                     {error && <RemoveFromBasket text={error}/>} 
                    <a href="#" className="contact__fp">
                      Forgot Password
                    </a>
                    <a href="/register" className="contact__fp">
                      No Account? Register
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>)} 
          
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
