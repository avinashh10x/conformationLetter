import React from 'react'
import { UserIcon } from '@heroicons/react/24/solid'
import logoImg from '../assets/novem_controls-removebg-preview.jpg';


function Navbar() {
    return (
        <>
            <nav className='flex justify-between items-center p-5 bg-[#af9fff] text-white'>
                <div className='h-15 w-50 items-center justify-center flex'>
                    <a href="/">
                        <img className='h-full w-full object-cover' src={logoImg} alt="novem controls" />
                    </a>
                </div>

                <div className='flex h-10 justify-center w-10 border-1 rounded-4xl items-center mr-2  space-x-5'>
                    <UserIcon className="size-9 p-1" />
                </div>
            </nav>
        </>
    )
}

export default Navbar