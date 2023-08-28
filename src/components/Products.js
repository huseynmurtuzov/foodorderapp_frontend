import React from 'react'
import category1 from '../images/category-1.jpg'
import category2 from '../images/category-2.jpg'
import category3 from '../images/category-3.jpg'


import ProductDetail from './ProductItself'
import ProductItself from './ProductItself'
import { useProduct } from '../context/ProductContext'
function Products() {
    const data = useProduct()

  return (
    <div className='product' id='product '>
        <div className='container'>
            <div className='product__mw'>
                <h3 className='product__mw--text'>Most Wanted Products</h3>
                <div className='border-bottom'></div>
                <div className='product__mw--img-wrap'>
                    <div className='product__itself'>
                        <img src={category1} className='product__mw--img'/>
                    </div>
                    <div className='product__itself'>
                        <img src={category2} className='product__mw--img'/>
                    </div>
                    <div className='product__itself'>
                        <img src={category3} className='product__mw--img'/>
                    </div>
                </div>
            </div>
            <div className='product__ft'>
            <h3 className='product__ft--text'>Featured Products</h3>
                <div className='border-bottom'></div>
                <div className='product__ft--img-wrap'>
                    {data[0].map((product,index) => {
                        return <ProductItself product={product} key={index}/>
                    })}
                </div>
            </div>
            <div className='product__lt'>
            <h3 className='product__lt--text'>Latest Products</h3>
                <div className='border-bottom'></div>
                <div className='product__lt--img-wrap'>
                    {data[1].map((product,index) => {
                        return <ProductItself product={product} key={index}/>
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Products