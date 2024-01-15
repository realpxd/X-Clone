"use client"
import Image from 'next/image'
import LandingPage from './pages/landingPage'
import HomePage from './pages/feed/page.js'
import {useEffect, useState } from 'react'

export default function Home() {
  const [userRegistered, setUserRegistered] = useState(false)
  const [userData , setUserData] = useState({})
  // console.log(userRegistered)
  const checkUserRegistered = async () => {
    const storedUserData = localStorage.getItem('userData');
    if(storedUserData) {
      try {
        const parsedData = await JSON.parse(storedUserData);
        setUserRegistered(true);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing stored user data", error);
      }
    } else { 
      setUserRegistered(false);
    }
  }

  useEffect(() => {
    checkUserRegistered()
  }
  , {})

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <main className='text-2xl w-screen h-screen overflow-hidden'>
      {userRegistered ? <HomePage userRegistered={userRegistered} userData={userData} /> : <LandingPage userRegistered={userRegistered} userData={userData} />}
    </main>
  )
}
