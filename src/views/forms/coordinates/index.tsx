import { MouseEvent, useRef } from "react";

function CanvasPage() {
  let canvasRef = useRef(null);

  let mousedown = false;
  let last_mousex = 0;
  let last_mousey = 0;
  let mousex = 0;
  let mousey = 0;
  let width = 0;
  let height = 0;

  function getProperties() {
    let canvas: any = canvasRef.current;
    let context = canvas.getContext("2d");
    let position = canvas.getBoundingClientRect();
    let left = position.left;
    let top = position.top;

    return { canvas, context, left, top };
  }

  function mouseDownHandler(e: MouseEvent<HTMLCanvasElement>) {
    let { left, top } = getProperties();
    last_mousex = e.pageX - left;
    last_mousey = e.pageY - top;
    mousedown = true;
  }

  function mouseUpHandler() {
    mousedown = false;
  }

  function mouseMoveHandler(e: MouseEvent<HTMLCanvasElement>) {
    let { context, canvas, left, top } = getProperties();

    mousex = e.pageX - left;
    mousey = e.pageY - top;
    width = mousex - last_mousex;
    height = mousey - last_mousey;

    if (!mousedown) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.rect(last_mousex, last_mousey, width, height);
    context.strokeStyle = "red";
    context.lineWidth = 1;
    context.stroke();
  }

  return (
    <div style={{ textAlign: "center" }}>
      <canvas
        width={700}
        height={900}
        style={{
          border: "1px solid #000",
        }}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
        ref={canvasRef}
      ></canvas>
    </div>
  );
}

export default CanvasPage;
