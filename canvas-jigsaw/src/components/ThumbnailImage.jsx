import React, { useContext, useEffect, useState } from 'react';
import { ImagesContext } from '../context/ImagesContext';
import { Thumbnail } from '../styles/Thumbnail';

export const ThumbnailImage = (imageData) => {
    const { setSelectedImage } = useContext(ImagesContext);

    const handleImageClick = (event) => {
        console.log(event.target)
    };

    return (
        <Thumbnail onClick={handleImageClick}>
            <img className="ThumbnailImage" alt="" src={URL.createObjectURL(imageData)}/>
        </Thumbnail>      
    )
}