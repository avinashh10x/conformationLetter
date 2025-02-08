import React, { useState, useEffect } from 'react';

const Snackbar = ({ message, type, onClose }) => {
    const [isopen, setIsOpen] = useState(true);


    return (

        <>
            <button className='bg-red-500  h-10 w-20 rounded-2xl cursor-pointer text-white' onClick={() => setIsOpen(!isopen)} >
                {isopen ? 'close' : 'open'}
            </button>

            {isopen &&
                <div className='bg-green-400 animate-wiggle absolute min-w-2xs min-h-12 flex px-5 items-center justify-start  top-30 right-1.5 rounded-xl text-white text-xl animate-horizontal-bounce duration-500'>
                    success message
                </div>
            }


        </>
    );
};


export default Snackbar;