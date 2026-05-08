import { useEffect } from 'react';

const Timer = ({timeLeft, onTimeOut}) => {
    useEffect(() => {
        if (timeLeft === 0){
            onTimeOut();
        }
    }, [timeLeft, onTimeOut]);
    return (
        <div className="text-xl font-bold text-red-600 bg-white rounded-full px-4 py-2 shadow inline-block">
            ⏱️ {timeLeft} s
        </div>
    );
};

export default Timer;