import React from 'react'
import CreateBtn from './CreateBtn'

import { Link } from 'react-router-dom'
import { Square3Stack3DIcon } from '@heroicons/react/24/solid'

function HomeScreenTools() {
    return (
        <>
            <div className='flex justify-center items-center w-full flex flex-col gap-5 p-4 text-2xl'>
                <div className='w-full max-w-3xl flex justify-between items-center rounded-2xl h-11'>
                    <CreateBtn />


                    <Link to={`/allLetter`}>
                        <button className="bg-[#684df4] text-white cursor-pointer flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-300 shadow-lg">
                            All Letters
                            <Square3Stack3DIcon className="h-6 w-6" />
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default HomeScreenTools