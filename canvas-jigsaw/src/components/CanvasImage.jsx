import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { fabric } from 'fabric';
import { Button } from '../styles/Button';

const CanvasContainer = styled.div`
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
    const [ Canvas, setCanvas ] = useState();
    const [ isDrawing, setIsDrawing ] = useState(false);
    const ImageRef = useRef(null);
    const ShapeRef = useRef(null);

    useLayoutEffect(() => {
        if( mainImage ) addImageToCanvas();
    }, [ mainImage ]);

    useLayoutEffect(() => {
        setCanvas(initCanvas());
    }, []);
    
    const addImageToCanvas = () => {
        if ( Canvas ) Canvas.clear();
        const newImg = new Image();
        newImg.src = mainImage;
        newImg.onload = () => {
            const currentImage = new fabric.Image(newImg, {
                selectable: true
            });
            currentImage.scaleToHeight(400);
            currentImage.scaleToWidth(400);
            Canvas.centerObject(currentImage);
            Canvas.add(currentImage).renderAll();
            ImageRef.current = currentImage;
        };
    }

    const initCanvas = () =>
        new fabric.Canvas("canvas", {
        height: height,
        width: width,
        backgroundColor: "#cfcdcd"
    });

    const handleDrawShape = (event) => {
        Canvas.isDrawingMode = true;
        Canvas.freeDrawingBrush.width = 5;
        Canvas.freeDrawingBrush.color = 'red';
        Canvas.selection = false;
    
        // Event listener for when drawing is complete
        Canvas.on('path:created', (event) => {
            const path = event.path;
            const shape = new fabric.Path(path.path, {
              fill: 'black',
              stroke: 'black',
              strokeWidth: 2,
              selectable: true
            });
            Canvas.remove(path);
            Canvas.add(shape);
            Canvas.renderAll();
            ShapeRef.current = shape;
        });
    };

    const handleCutout  = (event) => {
        
    };

    return (
        <CanvasContainer>
            <Button onClick={ handleCutout }>Cut Image</Button>
            <Button onClick={ handleDrawShape }>Draw Shape</Button>
            <canvas width={ width } height={ height } id="canvas"></canvas>
        </CanvasContainer>
    )
}