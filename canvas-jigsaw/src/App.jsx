import { useState, useEffect } from 'react';
import { UploadImages } from './components/UploadImages';
import { ImagesContext } from './context/ImagesContext';

import './App.css';

const App = () => {
  const [imagesList, setImagesList] = useState([]);

  useEffect(() =>{
    console.log('imagesList', imagesList);
  }, [ imagesList ])

  return (
    <div className='App'>
      <ImagesContext.Provider
        value={{ imagesList, setImagesList }}
        >
        <h1>Canvase Jigsaw Puzzle</h1>
        <UploadImages />
      </ImagesContext.Provider>
    </div>
  )
}

export default App;
