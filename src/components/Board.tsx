import Card from "./Card";
import './../styles/Board.css'
import { useState, useEffect } from "react";
import {CARD_FLIP_DURATION} from "../assets/constants";
import GameStats from "./GameStats";


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

    //stan przechowujący czas gry
    const[timer, setTimer] = useState<number>(0);

    //stan przechowujący informacje czy licznik jest aktywny
    //<number | undefined> - timer jest albo liczbą, albo jest niezdefiniowany (nie istnieje)
    //undefinded - timer jeszcze nie istnieje
    const[timerID, setTimerID] = useState<number | undefined>(undefined); 

    //stan przechoujący stan gry
    const[gameState, setGameState] = useState<boolean | undefined>(undefined);

    //stan dla liczby kroków
    const[steps, setSteps] = useState<number>(0);

    const handleGameStart = () => {

        setIsGameChangePossible(false);

        //resetujemy licznik przed rozpoczęciem nowej gry
        setTimer(0);

        //ustaiwamy stan gry na rozpoczety
        setGameState(true);

        //uruchamiamy licznik
        startTimer();

        //zerujemy liczbe wykonanych kroków
        setSteps(0);
        
    }

   
    const handleCardClick = (index: number, value: string) => {
        if (disabled) return;

        if(flippedCards.find(myCard => myCard.index == index)){
            return;
        }

        if(flippedCards.length==0 && pairCards.length==0 && timer==0){
            handleGameStart();
        }

        //tworzymy kopie tablicy flippedCards i dodajemy do niej index i value tej kliknietej karty
        const newFlippedCards = [...flippedCards, {index, value}];
        setFlippedCards(newFlippedCards);

        //zwiekszamy liczbę ruchuów
        setSteps(nOSteps => nOSteps +1);

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
        //zatrzymujemy timer
        stopTimer();

        //ustawiamy stan gry na zakończony
        setGameState(false);

        console.log("GRA WYGRANA!");
        //timer.toFixed(1) formatuje liczbę do podanej liczby po przecinku
        alert("Gratulacje! Wygrałaś grę! w czasie " + timer.toFixed(1) + " sekund.");
    }

    //wykrywanie konca gry
    useEffect(() => {
        if(pairCards.length === cards.length && cards.length>0){
            gameWonDetected();
        }
    }, [pairCards]);

    const resetGame = () => {
        //usuwamy tan gry
        setGameState(undefined);

        // zakrywamy karty, czyli zerujemy tablice pairedCards i flippedCards
        setPairCards([]);
        setFlippedCards([]);

        //zatrzymujemy licznik czasu
        stopTimer();

        //zerujemy licznik
        setTimer(0);

        //zerujemy liczbe kroków
        setSteps(0);

        setTimeout(() => {
            setNewGameFlag(false);
            setDisabled(false);
            setIsGameChangePossible(true);
        }, CARD_FLIP_DURATION)
    }

    //reset gry po ustawieniu flagi newGameFlag na true
    useEffect(() => {
        if(newGameFlag){
            resetGame();
        }
    }, [newGameFlag])

    const startTimer = () => {
        if (timerID) return //jeeli licznik ju działa to nic nie rób
        setTimerID(setInterval(() => {
            setTimer(prevTimer => {
                return prevTimer + 0.1;
            });
        }, 100));
    }

    const stopTimer = () => {
        if (timerID) {
            clearInterval(timerID);
            setTimerID(undefined);
        }
    }
  
        
    
    return (
        <div className="game-container">
            <GameStats timer={timer} steps = {steps} pairsFound={pairCards.length / 2} totalPairs={cards.length / 2} gameState={gameState} />
            <div className={`board ${level}`}>
                {cards.map((card, index) => (
                    <Card 
                    key={index} 
                    value={card}
                    flipped = {(flippedCards.find((card) => card.index === index)) || pairCards.find((card) => card.index === index) ? true : false} 
                    onClickToBoard={() => handleCardClick(index, card)}/>  
                ))}                                     
            </div>
            <div className="game-score"></div>
        </div>
    );

}



export default Board;