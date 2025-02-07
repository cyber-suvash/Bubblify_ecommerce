import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button } from '@mui/material'
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Pagination.css"
const Pagination = ({handleAddtoCart}) => {
  const [everyproducts,setEveryproducts]=useState([])
  const [currentPage,setCurrentPage]=useState(0)

    const fetchData= async()=>{
       try{
        const apiData= await fetch('https://dummyjson.com/products?limit=100')
        const jsonfile= await apiData.json()
        console.log(jsonfile.products);
        setEveryproducts(jsonfile.products) 
       }
       catch(err){
        console.log(` Server problem ${err}`);
        
       }
      }

      useEffect(()=>{
      fetchData()
      },[])

    

const Page_Size=10
const totalProducts=everyproducts.length
const numberOfPages=Math.ceil(totalProducts/Page_Size)
const start=currentPage+Page_Size
const end=start+Page_Size

const handleCurrentPage=(currPageNumber)=>{
    setCurrentPage(currPageNumber)
    console.log(currPageNumber);
    
}

  return (
    <div><h2>Pagination</h2>
    <div className='page-number-main'> {[...Array(numberOfPages).keys()].map((each)=>(
        <button key={each} className={`page-number ${currentPage===each&&'page-active'}`} onClick={()=>handleCurrentPage(each)}>{each+1}</button>
    ))}</div>
    {!everyproducts?<span>no result found</span>:<div className='product-main'>
     {everyproducts.slice(start,end).map((each)=>(
            <div className='product-card' key={each.id}>
            <img src={each.images} alt={each.title}/>
            <span>price={each.price}</span>
            <div className="card-buttons mt-0">
              <Button size="small" onClick={()=>handleAddtoCart(each)}>
                <ShoppingCartIcon /> Buy Now
              </Button>
            </div>
            </div>
     ))}
    </div>}
    </div>
    

  )
}

export default Pagination