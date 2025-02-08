import { Route, Routes } from 'react-router-dom';
import './app.css';
import Navbar from './component/Navbar';
import HomePage from './pages/HomePage';
import LetterLayout from './pages/LetterLayout';
import AllLetters from './component/AllLetters';

export function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/letter' element={<LetterLayout />} />
        <Route path='/allLetter' element={<AllLetters />} />
      </Routes>
    </>
  );
}
