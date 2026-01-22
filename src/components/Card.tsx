import './../styles/Card.css'
import { imageMap, colorMap } from '../assets/images';
import { useState, useEffect, use } from 'react';


interface CardProps{
    value: string;
    flipped: boolean;
    onClickToBoard: () => void;
}

function Card ({value, flipped, onClickToBoard}: CardProps) {

   //stan do przechowywania ścieki obrazka
   const [imageSrc, setImageSrc] = useState<string | null>(null)

   useEffect(() => {
    if(imageMap[value]){
        setImageSrc(imageMap[value]);
    }
    else {
        setImageSrc(null);
    }
   }, [value]);

   const cardFront = imageMap['front'];
   const cardColour = colorMap[value] || 'lightgray';

    return (
        <div className={`card ${flipped ? 'flipped' : ''}`} onClick={onClickToBoard}>
            <div className='card-inner'>
                <div className='card-front'>
                    <img src={cardFront} alt="Awers karty" />
                </div>
                <div className='card-back'style={{backgroundColor: cardColour}}>
                    {imageSrc ? (<img src={imageSrc} alt={`Karta ${value}`} className="card-image" />) : (<span>{value}</span>)}
                </div>
            </div>
        </div>
    );
}

export default Card;