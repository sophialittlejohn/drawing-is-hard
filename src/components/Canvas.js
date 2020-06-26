import React, { useEffect, useRef, useState } from "react";

export const CANVAS_ID = "myCanvas";

export const Canvas = React.memo(() => {
  const canvasRef = useRef(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [last, setLast] = useState({
    x: undefined,
    y: undefined,
  });

  useEffect(() => {});

  function drawLine(canvas, x, y, lastX, lastY) {
    let context = canvas.getContext("2d");

    context.strokeStyle = "#000000";
    context.lineWidth = 12;
    context.lineJoin = "round";

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();

    return [x, y];
  }

  const handleMouseup = () => {
    setMouseDown(false);
    setLast({ x: undefined, y: undefined });
  };

  const handleMousemove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mouseDown) {
      const [lastX, lastY] = drawLine(e.target, x, y, last.x, last.y);
      setLast({ x: lastX, y: lastY });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.height, canvas.width);
  }, []);

  return (
    <canvas
      height={300}
      width={300}
      ref={canvasRef}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={handleMouseup}
      onMouseMove={(e) => handleMousemove(e)}
      id={CANVAS_ID}
      style={{
        border: "3px dotted gray",
        cursor: "pointer",
      }}
    />
  );
});
