import Card from "./Card";
import './../styles/Board.css'
import { easyBoard, mediumBoard, hardBoard  } from "../assets/board";

function Board() {

    
    return (
        <div className="board">
            {/* <Card value={123} />  value musi byc strigiem */}
            {mediumBoard.map((card, index) => (
                <Card key={index} value={card} />  //key to unikalny identyfikator kadego elementu, w tym wypadku uzywamy indeksu w tablicy, value czyli wartośc elementu tablicy 
            ))}                                     
        </div>
    );

}



export default Board;