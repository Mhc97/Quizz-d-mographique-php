import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Accueil = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('normal');
    const [pseudo, setPseudo] = useState('');

    const startQuiz = () => {
        if (pseudo.trim() === ''){
            alert('Entre un pseudo');
            return;
        }
        navigate('/quiz', {state: {mode, pseudo}});
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">Quizz Démographique</h1>
        <p className="text-center text-gray-500 mb-8"> Teste tes connaissances sur les pays du monde!</p>

        <div className="mb-4">
            <label classeName="block text-gray-700 mb-2">Ton pseudo</label>
            <input 
            type="text" 
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            classeName="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre pseudo"
            />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 mb-2">Choisis ton mode</label>
            <div className="flex gap-4">
                <button
                onClick={() => setMode('normal')}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${mode === 'normal'?'bg-blue-600 text-white': 'bg-gray-200 text-gray-700'}`}
                >
                 🎯 Normal
                </button>
                <button
                onClick={() => setMode('chrono')}
                classeName={`flex-1 py-2 rounded-lg font-semibold transition ${
                mode === 'chrono' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}>
                    ⏱️ Contre la montre
                    </button>

                </div>
            </div>
        </div>
        <button
        onClick={startQuiz}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
        >
            Commencer le quiz
        </button>
        </div>
        
        

    )

}

export default Accueil;