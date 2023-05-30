import React, { useState, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { fabric } from 'fabric';

const HeroImage = styled.div`
    position: relative;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    border-radius: 8px;
    border: 1px solid var(--base-boder);
    padding: 1.2em;
    background-color: inherit;
    canvas {
        border-radius: 8px;
        border: 1px solid var(--base-boder);
    }
    `;

export const CanvasImage = ({ mainImage, height, width}) => {
    const [Canvas, setCanvas] = useState();
    const [ currImage, seCurrImage ] = useState();
    const newImg = new Image();

    useLayoutEffect(() => {
        if( mainImage ) addImageToCanvas();
    }, [ mainImage ]);

    useLayoutEffect(() => {
        setCanvas(initCanvas());
    }, []);
    
    const addImageToCanvas = () => {
        if ( Canvas ) Canvas.clear();
        newImg.src = mainImage;
        newImg.onload = () => {
            const currentImage = new fabric.Image(newImg, {
            });
            currentImage.scaleToHeight(400);
            currentImage.scaleToWidth(400);
            Canvas.centerObject(currentImage);
            Canvas.add(currentImage).renderAll();
            seCurrImage(currentImage);
        };
    }

    const initCanvas = () =>
        new fabric.Canvas("canvas", {
        height: height,
        width: width,
        backgroundColor: "#cfcdcd"
    });

    return (
        <HeroImage>
            <canvas width={ width } height={ height } id="canvas"></canvas>
            
        </HeroImage>
    )
}