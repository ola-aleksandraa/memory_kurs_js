import './../styles/Card.css'
import { useState } from 'react';

interface CardProps{
    value: string;
}

function Card ({value}: CardProps) {

    //false - kara zakryta
    //trude - karta odkryta
    const[flipped, setFlipped] = useState(false);
    //handler odrwacał wartośc booleana
    const handleClick = () => {
        setFlipped(!flipped);
    }

    return (
        <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
            <div className='card-inner'>
                <div className='card-front'>?</div>
                <div className='card-back'>{value}</div>
            </div>
        </div>
     
    
    );
}

export default Card;