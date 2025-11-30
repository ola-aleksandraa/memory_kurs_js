import { useState } from 'react'
import './App.css'
import ScoreDisplay from './components/ScoreDisplay';
import ActionButton from './components/ActionButton';

function App() {
  const [points, setPoints] = useState(0);
  
  return (
    <>
      {/* to będziemy usuwać */}
      <h1>Moja pierwsza aplikacja React</h1> 
      <p>Wszytsko co wpiszemy w return() wyświetla się na ekranie!</p>
      <p>Działanie useStates:</p>
      <h2> Punkty: {points}</h2>

      <div>
        <button onClick={() => setPoints(points+1)}>
          Dodaj punkt
        </button>
        <button onClick={() => setPoints(0)}>
          Resetuj punkty
        </button>
      </div>
      {/* do tąd */}

      <ScoreDisplay points={points} /> 
      <ActionButton onClick={() => setPoints(points+10)} label='+10' />
      <ActionButton onClick={() => setPoints(points-5)} label='-5' />
      <ActionButton onClick={() => setPoints(0)} label='reset' />
    </>
  )
}

export default App
