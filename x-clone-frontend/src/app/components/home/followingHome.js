import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment as fasComment, faRetweet as fasRetweet, faHeart as fasHeart, faChartSimple as fasChartSimple, faBookmark as fasBookmark, faUpload as fasUpload ,  faEllipsis as fasEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faComment as farComment, faRetweet as farRetweet, faHeart as farHeart, faChartSimple as farChartSimple, faBookmark as farBookmark, faUpload as farUpload } from "@fortawesome/free-regular-svg-icons";


const followingHome = (props) => {
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
      const res = await fetch('http://localhost:5000/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      console.log(data)
      setPosts(data);
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

  props.newPost ? getPosts() : null

  return (
    <>
      {errorFetchingData && <p className='text-red-400 font-bold text-center pt-10 w-5/6 m-auto'>There was an error fetching data :( , <br /> {connectionString} </p>}
      {posts.map((post) => {
        return (

          <div key={post._id} className='px-2 border-b border-gray-600 pb-4 pt-4 text-base'>
            {/* <p>reposted</p> */}
            <div className='flex flex-row flex-nowrap w-full justify-evenly'>
              <div className='w-1/6 flex flex-col justify-start h-full items-center'>
                <p className='w-fit bg-red-500 rounded-full px-5 text-sm py-3 text-center'>{post.fullname[0]}</p>
              </div>
              <div className='w-5/6'>
                <div className='flex flex-row flex-nowrap justify-between items-center'>
                  <p>{post.fullname} @{post.username}</p>
                  <FontAwesomeIcon icon={fasEllipsis}  />
                </div>
                <div className='flex flex-col flex-nowrap justify-center'>

                  <p>{post.post}</p>
                  {/* <p>{post.image}</p> */}
                </div>
                <div className='flex flex-row flex-nowrap justify-between items-center mt-2'>
                  <FontAwesomeIcon icon={farComment} />
                  <FontAwesomeIcon icon={fasRetweet} />
                  <FontAwesomeIcon icon={farHeart} />
                  <FontAwesomeIcon icon={fasChartSimple} />
                  <FontAwesomeIcon icon={farBookmark} />
                  <FontAwesomeIcon icon={fasUpload} />
                </div>

              </div>

            </div>
          </div>
        )
      })}
    </>
  )
}

export default followingHome