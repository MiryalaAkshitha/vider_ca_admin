import Loader from "components/Loader";
import { MouseEvent, useEffect, useRef, useState } from "react";

function Dashboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);

  let pageRef = useRef<any>(null);
  let renderContextRef = useRef<any>(null);
  const prevCanvas = useRef<any>(null);

  useEffect(() => {
    setLoading(true);
    let url = "https://jss-vider.s3.ap-south-1.amazonaws.com/1651823606103.pdf";
    var pdfjsLib = window["pdfjs-dist/build/pdf"];
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "//mozilla.github.io/pdf.js/build/pdf.worker.js";

    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function (pdf: any) {
      pdf.getPage(1).then(function (page: any) {
        setLoading(false);
        if (!canvasRef.current) return;

        var scale = 1.5;
        var viewport = page.getViewport({ scale: scale });
        var context = canvasRef!.current.getContext("2d")!;

        canvasRef.current.height = viewport.height;
        canvasRef.current.width = viewport.width;

        var renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        pageRef.current = page;
        renderContextRef.current = renderContext;

        page.render(renderContext).promise.then(function () {
          console.log("Page rendered");
        });
      });
    });
  }, []);

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
    last_mousey = e.pageY - top - window.scrollY;
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
    height = mousey - last_mousey - window.scrollY;

    if (!mousedown) return;

    if (!prevCanvas.current) {
      prevCanvas.current = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(prevCanvas.current, 0, 0);
    context.beginPath();
    context.rect(last_mousex, last_mousey, width, height);
    context.strokeStyle = "red";
    context.lineWidth = 1;
    context.stroke();
  }

  if (loading) return <Loader />;

  return (
    <div style={{ textAlign: "center" }}>
      <canvas
        style={{
          border: "1px solid black",
        }}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
        ref={canvasRef}
      ></canvas>
    </div>
  );
}

export default Dashboard;
