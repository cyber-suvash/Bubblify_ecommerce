import React from 'react'
import { useState } from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';

const QuantityBox = () => {

 const [count,setCount]=useState(1)

 const handleCount=()=>{
setCount((prev)=>prev+1)
    
 }

 const handleMinusCount=()=>{

    if(count>1){
        setCount((prev)=>prev-1)
    }
    
 }

  return (
    <div className='QuantityBox'>
       
       <Button onClick={handleMinusCount}><RemoveCircleIcon/></Button>
       <div>{count}</div>
       <Button onClick={handleCount}> <AddCircleIcon/></Button>
    </div>
  )
}

export default QuantityBox