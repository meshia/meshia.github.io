import { useState } from 'react';
// import reactLogo from './assets/react.svg'
import { CSSVariables } from './styles/CSSVriables';
import { UploadImages } from './components/UploadImages';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <CSSVariables>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <UploadImages />
      </CSSVariables>
    </div>
  )
}

export default App
