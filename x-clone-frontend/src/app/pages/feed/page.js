"use client"
import React from 'react'
import { useState } from 'react'
import HomeNav from '@/app/components/home/HomeNav';
import ExploreNav from '@/app/components/explore/ExploreNav';
import NotifNav from '@/app/components/notifications/NotifNav';
import SideNav from '@/app/components/SideNav/SideNav';

const HomePage = () => {
  return (
    <div className='flex flex-coloumn flex-nowrap h-screen w-screen '>
      <SideNav />
      <div className='h-screen bg-black text-white w-full py-3'>
        <HomeNav />
      </div>
      {/* <div>right</div> */}
    </div>
  )
}

export default HomePage