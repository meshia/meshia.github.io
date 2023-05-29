import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const HeroImage = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 1.2em;
    background-color: inherit;
    border-color: var(--base-boder);
    canvas {
        height: 400px;
        aspect-ratio: 4/3;
        background-color: var(--background-canvas);
        border-radius: 8px;
    }
    `;

export const CanvasImage = ({ mainImage, height, width}) => {
    const canvas = useRef();

    useEffect(() => {
        const context = canvas.current.getContext('2d');
        draw(context);
    });

    const draw = (context) => {
        if(mainImage) {
            const image = new Image();
            image.src = mainImage;
            image.height = canvas.current.offsetHeight; 
            console.log(canvas.current.offsetHeight, image.height)
            image.onload = () => {
                context.drawImage(image, 0, 0,
                canvas.current.offsetWidth*0.6, canvas.current.offsetHeight*0.5); //TODO: keep ratio of image
            };  
        }
    }; 

    return (
        <HeroImage>
            <canvas ref={ canvas }></canvas>
        </HeroImage>
    )
}