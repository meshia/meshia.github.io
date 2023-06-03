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
            img.set({ selectable: true });
            img.scaleToHeight(400);
            img.scaleToWidth(400);
            Canvas.centerObject(img);
            Canvas.add(img).renderAll();
            ImageRef.current = img;
        });
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
        Canvas.freeDrawingBrush.color = CUTOUT_COLOR;
        Canvas.selection = false;
        ImageRef.current.selectable = false;
    
        // Event listener for when drawing is complete
        Canvas.on('path:created', (event) => {
            const path = event.path;
            const cut = new fabric.Path(path.path, {
                fill: CUTOUT_COLOR,
                dirty: true,
                strokeWidth: 2,
                opacity: 1,
                selectable: false,
            });
            Canvas.add(cut);
            const shape = new fabric.Path(path.path, {
              fill: CUTOUT_COLOR,
              dirty: true,
              strokeWidth: 2,
              opacity: 1,
              selectable: true,
            });

            fabric.util.loadImage(mainImage, function (img) {
                shape.set ({
                    stroke: "red",
                })
                shape.fill = new fabric.Pattern({
                    source: img,
                    repeat: 'repeat'
                }); 
                Canvas.add(shape);
                Canvas.isDrawingMode = false;
                //Canvas.remove(shape);
                Canvas.selection = true;
                Canvas.renderAll();
                ShapeRef.current = shape;
            });
            Canvas.remove(path);
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
            <Button onClick={ handleDrawShape }>Draw Shape</Button>
            <canvas width={ width } height={ height } id="canvas"></canvas>
        </CanvasContainer>
    )
}