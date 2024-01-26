"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GetStarted() {
  const [formContent, setFormContent] = useState({})
  const [responseMessage, setResponseMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const value = Object.fromEntries(data.entries())

    try {
      const response = await fetch('http://localhost:5000/addUser', {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()
      console.log(result)

      if (result) {
        setResponseMessage('Account created successfully! 😻')
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
    username: ['Username', 'text'],
    name: ['Name', 'text'],
    email: ['Email', 'email'],
    password: ['Password', 'password']
  }


  return (

    <div className='bg-gray-800 h-screen p-5 text-center flex flex-row flex-nowrap justify-center items-center gap-1'>
      <div className='bg-black w-3/5 h-fit px-5 py-7 rounded-3xl'>
        <h1 className='text-3xl text-white font-bold mb-4 rounded-2xl w-fit pl-4'>Create your account 😴</h1>
        <form onSubmit={(e) => handleSubmit(e)} method="post" className='flex flex-col gap-3 mt-8 flex-nowrap h-full justify-evenly  text-left p-5 pt-0 rounded-3xl'>

          {Object.values(formData).map((item, index) => {
            return (
              <div className='mb-3 rounded-2xl flex flex-coloumn gap-3 flex-nowrap justify-between items-center' key={index}>
                <div className='w-1/6'>
                  <label htmlFor="item[0]">{item[0]}: </label>
                </div>
                <div className='w-full'>
                  <input className='w-full py-3 px-4 rounded-lg bg-transparent border-gray-500 ' type={item[1]} name={item[0]} id={item[0]} placeholder={item[0]} />
                </div>
              </div>
            )
          })}
          <p className='text-red-500 text-xl font-bold text-center mb-2'>{responseMessage}</p>
          <button className='bg-white font-bold text-black px-4 py-2 w-full rounded-full border-2 border-transparent focus:bg-transparent focus:border-2 focus:border-white focus:text-white transition-all' type="submit">Register 🙄</button>
        </form>
      </div>
    </div>
  )
}
