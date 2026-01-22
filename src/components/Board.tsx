import Card from "./Card";
import './../styles/Board.css'
import { useState, useEffect } from "react";
import {CARD_FLIP_DURATION} from "../assets/constants"


interface BoardProps{
    cards: string[];
    level: "easy" | "medium" | "hard";
    setIsGameChangePossible: (value: boolean) => void;
    newGameFlag: boolean;
    setNewGameFlag: (value: boolean) => void;
}

interface FlippedCard{
    index: number;
    value: string;
}

function Board({cards, level, setIsGameChangePossible, newGameFlag, setNewGameFlag} : BoardProps) {

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
                }, CARD_FLIP_DURATION);
            }
        }
    }

    const gameWonDetected = () => {
        console.log("GRA WYGRANA!");
        alert("Gratulacje! Wygrałaś grę!");
    }

    //wykrywanie konca gry
    useEffect(() => {
        if(pairCards.length === cards.length && cards.length>0){
            gameWonDetected();
        }
    }, [pairCards]);

    const resetGame = () => {
        // zakrywamy karty, czyli zerujemy tablice pairedCards i flippedCards
        setPairCards([]);
        setFlippedCards([]);

        setTimeout(() => {
            setNewGameFlag(false);
            setDisabled(false);
            setIsGameChangePossible(true);
        }, CARD_FLIP_DURATION)

        //reset gry po ustawieniu flagi newGameFlag na true
        useEffect(() => {
            if(newGameFlag){
                resetGame();
            }
        }, [newGameFlag])
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