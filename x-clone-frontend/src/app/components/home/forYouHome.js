import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment as fasComment, faRetweet as fasRetweet, faHeart as fasHeart, faChartSimple as fasChartSimple, faBookmark as fasBookmark, faUpload as fasUpload, faEllipsis as fasEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faComment as farComment, faRetweet as farRetweet, faHeart as farHeart, faChartSimple as farChartSimple, faBookmark as farBookmark, faUpload as farUpload } from "@fortawesome/free-regular-svg-icons";
import Link from 'next/link';


const forYouHome = (props) => {
  const [posts, setPosts] = useState([]);
  const [errorFetchingData, setErrorFetchingData] = useState(false);
  const [connectionString, setConnectionString] = useState('Retrying connection..');
  var counter = 0

  const getPosts = async () => {
    try {
      if (counter == 12) {
        return
      }
      counter++
      console.log(counter)
      const res = await fetch(process.env.SERVER, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      console.log(data)
      setPosts(data.reverse());
      setConnectionString('Connection established :)')
      setErrorFetchingData(false)
    } catch (err) {
      console.log(err)
      setErrorFetchingData(true)
      setTimeout(() => {
        setConnectionString('Retrying connection...')
      }, 1000)
      setTimeout(() => {
        setConnectionString('Retrying connection....')
        if (counter == 12) {
          setConnectionString('Not able to fetch data, Please try again later T_T')
          return
        }
        getPosts()
      }, 2000)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  const handleLike = async (post) => {
    console.log(post)
    try {
      const res = await fetch(process.env.LIKEPOST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: post._id,
          likes: post.likes
        })
      })
      const data = await res.json()
      console.log(data)
      getPosts()
    } catch (err) {
      console.log(err)
    }
  }


  props.newPost ? getPosts() : null

  return (
    <>
      {errorFetchingData && <p className='text-red-400 font-bold text-center pt-10 w-5/6 m-auto'>There was an error fetching data :( , <br /> {connectionString} </p>}
      {posts ? posts.map((post) => {
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
                <div className='flex flex-row flex-nowrap justify-between items-center mt-2 text-gray-600 *:flex *:flex-row *:flex-nowrap *:items-center *:gap-1'>
                  <div>
                    <FontAwesomeIcon icon={farComment} />
                  </div>
                  <div onClick={() => handleLike(post)} >
                    <FontAwesomeIcon icon={fasRetweet} />
                  </div>
                  <div onClick={() => handleLike(post)} >
                    <FontAwesomeIcon icon={farHeart} />
                    <p>{post.likes}</p>
                  </div>
                  <div onClick={() => handleLike(post)} >
                    <FontAwesomeIcon icon={fasChartSimple} />
                  </div>
                  <div onClick={() => handleLike(post)} >
                    <FontAwesomeIcon icon={farBookmark} />
                  </div>
                  <div onClick={() => handleLike(post)} >
                    <FontAwesomeIcon icon={fasUpload} />
                  </div>
                </div>

              </div>

            </div>
          </div>
        )
      }) : setErrorFetchingData(true)}
    </>
  )
}

export default forYouHome