import { useState, useEffect } from 'react';
import { UploadImages } from './components/UploadImages';
import { ThumbnailsList } from './components/ThumbnailsList';
import { Canvas } from './components/Canvas';
import { CanvasImage } from './components/CanvasImage';
import { ImagesContext } from './context/ImagesContext';

const App = () => {
  const [imagesList, setImagesList] = useState([]);
  const [selectedImage, setSelectedImage] = useState();

  return (
    <section className='App'>
      <ImagesContext.Provider value={{ imagesList, setImagesList, selectedImage, setSelectedImage }}>
        <h1>Canvase Jigsaw Puzzle</h1>
        {/* <Canvas mainImage={ selectedImage } height="400" width="600"/> */}
        <CanvasImage mainImage={ selectedImage } height="400" width="600"/>
        <ThumbnailsList />
        <UploadImages />
      </ImagesContext.Provider>
    </section>
  )
}

export default App;
