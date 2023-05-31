import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

export const Canvas = ({ mainImage, height, width}) => {
    const canvasRef = useRef(null);
    const shape = useRef(null);
    const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {backgroundColor: "#cfcdcd"});

    const handleMouseDown = (event) => {
      isDrawing.current = true;
      const pointer = canvas.getPointer(event.e);

      // Create a new shape (path) on mouse down
      const path = new fabric.Path(`M ${pointer.x} ${pointer.y}`, {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 2
      });

      // Add the shape to the canvas
      canvas.add(path);
      shape.current = path;
    };

    const handleMouseMove = (event) => {
      if (!isDrawing.current) return;
      const pointer = canvas.getPointer(event.e);

      // Update the shape (path) with new point while dragging
      shape.current.path.push(['L', pointer.x, pointer.y]);

      // Render the canvas
      canvas.renderAll();
    };

    const handleMouseUp = () => {
      isDrawing.current = false;

      // Close the shape (path) on mouse up
      shape.current.path.push(['z']);

      // Render the canvas
      canvas.renderAll();
    };

    // Attach the mouse event listeners
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);

    // Clean up the event listeners when the component unmounts
    return () => {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
      canvas.off('mouse:up', handleMouseUp);
    };
  }, []);

  return <canvas width={ width } height={ height } ref={canvasRef}></canvas>
};
