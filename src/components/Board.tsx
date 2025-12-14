import Card from "./Card";
import './../styles/Board.css'
import { easyBoard, mediumBoard, hardBoard  } from "../assets/board";

function shuffleArray(array: string[]){

    const newArray = []; //nowa tablica, w której będziemy umieszczać potasowane karty
    const copy = [...array]; //kopiujemy oryginalna tabllicę, ... kopiuja tablicę bo inaczej obie by wskazywały ta sama tablicę

    while (copy.length>0){
        const index = Math.floor(Math.random() * copy.length); //Math.random wybiera losową liczbę z przedziału od 0 do 1, skalujemy to na długośc tablicy, a nstępnie Math.floor przyblia to do najblisza liczby calkowitej 
        newArray.push(copy[index]); //dodajemy element do nowej tabllicy
        copy.splice(index, 1); //usuwamy wylosowany element i zmniejszamy tablice o jeden oraz przechodzimy na początek pętli
    }

    return newArray;
}

function Board() {

    const shuffCards = shuffleArray(mediumBoard); //wywołanie funkcji tasującej i przypisaie wyniku do stałej
    
    return (
        <div className="board">
            {shuffCards.map((card, index) => (
                <Card key={index} value={card} />  
            ))}                                     
        </div>
    );

}



export default Board;