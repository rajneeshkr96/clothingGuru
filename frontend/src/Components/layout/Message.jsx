import React, { useEffect } from 'react'
import {  toast } from "react-toastify";
import {useDispatch } from "react-redux";
import { clearErrors } from '../../actions/productActions';
function Message({error}) {
  const dispatch = useDispatch()
    useEffect(()=>{
        toast.error(error, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        dispatch(clearErrors())  
    },[])
    
  return (
    <div>
      not found...
    </div>
  )
}

export default Message
