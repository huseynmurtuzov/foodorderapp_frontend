import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/onlinefoodlogo-removebg-preview.webp';
import { OffCanvasExample } from './Project';
import { removeToken } from '../store/Product';
import { removeTokenRole } from '../store/Product';
import { removeTokenName } from '../store/Product';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import LoadingScreen from './LoadingScreen';





function Nav() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [token, setToken] = useState("")
  const [tokenDataRole, setTokenDataRole] = useState("")
  const [tokenDataName, setTokenDataName] = useState("")
  
  useEffect(() => {
    try {
      const token1 = JSON.parse(localStorage.getItem('token'));
      if (!token1 || token1==undefined) throw new Error("Token bulunamadı!");
      setLoading(true)
      const userData = jwtDecode(token1);
      setTokenDataRole(userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
      setTokenDataName(userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
      console.log(userData)
      setToken(token1);
    } catch (err) {
      console.error("Token decode hatası:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);



        
    
  const Logout = () => {
    localStorage.removeItem('token');
    setToken("")
    setTokenDataName("")
    setTokenDataRole("")
    window.location.href = "/login";
  };


  // let token1 = localStorage.getItem("token")
  // const userData1 = jwtDecode(token1);
  // console.log(userData1)
  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   if (storedToken) {
  //     try {
  //       const userData = jwtDecode(JSON.parse(storedToken));
  //       setTokenDataRole(userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]); 
  //       setTokenDataName(userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]); 
  //       setToken(storedToken);
  //       console.log(userData)
  //     } catch (err) {
  //       console.error('Geçersiz token:', err);
  //       localStorage.removeItem('token');
  //     }
  //   }
  // }, []); 

const renderNavContent = () => {
  
  if(token && tokenDataRole == "SuperAdmin"){
    return (
      <>
    <li className="nav__item">
      <Link className="nav__link" to="/">
        Welcome, {tokenDataName}
      </Link>
    </li>
    <li className="nav__item">
      <Link className="nav__link" to="/">
        Home
      </Link>
    </li>
    <li className="nav__item">
      <Link className="nav__link" to="/restaurants">
        Restaurants
      </Link>
    </li>
    <li className="nav__item">
      <Link className="nav__link" to="/" onClick={Logout}>
        Logout
      </Link>
    </li>
    <div>
      <OffCanvasExample />
    </div>
  </>
)
  }else if(tokenDataRole == "DeliveryPersonnel"){
    return (
<>
    <li className="nav__item">
      <Link className="nav__link" to="/DeliveryPersonnelAdminPage">
        Welcome, {tokenDataName}
      </Link>
    </li>
    <li className="nav__item">
      <Link className="nav__link" to="/">
        Home
      </Link>
    </li>
    <li className="nav__item">
      <Link className="nav__link" to="/" onClick={Logout}>
        Logout
      </Link>
    </li>
    <div>
      <OffCanvasExample />
    </div>
  </>
    )
  }else if(tokenDataRole == "Restaurant"){
    return (
    <>
        <li className="nav__item">
          <Link className="nav__link" to="/RestaurantAdminPage">
            Welcome, {tokenDataName}
          </Link>
        </li>
        <li className="nav__item">
          <Link className="nav__link" to="/">
            Home
          </Link>
        </li>
        <li className="nav__item">
          <Link className="nav__link" to="/" onClick={Logout}>
            Logout
          </Link>
        </li>
        <div>
          <OffCanvasExample />
        </div>
      </>
    )
      }else if(tokenDataRole == "Customer"){
          return (
          <>
              <li className="nav__item">
                <Link className="nav__link" to="/CustomerAdminPage">
                  Welcome, {tokenDataName}
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/restaurants">
                  Restaurants
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/" onClick={Logout}>
                  Logout
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__svg" to="/basket">
                  <i className="fa-solid fa-bag-shopping fa-3x"></i>
                </Link>
              </li>
              <div>
                <OffCanvasExample />
              </div>
            </>
          )
      }
      else{
        return (
          <>
         
              <li className="nav__item">
                <Link className="nav__link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/restaurants">
                  Restaurants
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/login">
                  Login
                </Link>
              </li>
              <div>
                <OffCanvasExample />
              </div>
            </>
        )
      }
}



  return (
    <>
      <nav className="nav" id="nav">
        <div className="nav__logo-wrap">
          <Link to="/">
            <img src={logo} className="nav__logo" alt="MirtizOrder Logo" />
          </Link>
          <p className="nav__logo-text">MurtuzAminOrder.com</p>
        </div>
        <ul>
          {renderNavContent()}
          {/* {(token && tokenDataName == "SuperAdmin") ? (
            <>
              <li className="nav__item">
                <Link className="nav__link" to="/">
                  Welcome, {tokenDataName}
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/restaurants">
                  Restaurants
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/" onClick={Logout}>
                  Logout
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__svg" to="/basket">
                  <i className="fa-solid fa-bag-shopping fa-3x"></i>
                </Link>
              </li>
              <div>
                <OffCanvasExample />
              </div>
            </>
          )
           : (
            <>
              <li className="nav__item">
                <Link className="nav__link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/restaurants">
                  Restaurants
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/register">
                  Register
                </Link>
              </li>
              <div>
                <OffCanvasExample />
              </div>
            </>
          )} */}
        </ul>
      </nav>
    </>
  );
}

export default Nav;
