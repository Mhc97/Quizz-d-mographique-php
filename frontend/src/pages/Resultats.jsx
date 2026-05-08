import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SaveScore } from "../services/api";

const resultats = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {score, total, pseudo, mode} = location.state || {score: 0, total: 10, pseudo: 'Anonyme', mode: 'normal'};
    const percent = Math.round((score / total) * 100);

    useEffect(() =>{
        SaveScore(pseudo, score, mode);
    }, [pseudo, score, mode]);
    return(
           <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Résultat</h1>
        <p className="text-gray-500 mb-6">Quiz Démographique</p>

        <div className="text-6xl font-bold text-blue-600 mb-4">{percent}%</div>
        <p className="text-xl mb-2">
          {score} / {total} bonnes réponses
        </p>
        <p className="text-gray-600 mb-8">
          {percent >= 80 ? '🏆 Excellent !' : percent >= 50 ? '👍 Bien joué !' : '📚 En progrès, retente ta chance !'}
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded-lg transition"
          >
            Accueil
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition"
          >
            Rejouer
          </button>
        </div>
      </div>
    </div>
    );
};

export default Resultats;