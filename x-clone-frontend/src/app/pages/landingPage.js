import React from 'react'
import Link from 'next/link'

const landingPage = props => {
    return (
        <div className='m-0 h-screen w-screen flex flex-row py-2 px-5 justify-between items-center'>
            <div className='w-1/2'>
            <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
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
                        <p className='text-xs'>By signing in you agree to Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
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