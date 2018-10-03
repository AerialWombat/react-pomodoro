import React from 'react';
import './index.css';

const Timer = ({ minutesRemaining, secondsRemaining, onStart, onPause, onReset }) => {
    return (
        <div className='timer'>
            <h1 className='timer__display'>{minutesRemaining}:{String(secondsRemaining).padStart(2, '0')}</h1>
            <div className='timer__controls'>
                <button className='timer__btn' onClick={onStart}>
                    <i className='material-icons'>play_arrow</i>
                    Start
                </button>
                <button className='timer__btn' onClick={onPause}>
                    <i className='material-icons'>pause</i>
                    Pause
                </button>
                <button className='timer__btn' onClick={onReset}>
                    <i className='material-icons'>replay</i>
                    Reset
                </button>
            </div>
        </div>
    )
}

export default Timer;