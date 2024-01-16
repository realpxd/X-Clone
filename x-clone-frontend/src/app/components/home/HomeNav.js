"use client"
import React, { useRef } from 'react'
import { useState } from 'react'
import ForYouHome from '@/app/components/home/forYouHome'
import FollowingHome from '@/app/components/home/followingHome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass as fasMagnifyingGlass, faImage as fasImage, faVideo as fasVideo, faFaceSmile as fasFaceSmile, faLocationDot as fasLocationDot, faGear as fasGear } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass as farMagnifyingGlass, faImage as farImage, faVideo as farVideo, faFaceSmile as farFaceSmile, faLocationDot as farLocationDot } from "@fortawesome/free-regular-svg-icons";
import Link from 'next/link'


const HomeNav = () => {
    const [currSection, setCurrSection] = useState(true)
    const [newPost, setNewPost] = useState(false) // this is a prop that will be passed to forYouHome.js to re-render the page when a new post is made
    const fy = useRef(null)
    const fl = useRef(null)
    const navs = [fy, fl]

    const handleSection = () => {
        let dataType = event.target.getAttribute('datatype')
        dataType = dataType === 'true' ? true : false
        setCurrSection(dataType)
        console.log(currSection)
        console.log(fy)
        let classesToAdd = 'before:absolute before:w-full before:top-7 before:rounded-full before:border-b-4 before:border-blue-900'.split(' ')
        classesToAdd.forEach((className) => {
            navs.forEach((nav) => {
                if (nav.current.classList.contains(className)) nav.current.classList.remove(className)
            })
            event.target.classList.add(className);
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const post = event.target.post.value
        const userData = JSON.parse(localStorage.getItem('userData'))
        console.log(post)
        console.log(userData);
        try {
            const res = await fetch('http://localhost:5000/createPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post,
                    userData
                })
            })
            const data = await res.json()
            data ? setNewPost(true) : setNewPost(false)
        } catch (err) {
            console.log(err)
            alert('There was an error creating your post :(')
        }
    }
    return (
        <div className='flex m-0 p-0 flex-row flex-nowrap items-center gap-11 *:pt-3'>
            <div className='w-3/5 h-screen border-r border-gray-600'>
                <div className='border-b border-gray-600 px-3'>
                    <div className='hidden w-full flex-row justify-between items-center font-bold text-xl pb-7'>
                        <p>Home</p>
                        <FontAwesomeIcon icon={fasGear} />
                    </div>
                    <div className='w-full text-center flex flex-row justify-evenly items-center font-semibold p-1 pb-3 text-base *:cursor-pointer '>
                        <p className=' relative before:absolute before:w-full before:top-7 before:rounded-full before:border-b-4 before:border-blue-900' datatype='true' ref={fy} onClick={handleSection}>For you</p>
                        <p className='relative' datatype='false' ref={fl} onClick={handleSection}>Following</p>
                    </div>
                </div>
                <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col flex-nowrap justify-evenly text-base'>
                    <div className='w-full flex flex-row flex-nowrap justify-start items-center '>
                        {/* <Image src={}></Image> */}
                        <p className='mx-3 mr-1 mt-3 bg-red-500 rounded-full px-4 py-2 text-center'>p</p>
                        <textarea className='w-full border-none bg-transparent outline-none line-clamp-none h-10 max-h-fit text-white border-white border-2 text-xl placeholder:text-gray-500 placeholder:py-0 mt-3 focus:outline-none focus:border-none focus:placeholder:py-0 ' id='post' placeholder='What is happening?!' />
                    </div>
                    <div className='w-full flex flex-row flex-nowrap justify-between items-center mt-4 border-b border-gray-600 pb-3'>
                        <div className='w-1/4 ml-20 flex text-blue-400 flex-row flex-nowrap justify-evenly items-center *:cursor-pointer'>
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
                        <button className='py-1.5 px-3 bg-blue-500 text-gray-200 font-bold rounded-full mr-5'>Post</button>
                    </div>
                </form>
                {currSection ? <ForYouHome newPost={newPost} /> : <FollowingHome newPost={newPost} />}
            </div>
            <div className='w-5/12 h-screen flex flex-col flex-nowrap justify-start items-center gap-5'>
                <div className='relative w-full'>
                    <FontAwesomeIcon icon={fasMagnifyingGlass} className='absolute left-3 top-1/2 transform -translate-y-1/2' />
                    <input className='pl-12 w-full border-none outline-none rounded-full bg-gray-800 text-white placeholder:text-white' placeholder='Search' />
                </div>
                <div className='border-0 rounded-xl bg-gray-900 h-fit w-full p-4 flex flex-col flex-nowrap gap-2' >
                    <h3 className='text-lg font-bold'>Subscribe to Premium!</h3>
                    <p className='text-sm'>Subscribe to support me as an inidividual working on his skills for better oppurtunities.</p>
                    <Link href="https://www.buymeacoffee.com/ProgrammerXD">
                        <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=ProgrammerXD&button_colour=f4d510&font_colour=000000&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00" />
                    </Link>
                </div>
                <div className='border-0 rounded-xl bg-gray-900 h-fit w-full p-4 flex flex-col flex-nowrap gap-2' >
                    <h3 className='text-lg font-bold'>What's Happening?</h3>
                    
                </div>
            </div>
        </div>
    )
}

export default HomeNav