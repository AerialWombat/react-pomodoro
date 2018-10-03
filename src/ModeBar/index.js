import React from 'react';
import './index.css';

const ModeBar = ({ onModeChange }) => {
    return (
        <div className='modes'>
            <button id='pomodoro' className='mode__btn' onClick={onModeChange}>Pomodoro</button>
            <button id='shortbreak' className='mode__btn' onClick={onModeChange}>Short Break</button>
            <button id='longbreak' className='mode__btn' onClick={onModeChange}>Long Break</button>
        </div>
    )
}

export default ModeBar;