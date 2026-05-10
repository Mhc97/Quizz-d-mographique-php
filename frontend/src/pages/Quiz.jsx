import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getQuestion } from '../services/api';
import Timer from '../components/Timer';

const Quiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { mode, pseudo } = location.state || { mode: 'normal', pseudo: 'Anonyme' };
    const totalQuestions = 10;

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [quizFinished, setQuizFinished] = useState(false);
    const [selected, setSelected] = useState(null);

    const loadQuestion = async () => {
        const data = await getQuestion();
        setCurrentQuestion(data);
        setFeedback(null);
        setSelected(null);
        if (mode === 'chrono') setTimeLeft(30);
    };

    const handleTimeOut = () => {
        setQuizFinished(true);
        navigate('/resultats', { state: { score, total: totalQuestions, pseudo, mode } });
    };

    useEffect(() => { loadQuestion(); }, []);

    useEffect(() => {
        if (mode === 'chrono' && !quizFinished && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
            return () => clearTimeout(timer);
        } else if (mode === 'chrono' && timeLeft === 0 && !quizFinished) {
            handleTimeOut();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft, mode, quizFinished]);

    const handleAnswer = (opt) => {
        if (feedback || !currentQuestion) return;
        setSelected(opt);
        const isCorrect = opt === currentQuestion.bonne_reponse;
        const newScore = isCorrect ? score + 1 : score;
        if (isCorrect) setScore(newScore);
        setFeedback({ isCorrect, bonne: currentQuestion.bonne_reponse, newScore });

        setTimeout(() => {
            if (currentIndex + 1 < totalQuestions) {
                setCurrentIndex(i => i + 1);
                loadQuestion();
            } else {
                setQuizFinished(true);
                navigate('/resultats', { state: { score: newScore, total: totalQuestions, pseudo, mode } });
            }
        }, 1500);
    };

    if (!currentQuestion) return (
        <div className="flex items-center justify-center h-64 text-white text-2xl">
            Chargement...
        </div>
    );

    const labels = ['A', 'B', 'C', 'D'];

    const getOptStyle = (opt) => {
        if (!feedback) return 'bg-gray-800 border-gray-600 text-white hover:border-blue-400';
        if (opt === currentQuestion.bonne_reponse) return 'bg-green-900 border-green-500 text-green-400';
        if (opt === selected) return 'bg-red-900 border-red-500 text-red-400';
        return 'bg-gray-800 border-gray-600 text-gray-500';
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">

            {/* Header */}
            <div className="flex justify-between items-center bg-gray-800 rounded-xl px-6 py-3 mb-6 border border-gray-700">
                <span className="text-gray-400 text-sm">Q{currentIndex + 1}/{totalQuestions}</span>
                <span className="text-white font-bold">Score : {score}</span>
                {mode === 'chrono' && <Timer timeLeft={timeLeft} onTimeOut={handleTimeOut} />}
                <button
                    onClick={() => navigate('/')}
                    className="text-gray-400 text-sm border border-gray-600 rounded-lg px-3 py-1 hover:bg-gray-700 transition"
                >
                    ← Accueil
                </button>
            </div>

            {/* Zone drapeau */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center mb-6 h-36">
                <span className="text-7xl">🌍</span>
            </div>

            {/* Question */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl px-6 py-4 text-center mb-6">
                <p className="text-white text-lg font-bold">{currentQuestion.texte}</p>
            </div>

            {/* Options A/B/C/D */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                {currentQuestion.options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(opt)}
                        disabled={!!feedback}
                        className={`flex items-center gap-3 border-2 rounded-xl p-4 transition text-left ${getOptStyle(opt)}`}
                    >
                        <span className="bg-gray-900 text-gray-400 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {labels[idx]}
                        </span>
                        <span className="text-sm">{opt}</span>
                    </button>
                ))}
            </div>

            {/* Feedback */}
            {feedback && (
                <div className={`rounded-xl px-6 py-4 text-center font-semibold border ${feedback.isCorrect ? 'bg-green-900 border-green-500 text-green-400' : 'bg-red-900 border-red-500 text-red-400'}`}>
                    {feedback.isCorrect ? '✅ Bonne réponse !' : `❌ Mauvaise réponse. La bonne était : ${feedback.bonne}`}
                </div>
            )}
        </div>
    );
};

export default Quiz;
  


