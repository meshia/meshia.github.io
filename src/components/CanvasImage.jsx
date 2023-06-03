import React, { useState, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { fabric } from 'fabric';
import { Button } from '../styles/Button';
import { ReactComponent as LockIcon } from '../assets/icons/lock.svg';
import { ReactComponent as PuzzleIcon } from '../assets/icons/puzzle.svg';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const CanvasContainer = styled.div`
    position: relative;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    border-radius: var(--border-radius);
    border: 1px solid var(--base-boder);
    padding: var(--base-padding);
    background-color: inherit;
    canvas {
        width: 100%;
        border-radius: var(--border-radius);
        border: 1px solid var(--base-boder);
    }
`;

const ToolkitDiv = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    background-color: inherit;
    padding-bottom: var(--base-padding);
    height: 0;
    padding: 0;
    transition: all ease-out 1s;
    overflow: hidden;
    &.show {
        height: 50px;
    }
`;

export const CanvasImage = ({ mainImage, height, width}) => {
    const [ Canvas, setCanvas ] = useState();
    const [ PuzzleRef, setPuzzleRef ] = useState(null);
    const [ lockedImage, setLockedImage ] = useState(false);
    const ImageRef = useRef(null);
    const [ displayToolkit, setDisplayToolkit ] = useState("");
    const CUTOUT_COLOR = "#cfcdcd";

    useLayoutEffect(() => {
        if( mainImage ) {
            addImageToCanvas();
            setDisplayToolkit("show");
        }
    }, [ mainImage ]);

    useLayoutEffect(() => {
        setCanvas(initCanvas());
    }, []);
    
    const initCanvas = () =>
        new fabric.Canvas("canvas", {
        height: height,
        backgroundColor: "#cfcdcd"
    });
    
    const addImageToCanvas = () => {
        if ( Canvas ) Canvas.clear();
        fabric.Image.fromURL(mainImage, (img) => {
            img.set({
                selectable: true,
            });
            img.scale(0.5);
            Canvas.centerObject(img);
            Canvas.add(img).renderAll();
            ImageRef.current = img;
            setLockedImage(true);
        });
    }

    const handleDrawPuzzleShape = (event) => {
        Canvas.isDrawingMode = true;
        Canvas.freeDrawingBrush.width = 5;
        Canvas.freeDrawingBrush.color = CUTOUT_COLOR;
        Canvas.selection = false;
        ImageRef.current.selectable = false;
        setLockedImage(false);
    
        // Event listener for when drawing is complete
        Canvas.on('path:created', (event) => {
            const path = event.path;
            const cut = new fabric.Path(path.path, { // the hole behind the puzzle piece
                fill: CUTOUT_COLOR,
                dirty: true,
                strokeWidth: 1,
                opacity: 1,
                selectable: false,
            });

            const shape = new fabric.Path(path.path, {// the puzzle piece
                fill: CUTOUT_COLOR,
                dirty: true,
                strokeWidth: 1,
                opacity: 1,
                visible: true,
                selectable: true,
                bind: cut,
            });

            shape.on("mousedown", (event)=> {
                setPuzzleRef(event.target);
            })

            Canvas.on('object:removed', (event) =>{
                if(event.target.bind) {
                    Canvas.remove(event.target.bind);
                }

            })
            setPuzzleRef(shape);
    
            const ctx = Canvas.getContext("2d");
            const img = new Image();
            img.src = mainImage;
            const matrix = new DOMMatrix([1, 0, 0, 1, ( shape.left - ImageRef.current.left + shape.width/2 )*-1, ( shape.top - ImageRef.current.top + shape.height/2 )*-1]);
            const pattern = ctx.createPattern(img, "no-repeat");
             pattern.setTransform(matrix.scale(0.5));

            shape.fill = pattern;
            Canvas.remove(path);
            Canvas.add(shape);
            Canvas.isDrawingMode = false;
            Canvas.selection = true;
            Canvas.renderAll(); //render the piece of the puzzle

            Canvas.add(cut);
            Canvas.sendToBack(cut);
            Canvas.sendToBack(ImageRef.current);
            Canvas.renderAll(); //render the hole behind the piece of the puzzle *after* the puzzle piece has been rendered
            Canvas.off('path:created'); //remove event
        });
    };

    const handleLockSelectedImage = (event) => {
        const imageRef = ImageRef.current;
        if(lockedImage) {
            imageRef.selectable = false;
            Canvas.selection = false;
            setLockedImage(false);
        } else {
            imageRef.selectable = true;
            Canvas.selection = true;
            setLockedImage(true);
        }
    };

    const handleDeleteShape = (event) => {
        confirmAlert({
            title: 'Are you sure?',
            message: 'You want to delete this puzzle piece?',
            buttons: [
                {
                label: 'Yes',
                onClick: () => { 
                        Canvas.remove(PuzzleRef);
                        setPuzzleRef(null);
                    }
                },
                {
                label: 'No'
                }
            ],
          });
    }

    return (
        <CanvasContainer>
            <canvas width={ width } height={ height } id="canvas"></canvas>
            <ToolkitDiv className={ displayToolkit }>
                <Button className={`iconButton ${ lockedImage ? "" : "active"}`} onClick={ handleLockSelectedImage }>
                    <LockIcon />
                    <span>Lock Selected Image</span>
                </Button>
                <Button className="iconButton" onClick={ handleDrawPuzzleShape }>
                    <PuzzleIcon />
                    <span>Cut a Puzzle Piece</span>
                </Button>
                { PuzzleRef !== null && <Button className="iconButton" onClick={ handleDeleteShape }>
                    X
                    <span>Delete Puzzle Piece</span>
                </Button>
                }
            </ToolkitDiv>
        </CanvasContainer>
    )
}