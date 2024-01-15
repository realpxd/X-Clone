import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass as fasMagnifyingGlass, faHouse as fasHouse, faBell as fasBell, faEnvelope as fasEnvelope, faSquare as fasSquare, faFileLines as fasFileLines, faUserGroup as fasUserGroup, faEllipsis as fasEllipsis, faUser as fasUser, faCirclePlus as fasCirclePlus, faCircle as fasCircle } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass as fasrMagnifyingGlass, faHouse as fasrHouse, faBell as fasrBell, faEnvelope as fasrEnvelope, faSquare as fasrSquare, faFileLines as fasrFileLines, faUserGroup as fasrUserGroup, faEllipsis as fasrEllipsis, faUser as fasrUser, faCirclePlus as fasrCirclePlus, faCircle as fasrCircle } from "@fortawesome/free-regular-svg-icons";

import HomeNav from '@/app/components/home/HomeNav';
import ExploreNav from '@/app/components/explore/ExploreNav';
import NotifNav from '@/app/components/notifications/NotifNav';

const SideNav = (props) => {
  const [currentSection, setCurrentSection] = useState('home');

  const refNames = ['refresh', 'home', 'explore', 'notifications', 'messages', 'grok', 'lists', 'communities', 'premium', 'profile', 'more', 'addPost'];
  const refs = {};

  refNames.forEach((name) => {
    refs[name] = useRef(null);
  });

  useEffect(() => {
    // const { home, explore, notifications } = refs;

    switch (props.page) {
      case '/feed':
        setCurrentSection('feed');
        Object.values(refs).forEach((ref) => {
          if (ref.current && ref.current.classList.contains('text-red-400')) ref.current.classList.remove('text-red-400');
        });
        refs.home.current.classList.add('text-red-400');
        break;
      case '/explore':
        setCurrentSection('explore');
        Object.values(refs).forEach((ref) => {
          if (ref.current && ref.current.classList.contains('text-red-400')) ref.current.classList.remove('text-red-400');
        });
        refs.explore.current.classList.add('text-red-400');
        break;
      case '/notifications':
        setCurrentSection('notifications');
        Object.values(refs).forEach((ref) => {
          if (ref.current && ref.current.classList.contains('text-red-400')) ref.current.classList.remove('text-red-400');
        });
        refs.notifications.current.classList.add('text-red-400');
        break;
      default:
        setCurrentSection('home');
        Object.values(refs).forEach((ref) => {
          if (ref.current && ref.current.classList.contains('text-red-400')) ref.current.classList.remove('text-red-400');
        });
        refs.home.current.classList.add('text-red-400');
    }
  }, [props.page]);
  return (
    <div className='w-20 h-screen border-r border-gray bg-black flex flex-col flex-nowrap justify-between items-center p-2 text-2xl '>
      <div className='h-5/6 flex flex-col flex-nowrap justify-around items-center iconsContainer *:text-grey  hover:*:text-red-400 *:cursor-pointer'>
        <Link href={"#"} ><FontAwesomeIcon icon={faXTwitter} ref={refs.refresh} /></Link>
        <Link href={"/feed"} ><FontAwesomeIcon icon={fasHouse} ref={refs.home} title='home' /></Link>
        <Link href={"/explore"} ><FontAwesomeIcon icon={fasMagnifyingGlass} ref={refs.explore} title='explore' /></Link>
        <Link href={"/notifications"} ><FontAwesomeIcon icon={fasrBell} ref={refs.notifications} title='notifications' /></Link>
        <Link href={"/feed"} ><FontAwesomeIcon icon={fasrEnvelope} ref={refs.messages} title='messages' /></Link>
        <Link href={"/feed"} ><FontAwesomeIcon icon={fasrSquare} ref={refs.grok} title='grok' /></Link>
        <Link href={"/feed"} ><FontAwesomeIcon icon={fasrFileLines} ref={refs.lists} title='lists' /></Link>
        <Link href={"/feed"} ><FontAwesomeIcon icon={fasUserGroup} ref={refs.communities} title='communities' /></Link>
        <Link href={"/feed"} ><FontAwesomeIcon icon={faXTwitter} ref={refs.premium} title='premium' /></Link>
        <Link href={"/feed"} ><FontAwesomeIcon icon={fasrUser} ref={refs.profile} title='profile' /></Link>
        <Link href={"/feed"} ><FontAwesomeIcon icon={fasEllipsis} ref={refs.more} title='more' /></Link>
        <Link href={"/feed"} ><FontAwesomeIcon icon={fasCirclePlus} ref={refs.addPost} title='add' /></Link>
        {/* <FontAwesomeIcon className='text-3xl' icon={fasrCircle} /> */}
      </div>
      <p className='mb-7 rounded-full bg-red-500 w-10 h-10 text-center'>n</p>
    </div>
  )
}

export default SideNav