import './../styles/Card.css'

interface CardProps{
    value: string;
}

function Card ({value}: CardProps) {

    return <div className='card'>{value}</div>;
}

export default Card;