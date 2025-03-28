import { PDFViewer } from '@react-pdf/renderer'
import React, { useContext } from 'react'
import MyDocument from './MyDocument'
import { MyContext } from '../context/LetterContext';
import ToolBar from '../component/ToolBar';

function ShowPdf() {
    const { selectedLetter } = useContext(MyContext);
    return (
        <>
            <ToolBar />
            <PDFViewer width="100%" height="1200px" showToolbar={false}>
                <MyDocument selectedLetter={selectedLetter} />
                {/* <LetterPDF selectedLetter={selectedLetter} /> */}
            </PDFViewer>
        </>
    )
}

export default ShowPdf