import React, { useContext, useRef } from 'react';
import { ImagesContext } from '../context/ImagesContext';
import { Button } from '../styles/Button';

export const UploadImages = () => {
    const { setImagesList } = useContext(ImagesContext);
    const hiddenFileInput = useRef(null);
  
    const handleClick = (event) => {
        hiddenFileInput.current.click();
      };

    const handleChange = (event) => {
        const fileUploaded = event.target.files;
        setImagesList(fileUploaded);
    };

    return (
        <div className="UploadImages">
        <Button onClick={handleClick}>
            Upload Images
        </Button>
        <input type="file" multiple
               className="hidden"
               accept="image"
               ref={hiddenFileInput}
               onChange={handleChange} />
        </div>
    )
}

 