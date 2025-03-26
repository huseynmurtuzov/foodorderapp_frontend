import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from './Nav';
import Food from './Food';
import Footer from './Footer';
function SearchMealResult() {
    const {query} = useParams();
    const [meals, setMeals] = useState([])
    const [error, setError] = useState("")
    useEffect(() => {
        fetch(`https://localhost:7092/searchMeal/${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                // Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("We had a problem while fetching meals! Try again later!");
            }
            return response.json(); // JSON verisini parse edip return ediyoruz
        })
        .then((data) => {
            console.log("Fetched data:", data);
            setMeals(data) // Burada veriyi görebilirsin
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            setError(error.message);
        });
    }, [query]);  // query değiştiğinde useEffect tekrar çalışır
    
  return (
   <>
    <div className='container'>
        <Nav/>
        <div className='product__ft--img-wrap' style={{display:'flex',flexDirection:"column"}}>
            {meals[0] == "T" && <p style={{fontSize:"3rem"}}>{meals}</p>}
            {meals[0] != "T" && meals.map((product,index) => {
                return <Food product={product} key={index}/>
            })}
        </div>
    </div>
    <Footer/>   
   </>
  )
}

export default SearchMealResult