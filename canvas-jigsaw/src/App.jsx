import { useState, useEffect } from 'react';
import { UploadImages } from './components/UploadImages';
import { ThumbnailsList } from './components/ThumbnailsList';
import { CanvasImage } from './components/CanvasImage';
import { ImagesContext } from './context/ImagesContext';

import './App.css';

const App = () => {
  const [imagesList, setImagesList] = useState([]);
  const [selectedImage, setSelectedImage] = useState();

  return (
    <div className='App'>
      <ImagesContext.Provider value={{ imagesList, setImagesList, selectedImage, setSelectedImage }}>
        <h1>Canvase Jigsaw Puzzle</h1>
        <CanvasImage mainImage={ selectedImage }/>
        <ThumbnailsList />
        <UploadImages />
      </ImagesContext.Provider>
    </div>
  )
}

export default App;
