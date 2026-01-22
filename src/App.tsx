import './App.css'
import Board from './components/Board'
import { useState, type ChangeEvent, useEffect } from 'react';
import { easyBoard, mediumBoard, hardBoard  } from "./assets/board";

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

function App() {

  //useState pozwala nam zapamiętać wybrany poziom gry (stan komponentu)
  //mamy 3 moliwe poziomy, wyjściowo ustawiamy łatwy
  const[level, setLevel] = useState< "easy" | "medium" | "hard" >('easy');

  //useState, który bedzie przechowywał i zmieniał moliwośc zmiany poziomu
  const[isGameChangePossible, setIsGameChangePossible] = useState(true);

  //useState, który będzie przekazywał czy kliknelismy przycisk resetu gry
  const[newGameFlag, setNewGameFlag] = useState(false);

  //handleChange to funkcja, która obsługuje zmianę w <select>
  //e to jest to co my klikamy - element select
  //e.target.value to wybrana wartośc z <select>
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value as "easy"|"medium"|"hard");
    setCards(getBoard(e.target.value as "easy"|"medium"|"hard"));
  };

  useEffect(() => {
    //najpierw pobieramy element select po id  i nadajemy mu albo HTMLSelectElement lub null
    const select = document.getElementById("levelChangeSelect") as HTMLSelectElement | null; 

    if(select){
      select.disabled = !isGameChangePossible;
}
  }, [isGameChangePossible]); //za pomoca isGamePossible useEffect uruchamia się zawsze przy jego zmianie 



  //wybiermy tablice z listy i zapisujemy do zmiennej currentBoard, która potem na tej podstawie zapsiuje jaką plansze ma uzyć
  const getBoard = (level: "easy"|"medium"|"hard") => {
    let currentBoard;
    if (level === "easy") currentBoard = easyBoard;
    else if (level === "medium") currentBoard = mediumBoard;
    else currentBoard = hardBoard;

    return shuffleArray(currentBoard);
  }

  //cards przechpwuje aktualna tablicę kart na planszy, domyslnie jest to tablica dla poziomu level 
  //setCards pozwala zmienić tablicę kart na planszy 
  const[cards, setCards] = useState<string[]>(getBoard(level));

  useEffect(() => {
    if(!newGameFlag){
      setCards(getBoard(level));
    }
  }, [newGameFlag]);

  return (
    <div className='app'>
      <h1>Gra Memory</h1>
      <div className='controls'> {/*"pojemnik" z wyborem poziomu trudności*/}
      <label>
        Wybierz poziom trudności:
        <select id='levelChangeSelect' value={level} onChange={handleChange}>
          <option value="easy">Łatwy</option>
          <option value="medium">Średni</option>
          <option value="hard">Trudny</option>
        </select>
      </label>
      </div>
      <Board cards={cards} level={level} setIsGameChangePossible={setIsGameChangePossible} newGameFlag={newGameFlag} setNewGameFlag={setNewGameFlag}/>
      <div className='newGame'>
        <button onClick={() => {setNewGameFlag(true)}}>Nowa Gra</button>
      </div>
    </div>
  );
}

export default App
