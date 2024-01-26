import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass as fasMagnifyingGlass, faImage as fasImage, faVideo as fasVideo, faFaceSmile as fasFaceSmile, faLocationDot as fasLocationDot, faGear as fasGear } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass as farMagnifyingGlass, faImage as farImage, faVideo as farVideo, faFaceSmile as farFaceSmile, faLocationDot as farLocationDot } from "@fortawesome/free-regular-svg-icons";
import Link from 'next/link'

const RightNav = () => {
    return (
        <div className='w-5/12 h-screen flex flex-col flex-nowrap justify-start items-center gap-5'>
            <div className='relative w-full'>
                <FontAwesomeIcon icon={fasMagnifyingGlass} className='absolute left-3 top-1/2 transform -translate-y-1/2' />
                <input className='pl-12 w-full border-none outline-none rounded-full bg-gray-800 text-white placeholder:text-white' placeholder='Search' />
            </div>
            <div className='border-0 rounded-xl bg-gray-800 h-fit w-full p-4 flex flex-col flex-nowrap gap-2' >
                <h3 className='text-lg font-bold'>Subscribe to Premium!</h3>
                <p className='text-sm'>Subscribe to support me as an inidividual working on his skills for better oppurtunities.</p>
                <Link href="https://www.buymeacoffee.com/ProgrammerXD">
                    <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=ProgrammerXD&button_colour=f4d510&font_colour=000000&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00" />
                </Link>
            </div>
            <div className='border-0 rounded-xl bg-gray-800 h-fit w-full p-4 flex flex-col flex-nowrap gap-2' >
                <h3 className='text-lg font-bold'>Who to follow?</h3>

            </div>
        </div>
    )
}

export default RightNav