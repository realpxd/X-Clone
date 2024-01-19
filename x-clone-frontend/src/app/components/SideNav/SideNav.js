import React, { useEffect, useRef } from 'react'
import Link from 'next/link';
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass as fasMagnifyingGlass, faHouse as fasHouse, faBell as fasBell, faEnvelope as fasEnvelope, faSquare as fasSquare, faFileLines as fasFileLines, faUserGroup as fasUserGroup, faEllipsis as fasEllipsis, faUser as fasUser, faCirclePlus as fasCirclePlus, faCircle as fasCircle } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass as fasrMagnifyingGlass, faHouse as fasrHouse, faBell as fasrBell, faEnvelope as fasrEnvelope, faSquare as fasrSquare, faFileLines as fasrFileLines, faUserGroup as fasrUserGroup, faEllipsis as fasrEllipsis, faUser as fasrUser, faCirclePlus as fasrCirclePlus, faCircle as fasrCircle } from "@fortawesome/free-regular-svg-icons";

const SideNav = (props) => {
  const pagesProtocols = ['hash', 'home', 'explore', 'notifications', 'messages', 'grok', 'lists', 'communities', 'premium', 'profile', 'more', 'addPost'];
  const refIcons = [faXTwitter, fasHouse, fasMagnifyingGlass, fasrBell, fasrEnvelope, fasrSquare, fasrFileLines, fasUserGroup, faXTwitter, fasrUser, fasEllipsis, fasCirclePlus];
  const refs = {};
  const userData = JSON.parse(localStorage.getItem('userData'));
  console.log(userData);

  pagesProtocols.forEach((name) => {
    refs[name] = useRef(null);
  });

  useEffect(() => {
    for (const name of pagesProtocols) {
      if (props.page == name) {
        Object.values(refs).forEach((ref) => {
          if (ref.current && ref.current.classList.contains('text-red-500')) ref.current.classList.remove('text-red-500');
        });
        refs[name].current && refs[name].current.classList.add('text-red-500');
        refs.hash.current && refs.hash.current.classList.add('text-red-500');
        break;
      }
    }
  }, []);

  return (
    <>
      {userData ?
        < div className='w-1/5 h-screen border-r border-gray-600 bg-black flex flex-col flex-nowrap justify-between items-start p-2 text-2xl ' >
          <div className='h-5/6 w-full flex flex-col flex-nowrap justify-around items-center   *:cursor-pointer'>
            {pagesProtocols.map((name, index) => (
              <Link href={name == "hash" ? "#" : name == "addPost" ? { pathname: "/home", query: "isMakeTweet=1", } : name} key={name} ref={refs[name]} className={`w-full flex flex-row gap-5 flex-nowrap justify-between items-center text-gray-300 hover:text-red-500  ${name == "hash" ? 'text-white' : null} ${name == 'addPost' ? 'bg-blue-500 py-3 px-3 rounded-full text-white hover:text-gray-50 ' : null} `}>
                <div className='w-1/5 flex flex-row flex-nowrap justify-around items-center '>
                  <FontAwesomeIcon icon={refIcons[index]} title={name} />
                </div>
                <div className='w-4/5 flex flex-row flex-nowrap justify-start items-center text-base font-bold'>
                  <p>{name != "hash" ? name.toUpperCase() : ""}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className='w-full flex flex-row flex-nowrap justify-start items-start gap-4'>
            <p className='mb-7 rounded-full bg-blue-500 w-12 h-9 text-center'>{userData.fullname[0]}</p>
            <div className='w-full flex flex-col flex-nowrap items-start text-base font-bold text-white'>
              <p>{userData.fullname.toUpperCase()}</p>
              <p className='text-gray-500 font-normal'>@{userData.username}</p>
            </div>

          </div>
        </div >
        : <div>
          <p>loading...</p>
        </div>
      }
    </>
  )
}

export default SideNav