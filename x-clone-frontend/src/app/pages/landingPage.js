import React from 'react'
import Link from 'next/link'

const landingPage = props => {
    return (
        <div>landingPage
            <Link href={"/pages/get-started"}> getStarted </Link>
            <Link href={"/pages/login"}> login </Link>

        </div>
    )
}


export default landingPage