import axios from 'axios';

// URL de base de l'API PHP — pointe vers le dossier /api/ du backend
const API_BASE = 'http://localhost/Quizz%20d%C3%A9mographique/back-end/quiz-api/api';

// Récupère des questions aléatoire depuis le backend
export const getQuestion = async () => {
    const res = await axios.get(`${API_BASE}/get_question.php`);
    return res.data;
};

export const checkAnswer = async (questionId, selectedOption) => {
    const res = await axios.post(`${API_BASE}/check_answer.php`, {
        questionId: questionId.id, 
        selectedOption: selectedOption
    });
    return res.data.correct;
};

export const saveScore = async (pseudo, score, mode) => {
    const res = await axios.post(`${API_BASE}/save_score.php`, {pseudo, score, mode});
    return res.data.success;
};

export const getScores = async () => {
    const res = await axios.get(`${API_BASE}/get_scores.php`);
    return res.data;
};