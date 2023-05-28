import { useState, useEffect } from 'react';
import { UploadImages } from './components/UploadImages';
import { ThumbnailsList } from './components/ThumbnailsList';
import { ImagesContext } from './context/ImagesContext';

import './App.css';

const App = () => {
  const [imagesList, setImagesList] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);

  useEffect(() =>{

  }, [ imagesList ])

  useEffect(() =>{
    console.log(selectedImage)
  }, [ selectedImage ])

  return (
    <div className='App'>
      <ImagesContext.Provider value={{ imagesList, setImagesList, selectedImage, setSelectedImage }}>
        <h1>Canvase Jigsaw Puzzle</h1>
        <ThumbnailsList />
        <UploadImages />
      </ImagesContext.Provider>
    </div>
  )
}

export default App;
