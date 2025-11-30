//interface opisuje jaką strukturę powinien mieć dany obiekt
//ten interface musi otrzymać prop points, który jest liczbą
interface ScoreDisplayProps {
    points: number;
}

// {points} - destrukturyzacja, wyciaga points z obiektu props
// :ScoreDisplayProps - sprawdzenie czy props pasuja do interfacu
function ScoreDisplay({points}: ScoreDisplayProps) {
    return <h2>Wynik: {points}</h2>
}

export default ScoreDisplay;