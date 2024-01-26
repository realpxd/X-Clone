import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import RightNav from '../SideNav/RightNav';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { faComment as fasComment, faRetweet as fasRetweet, faHeart as fasHeart, faChartSimple as fasChartSimple, faBookmark as fasBookmark, faUpload as fasUpload, faEllipsis as fasEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faComment as farComment, faRetweet as farRetweet, faHeart as farHeart, faChartSimple as farChartSimple, faBookmark as farBookmark, faUpload as farUpload } from "@fortawesome/free-regular-svg-icons";

const Profile = (props) => {
    const pathQuery = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    var queryUsername = pathQuery.get('username')
    console.log(queryUsername)

    const [userData, setUserData] = useState()
    const localUserData = JSON.parse(localStorage.getItem('userData'))
    const [userPosts, setUserPosts] = useState()

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
                    Username: queryUsername
                })
            })
            const data = await res.json()
            console.log(data)
            if (data) {
                setUserData(data)
            } else {
                setUserData("error")
            }
        } catch (err) {
            console.log(err)
            setUserData("error")
        }
    }
    useEffect(() => {
        fetchUserData()
    }, [pathQuery])

    const fetchUserPosts = async () => {
        try {
            const res = await fetch('http://localhost:5000/getUserPosts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Username: queryUsername
                })
            })
            const data = await res.json()
            console.log(data)
            if (data) {
                setUserPosts(data)
            } else {
                setUserPosts("error")
            }
        } catch (err) {
            console.log(err)
            setUserPosts("error")
        }
    }
    useEffect(() => {
        fetchUserPosts()
    }, [pathQuery])

    const handleException = () => {
        console.log("handleException");
        router.push('/home')
    }
    return (
        <>
            {userData === undefined ? <p>Loading...</p> : userData === "error" ? handleException() :
                <div className='flex m-0 p-0 flex-row flex-nowrap items-center gap-11 *:pt-3'>
                    <div className='w-3/5 h-screen overflow-scroll border-r border-gray-600'>
                        <div className='flex flex-row flex-nowrap items-center gap-10 text-xl px-2 font-bold'>
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <p>{userData.fullname.toUpperCase()}</p>
                        </div>
                        <div className='border-b border-gray-500 relative'>
                            <div className='h-56 bg-gray-400 '></div>
                            <div className='h-28 w-28 bg-gray-300 rounded-full border-8  border-white absolute top-44 left-3'></div>
                            {userData.username == localUserData.username ? <button className='absolute right-4 top-60 py-2 px-3 border border-gray-500 rounded-full font-bold' >Edit Profile</button> : null
                            }
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
                            {
                                userPosts === undefined ? <p>Loading...</p> : userPosts.length == 0 || userPosts == "error" ? <p className='text-center'>No posts yet</p> :
                                    userPosts.map((post) => {
                                        return (

                                            <div key={post._id} className='px-2 border-b border-gray-600 pb-4 pt-4 text-base'>
                                                {/* <p>reposted</p> */}
                                                <div className='flex flex-row flex-nowrap w-full justify-evenly'>
                                                    <div className='w-1/6 flex flex-col justify-start h-full items-center'>
                                                        <Link href={{ pathname: "profile", query: `username=${post.username}` }} ><p className='w-fit bg-red-500 rounded-full px-5 text-sm py-3 text-center'>{post.fullname[0]}</p></Link>
                                                    </div>
                                                    <div className='w-5/6'>
                                                        <div className='flex flex-row flex-nowrap justify-between items-center'>
                                                            <p>{post.fullname} @{post.username}</p>
                                                            <FontAwesomeIcon icon={fasEllipsis} />
                                                        </div>
                                                        <div className='flex flex-col flex-nowrap justify-center'>

                                                            <p>{post.post}</p>
                                                            {/* <p>{post.image}</p> */}
                                                        </div>
                                                        <div className='flex flex-row flex-nowrap justify-between items-center mt-2 text-gray-600'>
                                                            <FontAwesomeIcon icon={farComment} />
                                                            <FontAwesomeIcon icon={fasRetweet} />
                                                            <div onClick={() => handleLike(post)} >
                                                                <FontAwesomeIcon icon={farHeart} />
                                                            </div>
                                                            <FontAwesomeIcon icon={fasChartSimple} />
                                                            <FontAwesomeIcon icon={farBookmark} />
                                                            <FontAwesomeIcon icon={fasUpload} />
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>
                    <RightNav />
                </div>
            }
        </>
    )
}

export default Profile