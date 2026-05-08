import './App.css';
import Accueil from './pages/Acceuil';
import Quiz from './pages/Quiz';
import Resultats from './pages/Resultats';


function App() {

  return (
    <>
      return(
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Acceuil/>}/>
          <Route path="/quiz" element={<Quiz/>}/>
          <Route path="/resultats" element={<Resultats/>}/>
        </Routes>
        </BrowserRouter>
      );

    </>
  )
}

export default App;
