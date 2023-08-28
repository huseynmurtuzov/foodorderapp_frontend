import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import footballImg from '../images/image1.png'
import { useState } from 'react'
import Footer from './Footer'
import Nav from './Nav'


function Contact() {
    const loginBtn = useRef();
    const borbot = useRef();
    const loginInput = useRef();
    const registerInput = useRef();

    useEffect(() => {
        loginBtn.current.click();
    },[])

    const handleLogin = () => {
        if(borbot.current.classList.contains("register")){
            borbot.current.classList.remove("register")
        }
        borbot.current.classList.add('login');

        if(registerInput.current.classList.contains('active')){
            registerInput.current.classList.remove('active');
        }
        if(loginInput.current.classList.contains('unactive')){
            loginInput.current.classList.remove('unactive');
        }
        loginInput.current.classList.add('active');
        registerInput.current.classList.add('unactive');

    }

    const handleRegister = () => {
        if(borbot.current.classList.contains("login")){
            borbot.current.classList.remove("login")
        }
        borbot.current.classList.add('register');
        if(loginInput.current.classList.contains('active')){
            loginInput.current.classList.remove('active');
        }
        if(registerInput.current.classList.contains('unactive')){
            registerInput.current.classList.remove('unactive');
        }
        registerInput.current.classList.add('active');
        loginInput.current.classList.add('unactive');

    }
  return (
    <>
    <div className='header'>
          <a href="#nav" className='btn btn-primary upLink' id='clickRef'><i class="fa-solid fa-arrow-up"></i></a>

        <div className='container'>
        <Nav/>
            <div className='header__content'>
                <img src={footballImg} className='header__content--img'/>
                <div className='contact__form-wrap'>
                    <div className='contact__form-mode-wrap'>
                        <div>
                        <a href="#" className='contact__form-mode' ref={loginBtn} onClick={handleLogin}>Login</a>
                        <a href="#" className='contact__form-mode' onClick={handleRegister}>Register</a>
                        </div>
                        <div>
                        <div className='border-bottom' ref={borbot}></div>
                        </div>
                    </div>
                    <div className='contact__form'>
                        <div className='contact__form-login' ref={loginInput}>
                            <input placeholder='Username' className='contact__input'/>
                            <input placeholder='Password' type='password' className='contact__input'/>
                            <button type="" className='btn btn-primary'>Login</button>
                            <a href="" className='contact__fp'>Forgot Password</a>
                        </div>
                        <div className='contact__form-register' ref={registerInput}>
                            <input placeholder='Username' className='contact__input'/>
                            <input placeholder='Email' type='email' className='contact__input'/>
                            <input placeholder='Password' type='password' className='contact__input'/>
                            <button type="" className='btn btn-primary'>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
    </>
    
  )
}

export default Contact