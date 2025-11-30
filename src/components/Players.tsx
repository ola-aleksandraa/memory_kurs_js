import { useEffect } from "react";

interface PlayersProps {
    name: string;
    score: number;
    onAddPoint: () => void
}

export default function Player ({name, score, onAddPoint}: PlayersProps){

    useEffect(() => {
        console.log(`${name} ma teraz ${score} punktów`);
        if(score>10){
            alert(`${name} wygrał grę`);
        }
    }, [score]);

    return <div>
        <h3>{name}</h3>
        <p>Punkty: {score}</p>
        <button onClick={onAddPoint}>Zdobądź punkt</button>
    </div>
}

// export default Player