
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LetterLayout from './pages/LetterLayout'
import AllLetters from './pages/AllLetters'
import Navbar from './component/Navbar'
import ResultPage from './pages/ResultPage'
import ShowPdf from './PDF/ShowPdf'
// import FilteredPage from './pages/FilteredPage'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/letter' element={<ShowPdf />} />
        <Route path='/allLetter' element={<AllLetters />} />
        <Route path='/result' element={<ResultPage />} />
        {/* <Route path='/filteredLetters' element={<FilteredPage />} /> */}
        {/* <Route path='/test' element={<ShowPdf />} /> */}


      </Routes>
    </>
  )
}

export default App
