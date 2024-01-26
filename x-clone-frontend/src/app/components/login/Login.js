"use client"

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [formContent, setFormContent] = useState({})
  const [responseMessage, setResponseMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const value = Object.fromEntries(data.entries())
    console.log(value)
    try {
      const response = await fetch('http://localhost:5000/loginUser', {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()
      console.log(result)
      if (result) {
        setResponseMessage('Login Successful! 💖')
        localStorage.setItem('userData', JSON.stringify(result))
        console.log(localStorage.getItem('userData'))
        router.push('/feed')
      } else {
        setResponseMessage('Something went wrong! 😫')
      }
    } catch (err) {
      console.log(err)
    }
  }

  var formData = {
    email: ['Email', 'text'],
    password: ['Password', 'password'],
  }


  return (

    <div className='bg-gray-800 h-screen p-5 text-center flex flex-row flex-nowrap justify-center items-center gap-1'>
      <div className='bg-black p-5 rounded-3xl'>
        <h1 className='text-2xl text-white font-bold mb-4 rounded-2xl w-fit '>Welcome Back! 😙</h1>
        <form onSubmit={(e) => handleSubmit(e)} method="post" className='flex flex-col flex-nowrap justify-evenly text-left p-5 rounded-3xl'>

          {Object.values(formData).map((item, index) => {
            return (
              <div className='mb-3 rounded-2xl flex flex-coloumn flex-nowrap gap-4 justify-between items-center' key={index}>
                <label className='font-semibold text-white' htmlFor={item[0]}>{item[0]}: </label>
                <input className='rounded-xl font-semibold bg-transparent border-gray-600' type={item[1]} name={item[0]} id={item[0]} placeholder={item[0].toLowerCase()} />
              </div>
            )
          })}

          <div>
            <p className='text-red-500 text-xl font-bold text-center mb-2'>{responseMessage}</p>
            <button className='w-full bg-white font-bold text-black px-4 py-2 rounded-full mt-4 border-2 border-transparent hover:bg-transparent hover:border-2 hover:text-white hover:border-white transition-all' type="submit">Submit 😋</button>
          </div>
        </form>
      </div>
    </div>
  )
}
