import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export const Add = () => {
  const [book, setBook] = useState({
    title:"",
    desc:"",
    cover:"",
    price:null
  })
  const navigate = useNavigate()
  const handleOnChange = (e)=>{
    setBook((prev)=>({...prev, [e.target.name]:e.target.value}))
  }

  const handleOnClick = async (e)=>{
    e.preventDefault()
    try {
      await axios.post('http://localhost:8800/books', book)
      navigate('/books')
    } catch (error) {
      console.log(error)
    }
    
  }
  console.log(book)
  return (
    <div className='form'>
      <h1>Add new book</h1>
      <input type="text" placeholder='title'  onChange={handleOnChange} name='title'/>
      <input type="text" placeholder='descritpion'  onChange={handleOnChange} name="desc"/>
      <input type="text" placeholder='cover'  onChange={handleOnChange} name="cover"/>
      <input type="text" placeholder='price'  onChange={handleOnChange} name="price"/>
      <button onClick={handleOnClick}> Add </button>
    </div>
  )
}
