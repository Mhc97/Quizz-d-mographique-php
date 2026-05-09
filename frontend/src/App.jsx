import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Accueil from './pages/Accueil';
import Quiz from './pages/Quiz';
import Resultats from './pages/Resultats';


function App() {

  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil/>}/>
          <Route path="/quiz" element={<Quiz/>}/>
          <Route path="/resultats" element={<Resultats/>}/>
        </Routes>
        </BrowserRouter>

    </>
  )
}

export default App;