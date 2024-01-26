import React , {useRef , useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass as fasMagnifyingGlass, faGear as fasGear } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass as farMagnifyingGlass, faGear as farGear } from "@fortawesome/free-regular-svg-icons";

const NotifNav = () => {
    const categories = ['All', 'Verified', 'Mentions'];
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
  

    return (
        <div>
            <div className='border-b border-grey px-3'>
                <div className='w-full flex flex-row justify-between items-center font-bold text-xl pb-7'>
                    <p>Notifications</p>
                    <p>Settings</p>
                </div>
                <div className='w-full text-center flex flex-row justify-evenly items-center font-semibold p-1 pb-3 text-base *:cursor-pointer '>
                    {categories.map((category, index) => (
                        <p className={`relative ${category == "All" ? classesToAdd : null}`} key={category} ref={navs[category]} onClick={handleSection}>{category}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NotifNav