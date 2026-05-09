import {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {getQuestion, checkAnswer} from '.../services/api';
import Timer from '.../components/Timer';

const Quiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {mode, pseudo} = location.state || {mode: 'normal', pseudo: 'Anonyme'};
    const totalQuestions =10;

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => {
        loadQuestion();
    }, []);

    useEffect(() => {
        if(mode === 'chrono' && !quizFinished && timeLeft > 0){
            const  timer = setTimeout(() => setTimeLeft(t => t-1), 1000);
            return () => clearTimeout(timer);
        }else if (mode === 'chrono' && timeLeft === 0 && !quizFinished){
            handleTimeOut();
        }
    }, [timeLeft, mode, quizFinished]);

    const loadQuestion = async () => {
        const data = await getQuestion();
        setCurrentQuestion(data);
        setFeedback(null);
        if (mode === 'chrono') setTimeLeft(30);
    };

    const handleAnswer = async (selected) => {
        if (!currentQuestion) return;
        const isCorrect = await checkAnswer(currentQuestion, selected);
        if (isCorrect){
            setScore(s => s + 1);
            setFeedback({text: '✅ Bonne réponse !', type: 'correct' });
        }else{
            setFeedback({text: `❌ Mauvaise réponse. La bonne était : ${currentQuestion.bonne_reponse}`, type: 'wrong'});
        }

        setTimeout(() => {
            if (currentIndex + 1 < totalQuestions){
                setCurrentIndex(i => i + 1);
                loadQuestion();
            }else{
                setQuizFinished(true);
                navigate('/resultats', { state: { score, total: totalQuestions, pseudo, mode } });
            }
        }, 1200);
    };

    const handleTimeOut = () => {
        setQuizFinished(true);
        navigate('/resultats', { state: { score, total: totalQuestions, pseudo, mode } });
    };

    if (!currentQuestion) return <div className="text-center text-white text-2xl">Chargement...</div>;

    return(
            <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold">Question {currentIndex+1}/{totalQuestions}</div>
          <div className="text-lg font-semibold">Score: {score}</div>
          {mode === 'chrono' && <Timer timeLeft={timeLeft} onTimeOut={handleTimeOut} />}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center">{currentQuestion.texte}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt)}
              className="bg-gray-200 hover:bg-blue-500 hover:text-white transition p-3 rounded-lg font-medium"
            >
              {opt}
            </button>
          ))}
        </div>

        {feedback && (
          <div className={`mt-6 p-3 text-center rounded-lg ${feedback.type === 'correct' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {feedback.text}
          </div>
        )}
      </div>
    </div>
  );
    
};

export default Quiz;
