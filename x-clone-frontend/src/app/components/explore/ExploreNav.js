import React , {useRef , useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass as fasMagnifyingGlass, faGear as fasGear } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass as farMagnifyingGlass, faGear as farGear } from "@fortawesome/free-regular-svg-icons";

const ExploreNav = () => {
    const [currSection, setCurrSection] = useState(true)
    const categories = ['For you', 'Trending', 'News', 'Sports', 'Entertainment'];
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
        <div className='w-full overflow-hidden'>

            <div className='w-full overflow-hidden border-b border-gray-600 px-3'>
                <div className='w-full flex flex-row flex-nowrap justify-between px-3 items-center text-base pb-7'>
                    <div className='relative  w-full'>
                        <FontAwesomeIcon icon={fasMagnifyingGlass} className='absolute left-3 top-1/2 transform -translate-y-1/2' />
                        <input className='pl-12 w-5/6 border-none outline-none rounded-full bg-gray-800 text-white placeholder:text-white' placeholder='Search' />
                    </div>

                    <FontAwesomeIcon className='' icon={fasGear} />
                </div>
                <div className='w-full text-center overflow-x-auto flex flex-row flex-nowrap justify-evenly items-center text-base font-semibold pb-3 gap-4 *:cursor-pointer  '>
                    {categories.map((category, index) => (
                        <p  className={`relative ${category=="For you" ? classesToAdd : null}`} key={category} ref={navs[category]} onClick={handleSection}>{category}</p>
                    ))}
                </div>
            </div>

            <div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default ExploreNav