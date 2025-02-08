import { FolderArrowDownIcon } from '@heroicons/react/24/solid'
import React from 'react'

function ToolBar() {
  return (
    <div className=' w-full flex justify-end items-center p-5'>
        <FolderArrowDownIcon className='size-10 mx-5 text-gray-600 cursor-pointer hover:text-gray-700 duration-500' />
    </div>
  )
}

export default ToolBar