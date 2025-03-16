import React, { useEffect } from 'react'
import ProductItself from './ProductItself'
import { useState } from 'react'
import Nav from './Nav'
import Footer from './Footer'

function Restaurants() {
    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch("https://localhost:7092/api/Restaurant")
        .then((response) => {
            if(!response.ok){
                throw new Error("Failed fetch operation");
            }
            return response.json()
        })
        .then((data) => {
            setData(data);
            setLoading(false)
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        })
    },[])
    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>Hata: {error}</p>;
  return (

    <>
    <div className="container">
    <Nav/>
    <div className='product' id='product' style={{marginBottom:"5rem",marginTop:"-10rem"}}>
        <div className='container'>
            <div className='product__ft'>
            <h3 className='product__ft--text'>Restaurants</h3>
                <div className='border-bottom'></div>
                <div className='product__ft--img-wrap'>
                    {data.map((product,index) => {
                        return <ProductItself product={product} key={index}/>
                    })}
                </div>
            </div>
        </div>
    </div>
    </div>
    <Footer/>
    
    </>
  )
}

export default Restaurants