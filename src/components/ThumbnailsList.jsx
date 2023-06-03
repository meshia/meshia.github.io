import React, { useContext } from 'react';
import { ImagesContext } from '../context/ImagesContext';
import styled from 'styled-components';
import { Thumbnail } from '../styles/Thumbnail';

const ThumbnailList = styled.div`
    display: flex;
    flex-flow: row wrap;
    `;

export const ThumbnailsList = () => {
    const { imagesList, setSelectedImage } = useContext(ImagesContext);

    const handleImageClick = (event) => {
        setSelectedImage(event.target.src);
    };

    return (
        <ThumbnailList className="ThumbnailsList">
            { imagesList && Object.values(imagesList).map((image) =>
                <Thumbnail key={ image?.name } className="ThumbnailImage" onClick={ handleImageClick }>
                    <img alt={ image?.name } src={URL.createObjectURL(image)}/>
                </Thumbnail>
               )
            }
        </ThumbnailList>
    )
}