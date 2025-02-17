
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LetterLayout from './pages/LetterLayout'
import AllLetters from './pages/AllLetters'
import Navbar from './component/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/letter' element={<LetterLayout />} />
        <Route path='/allLetter' element={<AllLetters />} />
      </Routes>
    </>
  )
}

export default App
