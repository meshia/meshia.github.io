import React, { useContext } from 'react';
import { ImagesContext } from '../context/ImagesContext';
import { Button } from '../styles/Button';


export const UploadImages = () => {
    const { imagesList, setImagesList } = useContext(ImagesContext);
    const hiddenFileInput = React.useRef(null);
  
    const handleClick = (event) => {
        hiddenFileInput.current.click();
      };

    const handleChange = (event) => {
        const fileUploaded = event.target.files;
        setImagesList(fileUploaded);
    };

    return (
        <>
        <Button onClick={handleClick}>
            Upload Images
        </Button>
        <input type="file" multiple
             accept='image'
             ref={hiddenFileInput}
             onChange={handleChange}
             style={{display:'none'}} 
        />
        </>
    )
}

 