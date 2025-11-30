import { useState } from 'react'
import './App.css'
import ScoreDisplay from './components/ScoreDisplay';
import ActionButton from './components/ActionButton';
import Player from './components/Players';

//trzyma wyniki w pamięci
//<number> oznacza e w tym use =State będzie uyta liczba
function App() {
  const[playerA, setPlayerA] = useState<number>(0);
  const[playerB, setPlayerB] = useState<number>(0);
  
  return (
    <>
      <h1>Gra dla dwóch graczy</h1>
      <Player name='Gracz A' score={playerA} onAddPoint={() => setPlayerA(playerA+1)} />
      <Player name='Gracz B' score={playerB} onAddPoint={() => setPlayerB(playerB+1)} />
      <button onClick = {() => {setPlayerA(0); setPlayerB(0);}}> Reset obu graczy</button>
    </>
  )
}

export default App
