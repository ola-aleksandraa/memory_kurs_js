import './../styles/Card.css'
import { useState } from 'react';

interface CardProps{
    value: string;
    flipped: boolean;
    onClickToBoard: () => void;
}

function Card ({value, flipped, onClickToBoard}: CardProps) {

   

    return (
        <div className={`card ${flipped ? 'flipped' : ''}`} onClick={onClickToBoard}>
            <div className='card-inner'>
                <div className='card-front'>?</div>
                <div className='card-back'>{value}</div>
            </div>
        </div>
     
    
    );
}

export default Card;