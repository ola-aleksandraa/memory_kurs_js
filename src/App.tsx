import { useState } from 'react'
import './App.css'

function App() {
  const [points, setPoints] = useState(0);
  
  return (
    <>
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
    </>
  )
}

export default App
