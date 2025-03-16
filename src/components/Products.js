import React, { useEffect } from 'react'
import category1 from '../images/category-1.jpg'
import category2 from '../images/category-2.jpg'
import { useState } from 'react'
import category3 from '../images/category-3.jpg'


import ProductDetail from './ProductItself'
import ProductItself from './ProductItself'
import { useProduct } from '../context/ProductContext'
function Products() {
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
    console.log(data)
    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>Hata: {error}</p>;
  return (
    <div className='product' id='product'>
        <div className='container'>
            <div className='product__ft'>
            <h3 className='product__ft--text'>Featured Restaurants</h3>
                <div className='border-bottom'></div>
                <div className='product__ft--img-wrap'>
                    {data.map((product,index) => {
                        return <ProductItself product={product} key={index}/>
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Products