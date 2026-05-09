import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Accueil from './pages/Accueil';
import Quiz from './pages/Quiz';
import Resultats from './pages/Resultats';
import Footer from './components/Footer';
import Navbar from './components/Navbar';


function App() {

  return (
    <>
   
        <BrowserRouter>
         <Navbar/>
        <Routes>
          <Route path="/" element={<Accueil/>}/>
          <Route path="/quiz" element={<Quiz/>}/>
          <Route path="/resultats" element={<Resultats/>}/>
        </Routes>
        <Footer/>
        </BrowserRouter>

    
    </>
  )
}

export default App;