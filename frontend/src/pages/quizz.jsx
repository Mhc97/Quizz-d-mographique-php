import {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {getQuestion, checkAnswer} from '.../services/api';
import Timer from '.../components/Timer';

const Quiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {mode, pseudo} = location.state || {mode: 'normal', pseudo: 'Anonyme'};
    const totalQuestions =10;


}
