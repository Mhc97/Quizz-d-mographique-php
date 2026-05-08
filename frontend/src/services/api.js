import axios from 'axios'

const API_BASE = 'http://localhost/Quiz_démographique/backend/api';

export const getQuestion = async () => {
    const res = await axios.get(`${API_BASE}/get_question.php`):
    return res.data;
};

export const chekAnswer = async (questionId, selectedOption) => {
    const res = await axios.post(`${API_BASE}/check_answer.php, {questionId, selectedOption}`);
    return res.data.correct;
};

export const saveScore = async (pseudo, ScrollRestoration, mode)=>{
    const res = await axios.post(`${API_BASE}/save_score.php`, {pseudo, score, mode});
    return res.data.success;
};

export const getScores = async () => {
    const res = await axios.get(`${API_BASE}/get_scores.php`);
    return res.data;
};