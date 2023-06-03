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
    const ImageRef = useRef(null);
    const ShapeRef = useRef(null);
    const CUTOUT_COLOR = "black";

    useLayoutEffect(() => {
        if( mainImage ) addImageToCanvas();
    }, [ mainImage ]);

    useLayoutEffect(() => {
        setCanvas(initCanvas());
    }, []);
    
    const addImageToCanvas = () => {
        if ( Canvas ) Canvas.clear();
        fabric.Image.fromURL(mainImage, (img) => {
            img.set({
                selectable: true
            });
            img.scaleToHeight(400);
            img.scaleToWidth(400);
            Canvas.centerObject(img);
            Canvas.add(img).renderAll();
            ImageRef.current = img;
            console.log(ImageRef.current);
        });
    }

    const initCanvas = () =>
        new fabric.Canvas("canvas", {
        height: height,
        width: width,
        backgroundColor: "#cfcdcd"
    });

    const handleDrawPuzzleShape = (event) => {
        Canvas.isDrawingMode = true;
        Canvas.freeDrawingBrush.width = 5;
        Canvas.freeDrawingBrush.color = CUTOUT_COLOR;
        Canvas.selection = false;
        ImageRef.current.selectable = false;
    
        // Event listener for when drawing is complete
        Canvas.on('path:created', (event) => {
            console.log(":created")
            const path = event.path;
            const cut = new fabric.Path(path.path, {
                fill: CUTOUT_COLOR,
                dirty: true,
                strokeWidth: 1,
                opacity: 1,
                selectable: false,
            });
            const shape = new fabric.Path(path.path, {
                fill: CUTOUT_COLOR,
                dirty: true,
                strokeWidth: 1,
                opacity: 1,
                selectable: true,
                zoomX: 1,
                zoomY: 1
            });
            const pattern = new fabric.Pattern({
                source: Canvas.getElement(),
                repeat: 'no-repeat',
                offsetX: ( shape.left+shape.width*0.3 )*-1,
                offsetY: ( shape.top+shape.top*0.3 )*-1,
            });
            shape.fill = pattern;
            Canvas.remove(path);
            Canvas.add(shape);
            Canvas.isDrawingMode = false;
            Canvas.selection = true;
            Canvas.renderAll();
            Canvas.add(cut);
            Canvas.sendToBack(cut);
            Canvas.sendToBack(ImageRef.current);
            Canvas.renderAll();
            Canvas.off('path:created');
        });
    };


    const addPattern = (obj, pattern) => {
        fabric.util.loadImage('http://fabricjs.com/assets/pug_small.jpg', function (img) {
            obj.fill = new fabric.Pattern({
                source: img,
                repeat: 'no-repeat'
            }); 
            Canvas.renderAll();
          });
      }

    return (
        <CanvasContainer>
            <Button onClick={ handleDrawPuzzleShape }>Draw Shape</Button>
            <canvas width={ width } height={ height } id="canvas"></canvas>
        </CanvasContainer>
    )
}