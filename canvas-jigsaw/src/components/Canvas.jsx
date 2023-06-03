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

export const Canvas = ({ mainImage, height, width}) => {
    const canvasRef = useRef(null);

  useEffect(()=>{
    const canvas = new fabric.Canvas(canvasRef.current, {
        selection: false,
        backgroundColor: "#cfcdcd"
      });

    if(canvas && mainImage) {
        const rect = new fabric.Rect({
            width: 200,
            height: 200,
            left: 100,
            top: 100,
            fill: new fabric.Pattern({
              source: mainImage,
              repeat: 'repeat'
            })
          });
      
          canvas.add(rect);
          canvas.renderAll();
    }
  }, [mainImage, canvasRef])

  return (
    <div>
      <canvas width={width} height={height} ref={canvasRef} />
    </div>
  );
}