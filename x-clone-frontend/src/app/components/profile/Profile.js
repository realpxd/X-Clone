import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import RightNav from '../SideNav/RightNav';

const Profile = (props) => {
    const [userData, setUserData] = useState()
    const localUserData = JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')) : " "
    const userEmail = props.email ? props.email : localUserData ? localUserData.email : " "
    console.log(userEmail)

    const categories = ['posts', 'replies', 'highlights', 'media', 'likes'];
    const navs = {}
    const classesToAdd = 'before:absolute before:w-full before:top-7 before:rounded-full before:border-b-4 before:border-blue-900'

    categories.forEach((name) => {
        navs[name] = useRef(null);
    });


    const handleSection = () => {
        classesToAdd.split(' ').forEach((className) => {
            Object.values(navs).forEach((nav) => {
                if (nav.current.classList.contains(className)) nav.current.classList.remove(className)
            })
            event.target.classList.add(className);
        })
    }

    const fetchUserData = async () => {
        try {
            const res = await fetch('http://localhost:5000/getUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: userEmail
                })
            })
            const data = await res.json()
            console.log(data)
            setUserData(data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchUserData()
    }, [])
    return (
        <>
            {userData &&
                <div className='flex m-0 p-0 flex-row flex-nowrap items-center gap-11 *:pt-3'>
                    <div className='w-3/5 h-screen border-r border-gray-600'>
                        <div className='flex flex-row flex-nowrap items-center gap-10 text-xl px-2 font-bold'>
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <p>{userData.fullname.toUpperCase()}</p>
                        </div>
                        <div className='border-b border-gray-500 relative'>
                            <div className='h-56 bg-gray-400 '></div>
                            <div className='h-28 w-28 bg-gray-300 rounded-full border-8  border-white absolute top-44 left-3'></div>
                            <button className='absolute right-4 top-60 py-2 px-3 border border-gray-500 rounded-full font-bold' >Edit Profile</button>
                            <div className='px-4 my-3 mt-20 text-sm'>
                                <p className='text-xl font-bold'>{userData.fullname.toUpperCase()}</p>
                                <p className='text-gray-500 mb-4'>@{userData.username}</p>
                                <p>Bio: {userData.bio ? userData.bio : "Not Set"}</p>
                                <p className='text-gray-500'>Birthday: {userData.bday ? userData.bday : "Not Set"}</p>
                                <div className='flex flex-row text-gray-500 gap-10'>
                                    <div className='flex flex-row gap-2'>
                                        <p className='text-white'>{userData.followers ? userData.followers : 0}</p>
                                        <p>Followers:</p>
                                    </div>
                                    <div className='flex flex-row gap-2'>
                                        <p className='text-white'>{userData.following ? userData.following : 0}</p>
                                        <p>Following</p>

                                    </div>
                                </div>
                            </div>
                            <div className='w-full text-center overflow-x-auto flex flex-row flex-nowrap justify-evenly items-center text-base font-semibold pb-3 gap-4 *:cursor-pointer  '>
                                {categories.map((category, index) => (
                                    <p className={`relative ${category == "posts" ? classesToAdd : null}`} key={category} ref={navs[category]} onClick={handleSection}>{category}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <RightNav />
                </div>
            }
        </>
    )
}

export default Profile