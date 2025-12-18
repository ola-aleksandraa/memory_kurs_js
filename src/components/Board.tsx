import Card from "./Card";
import './../styles/Board.css'
import { useState } from "react";


interface BoardProps{
    cards: string[];
    level: "easy" | "medium" | "hard";
    setIsGameChangePossible: (value: boolean) => void;
}

interface FlippedCard{
    index: number;
    value: string;
}

function Board({cards, level, setIsGameChangePossible} : BoardProps) {

    const[flippedCards, setFlippedCards] = useState<FlippedCard[]>([]);

    //stan przechowuje odwrócone karty - FlippedCards
    const[pairCards, setPairCards] = useState<FlippedCard[]>([]);

    //stan blokujący mozliwośc odwracania nowych kart
    const[disabled, setDisabled] = useState(false);

    const handleGameStart = () => {

        setIsGameChangePossible(false);
        
    }

   
    const handleCardClick = (index: number, value: string) => {
        if (disabled) return;

        //tworzymy kopie tablicy flippedCards i dodajemy do niej index i value tej kliknietej karty
        const newFlippedCards = [...flippedCards, {index, value}];
        setFlippedCards(newFlippedCards);

        if(flippedCards.find(myCard => myCard.index == index)){
            return;
        }

        if(flippedCards.length==0 && pairCards.length==0){
            handleGameStart();
        }

        if(newFlippedCards.length == 2){
            if (newFlippedCards[0].value == value){
                //para znaleziona - dodajemy do pairCards
                setPairCards([...pairCards, newFlippedCards[0], {index, value}]);
                setFlippedCards([]);
            }
            else{
                //para nieznaleziona
                setDisabled(true);
                setTimeout(() => {
                    setFlippedCards([]);
                    setDisabled(false);
                }, 400);
            }
        }

    }

    

    
    
    return (
        <div className={`board ${level}`}>
            {cards.map((card, index) => (
                <Card 
                key={index} 
                value={card}
                flipped = {(flippedCards.find((card) => card.index === index)) || pairCards.find((card) => card.index === index) ? true : false} 
                onClickToBoard={() => handleCardClick(index, card)}/>  
            ))}                                     
        </div>
    );

}



export default Board;