import React from 'react'
import Link from 'next/link'

const landingPage = props => {
    return (
        <div className='m-0 h-screen w-screen flex flex-row py-2 px-5 justify-between items-center'>
            <div className='w-1/2'>
            <img src="/xLogo.png" alt="logo" className='filter invert' />
            </div>
            <div className='w-2/5 flex flex-nowrap flex-col justify-between items-start gap-3'>
                <h1 className='text-7xl font-bold'>Happening now</h1>
                <div className='w-2/4 text-base my-7'>
                    <h2 className='text-4xl mb-6'>Join today.</h2>
                    <div className='flex flex-col gap-1'>
                        <p className='py-2 px-3 font-bold text-center bg-white text-black rounded-full '>google</p>
                        <p className='py-2 px-3 font-bold text-center bg-white text-black rounded-full '>github</p>
                        <div className='flex flex-row flex-nowrap justify-center items-center'>
                            <hr />
                            <p>or</p>
                            <hr />
                        </div>
                        <Link href={"/getStarted"} className='w-full py-2 px-3 font-bold text-center bg-blue-400 text-white rounded-full '><button>Create account</button></Link>
                        <p className='text-xs text-gray-500'>By signing in you agree to Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                    <div className='mt-10 flex flex-col gap-3 justify-start'>
                        <h3 className='text-xl font-bold'>Already have an account?</h3>
                        <Link href={"/login"} className='w-full py-2 px-3 font-bold text-center bg-transparent border border-blue-400 text-blue-400 rounded-full '><button>Sign in</button></Link>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default landingPage