import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass as fasMagnifyingGlass, faGear as fasGear } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass as farMagnifyingGlass, faGear as farGear } from "@fortawesome/free-regular-svg-icons";

const NotifNav = () => {
    return (
        <div>
            <div className='border-b border-grey px-3'>
                <div className='w-full flex flex-row justify-between items-center font-bold text-xl pb-7'>
                    <p>Notifications</p>
                    <p>Settings</p>
                </div>
                <div className='w-full text-center flex flex-row justify-center items-center font-semibold p-1 pb-3 text-base *:cursor-pointer '>
                    <p className='w-1/3 relative' datatype='true' >All</p>
                    <p className='w-1/3 relative' datatype='false'>Verified</p>
                    <p className='w-1/3 relative' datatype='false'>Mentions</p>
                </div>
            </div>
        </div>
    )
}

export default NotifNav