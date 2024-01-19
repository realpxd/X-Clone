"use client"
import Image from 'next/image'
import LandingPage from './pages/landingPage'
import HomePage from '@/app/components/home/HomeNav.js'
import {useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation';

export default function Home() {
  const [userRegistered, setUserRegistered] = useState(false)
  const [userData , setUserData] = useState({})
  const router = useRouter();
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
      {userRegistered ? router.push("/feed") : <LandingPage userRegistered={userRegistered} userData={userData} />}
    </main>
  )
}
