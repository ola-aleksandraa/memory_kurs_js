import Card from "./Card";
import './../styles/Board.css'
import { easyBoard, mediumBoard, hardBoard  } from "../assets/board";

function Board() {

    const cards = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊'];
    
    return (
        <div className="board">
            {cards.map((card, index) => (
                <Card key={index} value={card} />   //key to unikalny identyfikator kadego elementu, w tym wypadku uzywamy indeksu w tablicy, value czyli wartośc elementu tablicy 
            ))}                                     
        </div>
    );

/* WYNIK MAPY
<div className="board">
    <Card key={0} value={'🐶'} />
    <Card key={1} value={'🐱'} />
    <Card key={2} value={'🐭'} />
    <Card key={3} value={'🐹'} />
    <Card key={4} value={'🐰'} />
    <Card key={5} value={'🦊'} />
</div>
*/

}



export default Board;