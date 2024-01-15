"use client"

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

export default function Page() {
  const [formContent , setFormContent] = useState({})
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const value = Object.fromEntries(data.entries())
    console.log(value)
    
    const response = await fetch('http://localhost:5000/loginUser', {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await response.json()
    console.log(result)
    localStorage.setItem('userData' , JSON.stringify(result))
    console.log(localStorage.getItem('userData'))

  }
  
  var formData = {
    email: ['Email' , 'text'],
    password: ['Password' , 'password'],
  }
  

  return (
    
    <div className='bg-red-500 h-screen p-5 text-center flex flex-row flex-nowrap justify-center items-center gap-1'>
      <div className='bg-red-400 p-5 rounded-3xl'>
        <h1 className='text-2xl text-white font-bold mb-4 bg-red-500 py-1.5 px-3 rounded-2xl w-fit m-auto'>Welcome Back!</h1>
        <form onSubmit={(e)=>handleSubmit(e)} method="post" className='text-left bg-red-500 p-5 rounded-3xl'>
          
          {Object.values(formData).map((item , index) => {
            return (
              <div className='mb-3 rounded-2xl overflow-hidden flex flex-coloumn flex-nowrap gap-4 justify-between items-center' key={index}>
                <label className='font-semibold text-white' htmlFor={item[0]}>{item[0]}: </label>
                <input className='rounded-2xl font-bold' type={item[1]} name={item[0]} id={item[0]} placeholder={item[0].toLowerCase()} />
              </div>
            )
          })}
          
          <div>
            <button className='bg-black font-semibold text-white px-4 py-2 w-full rounded-2xl mt-4 border-2 border-transparent hover:bg-transparent hover:border-2 hover:border-black transition-all' type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
