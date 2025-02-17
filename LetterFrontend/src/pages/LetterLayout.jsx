
import Loading from '../component/Loading';
// import signature from '../assets/signature.jpg';
// import NCimg from '../assets/novem_controls-removebg-preview.webp'
import ToolBar from '../component/ToolBar';
import { useContext } from 'react';
import { MyContext } from '../context/LetterContext';
import LetterPDF from '../component/LetterPDF';
import { PDFViewer } from '@react-pdf/renderer';


function LetterLayout() {
  const { selectedLetter } = useContext(MyContext);



  if (!selectedLetter) {
    return <Loading />;
  }

  return (

    <div className="min-h-screen bg-white">
      <ToolBar />
      <PDFViewer className="custom-pdf-viewer" width="100%" height="1200px" showToolbar={false}>
        <LetterPDF selectedLetter={selectedLetter} />
      </PDFViewer>
    </div>


  );
}

export default LetterLayout;
