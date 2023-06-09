import { useState } from 'react';
import { UploadImages } from './components/UploadImages';
import { ThumbnailsList } from './components/ThumbnailsList';
import { CanvasImage } from './components/CanvasImage';
import { ImagesContext } from './context/ImagesContext';

const App = () => {
  const [imagesList, setImagesList] = useState([]);
  const [selectedImage, setSelectedImage] = useState();

  return (
    <section className='App'>
      <ImagesContext.Provider value={{ imagesList, setImagesList, selectedImage, setSelectedImage }}>
        <h1>Canvase Jigsaw Puzzle</h1>
        <CanvasImage mainImage={ selectedImage } height="400" width="800"/>
        <ThumbnailsList />
        <UploadImages />
      </ImagesContext.Provider>
    </section>
  )
}

export default App;
