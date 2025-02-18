import { FolderArrowDownIcon } from '@heroicons/react/24/solid'
import { PDFDownloadLink } from '@react-pdf/renderer'
import LetterPDF from './LetterPDF'
import { useContext } from 'react'
import { MyContext } from '../context/LetterContext'


function ToolBar() {
  const { selectedLetter } = useContext(MyContext)
  
  return (
    <div className=' w-full flex bg-[#525659] justify-end items-center p-5'>
      <PDFDownloadLink document={<LetterPDF selectedLetter={selectedLetter}/>} fileName={`${selectedLetter?.name || 'ConfirmationLetter'}.pdf`}>
        <FolderArrowDownIcon className='size-10 mx-5 text-white cursor-pointer hover:text-gray-400 duration-300' />
      </PDFDownloadLink>

    </div>
  )
}

export default ToolBar