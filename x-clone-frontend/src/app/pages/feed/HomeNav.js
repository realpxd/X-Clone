"use client"
import React from 'react'
import { useState } from 'react'
import ForYouHome from '@/app/components/home/forYouHome'
import FollowingHome from '@/app/components/home/followingHome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage as fasImage , faVideo as fasVideo , faFaceSmile as fasFaceSmile , faLocationDot as fasLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faImage as farImage , faVideo as farVideo , faFaceSmile as farFaceSmile , faLocationDot as farLocationDot } from "@fortawesome/free-regular-svg-icons";


const HomeNav = () => {
    const [currSection, setCurrSection] = useState(true)

    const handleSection = () => {
        let dataType = event.target.getAttribute('datatype')
        dataType = dataType === 'true' ? true : false
        setCurrSection(dataType)
        console.log(currSection)
        let classesToAdd = 'before:absolute before:w-1/3 before:top-7 before:rounded-full before:border-b-4 before:border-blue-900'.split(' ')
        classesToAdd.forEach((className) => {
            if (dataType) event.target.classList.add(className); else event.target.classList.remove(className)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('form submitted')
    }

    return (
        <div>
            <div className='border-b border-grey px-3'>
                <div className='w-full flex flex-row justify-between items-center font-bold text-xl pb-7'>
                    <p>Home</p>
                    <p>Settings</p>
                </div>
                <div className='w-full text-center flex flex-row justify-center items-center font-semibold p-1 pb-3 text-base *:cursor-pointer '>
                    <p className='w-1/2 relative' datatype='true' onClick={handleSection}>For you</p>
                    <p className='w-1/2 relative' datatype='false' onClick={handleSection}>Following</p>
                </div>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col flex-nowrap justify-evenly text-base'>
                <div className='w-full flex flex-row flex-nowrap justify-start items-center '>
                    {/* <Image src={}></Image> */}
                    <p className='mx-3 mr-1 mt-3 bg-red-500 rounded-full px-4 py-2 text-center'>p</p>
                    <textarea className='w-full border-none bg-transparent outline-none line-clamp-none h-10 max-h-fit text-white border-white border-2 text-xl placeholder:text-white placeholder:py-0 mt-3 focus:outline-none focus:border-none focus:placeholder:py-0 ' id='post' placeholder='What is happening?!' />
                </div>
                <div className='w-full flex flex-row flex-nowrap justify-between items-center mt-4 border-b mb-5 pb-3'>
                    <div className='w-1/4 ml-20 flex flex-row flex-nowrap justify-evenly items-center *:cursor-pointer'>
                        {/* <input type="image" placeholder='i' src="" alt="" />
                        <input type="image" placeholder='g' src="" alt="" /> */}
                        {/* <p>m</p>
                        <p>g</p>
                        <p>e</p>
                        <p>l</p> */}

                        <FontAwesomeIcon icon={farImage} />
                        <FontAwesomeIcon icon={fasVideo} />
                        <FontAwesomeIcon icon={farFaceSmile} />
                        <FontAwesomeIcon icon={fasLocationDot} />
                    </div>
                    <input type='submit' value={"POST"} className='py-1.5 px-3 bg-blue-200 rounded-full text-base mr-5' />
                </div>
            </form>
            {currSection ? <ForYouHome /> : <FollowingHome />}
        </div>
    )
}

export default HomeNav