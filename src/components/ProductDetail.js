import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import Footer from './Footer';
import { useEffect } from 'react';
import Nav from './Nav';
import Food from './Food';
import { jwtDecode } from 'jwt-decode';
import AddedToBasket from './AddedToBasket';
import RemoveFromBasket from './RemoveFromBasket';
// import { set } from 'core-js/core/dict';

const btn = document.querySelector('#clickRef');



function ProductDetail({p}) {
  const [quantity, setQuantity] = useState();
  const [data, setData] = useState([])
  const [userData, setUserData] = useState();
  const [commentText, setCommentText] = useState("")
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [comments, setComments] = useState([])
  const [info, setInfo] = useState("")
  const [decodedToken, setDecodedToken] = useState("")
  const [loggedInId, setLoggedInId] = useState("")
  const [tokenDataRole, setTokenDataRole] = useState("")
  const [name, setName] = useState("")
  const [errorKey, setErrorKey] = useState(0)
 // const datas = ((data[0].concat(data[1])));
  let token = JSON.parse(localStorage.getItem("token"))
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
      setLoggedInId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
      setTokenDataRole(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
      setName(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
    }
  }, [token]);  // Sadece token değiştiğinde çalışır
  
  const timestamp = Date.now(); // Get current timestamp in milliseconds
  const date = new Date(timestamp)
  let formattedDate = date.getFullYear() + '-' + 
                      String(date.getMonth() + 1).padStart(2, '0') + '-' + 
                      String(date.getDate()).padStart(2, '0')
  const btn = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`https://localhost:7092/api/Restaurant/get-meals/${window.location.href.split('/').pop()}`)
    .then((response) => {
        if(!response.ok){
            throw new Error("Failed fetch operation");
        }
        return response.json()
    })
    .then((data) => {
        setData(data);
    })
    .catch((error) => {
        setError(error.message);
        setErrorKey(prev => prev + 1)
        setLoading(false)
    })
},[])
useEffect(() => {
  fetch(`https://localhost:7092/api/RestaurantReviews/${window.location.href.split('/').pop()}/reviewsByRestaurant`,{
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  },
  credentials:"include" 
  }
   )
  .then((response) => {
      if(!response.ok){
          throw new Error("Failed fetch operation");
      }
      return response.json()
  })
  .then((data) => {
      setComments(data);
  })
  .catch((error) => {
      setError(error.message);
      setErrorKey(prev => prev + 1)
      setLoading(false)
  })
},[])




const sendComment = async() => {
  const response = await fetch(
    "https://localhost:7092/api/RestaurantReviews",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment: commentText,
        rating:parseInt(rating),
        restaurantId:parseInt(window.location.href.split('/').pop()),
        customerId:loggedInId
      }),

    })
    if(!response.ok){
      setError("Can't comment blank!");
    }
    if(response.ok){
      setCommentText("")
      setRating(0);
      // window.location.reload();
      setInfo("Comment added successfully")
      let div = document.querySelector(".comments");
      let element = ` <div class="exactComment">
                      <div class="exactComment__header">
                        <p class="exactComment__name">${name}</p>
                        <p class="exactComment__date">${formattedDate}</p>
                      </div>
                      <div class="exactComment__content">
                        <p class="exactComment__text">${commentText}</p>
                        <p class="exactComment__rating">⭐ ${rating}</p>
                      </div>
                    </div>`
                    div.innerHTML+=element;
    }
    
}
const deleteComment = async(id) => {
  const response = await fetch(
    `https://localhost:7092/api/RestaurantReviews/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    if(response.ok){
      setInfo("Comment deleted successfully!");
      let commentdiv = document.getElementById(id);
      commentdiv.style.display = "none"

    }else{
      setError("We had a problem while deleting your comment! Please try again later!")
      setErrorKey(prev => prev + 1)
    }
}
console.log(data)
if (loading) return <p>Yükleniyor...</p>;
// if (error) return <p>Hata: {error}</p>;
  // const handleAddBasket = () => {
  //   dispatch(addBasket(exactProduct));
  // }

  // const handleChange = (e) => {
  //   // dispatch(changeQuantity(e.target.value));
  // }
    
  return (

      <div id='productDetail'>
        {error && <RemoveFromBasket text={error} errorkey={errorKey}/>}
        {info && <AddedToBasket text={info} />}
        <a href="#nav" className='btn btn-primary upLink' ref={btn}><i class="fa-solid fa-arrow-up"></i></a>
        <div className='container'>
        <Nav/>
            {/* <h3 className='product__ft--text'>{product.name}</h3> */}
            <div className='product__ft--img-wrap' style={{display:'flex',flexDirection:"column"}}>
                {data.map((product,index) => {
                    return <Food product={product} key={index} />
                })}
            </div>
            <div className='comments'>
              <p style={{fontSize:'3rem',textAlign:'center'}}>Comments</p>
              {comments.length == 0 && <p style={{fontSize:'3rem',textAlign:"center"}}>There are no comments here yet</p>}
                {comments.map((c) => {
                  console.log("Customer id",c.customerId)
                  return (
                    <div className="exactComment" id={c.id}>
                      <div className="exactComment__header">
                        <p className="exactComment__name">{c.customerName}</p>
                        <p className="exactComment__date">{c.reviewDate.split('T')[0]}</p>
                      </div>
                      <div className="exactComment__content">
                        <p className="exactComment__text">{c.comment}</p>
                        <p className="exactComment__rating">⭐ {c.rating}</p>
                      </div>
                      {loggedInId == c.customerId && (
                        <button
                          type="button"
                          className="exactComment__btn"
                          onClick={() => deleteComment(c.id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      )}
                    </div>

                    
                  )
                })}
            </div>
            {token && tokenDataRole == "Customer" && (
              <div className="comment__wrap">
                <h2 className='comment__header' style={{textAlign:"center"}}>Add Comment</h2>
                <div className="comment__form">
                <div class="comment-container">
                    <div class="input-group">
                        <textarea id="comment" class="comment-box" placeholder="Write your comment..." required value={commentText} onChange={e => setCommentText(e.target.value)}></textarea>
                        <input id="rating" type="number" class="rating-input" min="0" max="5" value={rating} onChange={e => setRating(e.target.value)}/>
                    </div>
                    <button class="submit-btn" onClick={sendComment}>Submit</button>
                </div>
                  {/* <label htmlFor="" className='comment__form-label' >Comment Text</label>
                  <textarea type="text" className='comment__form-text' required value={commentText} onChange={e => setCommentText(e.target.value)}/> */}
                </div>
                {/* <div className="comment__form">
                  <label htmlFor="" className='comment__form-label'>Rating</label>
                  <input type="number" min={0} max={5} required className='comment__form-rating' value={rating} onChange={e => setRating(e.target.value)}/>
                </div> */}
                {/* <button className='btn btn-primary' onClick={sendComment}>Submit</button> */}
              </div>
            )}
          {/* <div className='detail'>
              <img src={exactProduct.img} alt="" className='detail__img'/>
            
            <div className='detail__content'>
              <p className='detail__breadcrumb'>Home/T-Shirt</p>
              <h1 className='detail__name'>{exactProduct.name}</h1>
              <p className='detail__price'>${exactProduct.price}.00</p>
              <select className='detail__select'>
                  <option className='detail__option' value="">Select Size</option>
                  <option className='detail__option' value="sm">Small</option>
                  <option className='detail__option' value="md">Medium</option>
                  <option className='detail__option' value="lg">Large</option>
                  <option className='detail__option' value="XL">XL</option>
                  <option className='detail__option' value="2Xl">XXL</option>
                  <option className='detail__option' value="3XL">XXXL</option>
              </select>
              <div className='detail__wrap'>
                <input className='detail__quantity' value={exactProduct.quantity}  onChange={e => handleChange(e)}/>
                <button className="btn btn-primary" onClick={handleAddBasket}>Add to Cart</button>
              </div>
              <p className='detail__label'>Product Details</p>
              <p className='detail__text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra.</p>
            </div>
          </div>
          <div className='product__ft' style={{marginBottom:'5rem'}}>
            <div className='detail__inner-wrap'>
              <h3 className='product__ft--text'>Related Products</h3>
              <Link to='/products'>View More</Link>
            </div>
                <div className='product__ft--img-wrap'>
                {data[0].map((product,index) => {
                    const handleClick = () => {
                      dispatch(setExactProduct(product));
                      btn.current.click();
                    }
                      
                    return (
                          
                  <Link to='/productDetail' className='link' style={{textDecoration:'none',color:'black'}} >
                  <div className='product__itself' onClick={handleClick}>   
                  <>
                  <img src={product.img} className='product__ft--img'/>
                  <div className='product__ft--detail'>
                      <p className='product__ft--detail-name'>{product.name}</p>
                      <div className='product__ft--detail-star-wrap'>
                          {product.score > 4 ? (
                              <>
                                  <i class="fa-solid fa-star product__ft--detail-star"></i>
                                  <i class="fa-solid fa-star product__ft--detail-star"></i>
                                  <i class="fa-solid fa-star product__ft--detail-star"></i>
                                  <i class="fa-solid fa-star product__ft--detail-star"></i>
                                  <i class="fa-solid fa-star product__ft--detail-star"></i>
                              </>
                              
                          ) : (
                              <>
                                  <i class="fa-solid fa-star product__ft--detail-star"></i>
                                  <i class="fa-solid fa-star product__ft--detail-star"></i>
                                  <i class="fa-solid fa-star product__ft--detail-star"></i>
                                  <i class="fa-solid fa-star product__ft--detail-star"></i>
                                  <i class="fa-regular fa-star product__ft--detail-star"></i>
                              </>
                          )}
                      </div>
                      <p className='product__ft--detail-price'>${product.price}.00</p>   
                      </div>
                  </> 
                  </div>
                  </Link>
                )})
              }
                </div>
            </div> */}
        </div>
        <Footer/>
      </div>
  )}

export default ProductDetail;
  
