import { ArrowBack, ArrowForward } from "@mui/icons-material";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import UndoIcon from "@mui/icons-material/Undo";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Toolbar,
  Typography,
} from "@mui/material";
import Loader from "components/Loader";
import { snack } from "components/toast";
import { MouseEvent, useEffect, useRef, useState } from "react";

function SelectCoordingates({ open, setOpen, url, value, onChange }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pageRef = useRef<any>(null);
  const renderContextRef = useRef<any>(null);
  const prevCanvas = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [coordinates, setCoordinates] = useState("");

  useEffect(() => {
    setCoordinates(value);
  }, [value]);

  const prevCoordinates = (canvas: any, context: any, coordinates: any) => {
    let data = coordinates.split(";");
    let result: any[] = [];

    data.forEach((item: string) => {
      let [p, x, y, w, h] = item.split(",");
      if (p === selectedPage?.toString()) {
        result.push({
          left: Number(x),
          top: canvas.height - Number(y),
          width: Number(w) - Number(x),
          height: Number(y) - Number(h),
        });
      }
    });

    result.forEach((item: any) => {
      context.beginPath();
      context.rect(item.left, item.top, item.width, item.height);
      context.strokeStyle = "red";
      context.lineWidth = 1;
      context.stroke();
    });
  };

  useEffect(() => {
    if (!open) return;

    setLoading(true);

    var pdfjsLib = window["pdfjs-dist/build/pdf"];
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "//mozilla.github.io/pdf.js/build/pdf.worker.js";

    var loadingTask = pdfjsLib.getDocument(url);

    loadingTask.promise.then(function (pdf: any) {
      setNumPages(pdf.numPages);

      pdf.getPage(selectedPage).then(function (page: any) {
        setLoading(false);

        if (!canvasRef.current) return;

        var scale = 1;
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
          let canvas: any = canvasRef.current;

          prevCanvas.current = prevCanvas.current = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );

          prevCoordinates(canvasRef.current, context, coordinates);
        });
      });
    });
  }, [open, selectedPage, url, coordinates, prevCoordinates]);

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

  function handleUndo() {
    let { canvas, context } = getProperties();

    let data = coordinates.split(";");

    if (data.length === 0) return;

    data.forEach((item: string, index) => {
      let [p] = item.split(",");
      if (p === selectedPage?.toString()) {
        data.splice(index, 1);
      }
    });

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(prevCanvas.current, 0, 0);

    setCoordinates(data.join(";"));
    prevCoordinates(canvas, context, data?.join(";"));
  }

  function mouseDownHandler(e: MouseEvent<HTMLCanvasElement>) {
    let { left, top } = getProperties();
    last_mousex = e.pageX - left;
    last_mousey = e.pageY - top - window.scrollY;
    mousedown = true;
  }

  function mouseUpHandler(e: MouseEvent<HTMLCanvasElement>) {
    mousedown = false;
    let { canvas } = getProperties();

    let cLeft = Math.round(last_mousex);
    let cTop = Math.round(canvas.height - last_mousey);
    let cWidth = Math.round(mousex);
    let cHeight = Math.round(canvas.height - mousey);
    let value = `${selectedPage},${cLeft},${cTop},${cWidth},${cHeight}`;

    let result = coordinates ? `${coordinates};${value}` : value;
    setCoordinates(result);
  }

  function mouseMoveHandler(e: MouseEvent<HTMLCanvasElement>) {
    let { context, canvas, left, top } = getProperties();

    mousex = e.pageX - left;
    mousey = e.pageY - top;
    width = mousex - last_mousex;
    height = mousey - last_mousey - window.scrollY;

    if (!mousedown) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(prevCanvas.current, 0, 0);
    prevCoordinates(canvas, context, coordinates);
    context.beginPath();
    context.rect(last_mousex, last_mousey, width, height);
    context.strokeStyle = "red";
    context.lineWidth = 1;
    context.stroke();
  }

  return (
    <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
      <AppBar position="fixed" color="default">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="subtitle2" color="primary">
            Select signature position(s)
          </Typography>
          <Box display="flex" gap={1}>
            <Button
              onClick={() => {
                setSelectedPage(selectedPage - 1);
                prevCanvas.current = null;
              }}
              startIcon={<ArrowBack />}
              disabled={selectedPage === 1}
            >
              Prev
            </Button>
            <Button
              onClick={() => {
                setSelectedPage(selectedPage + 1);
                prevCanvas.current = null;
              }}
              disabled={selectedPage === numPages}
              startIcon={<ArrowForward />}
            >
              Next
            </Button>
            <Button onClick={handleUndo} startIcon={<UndoIcon />}>
              Undo
            </Button>
            <Button
              onClick={() => {
                onChange(coordinates);
                snack.success("Coordinates saved");
              }}
              startIcon={<SaveAltRoundedIcon />}
            >
              Save
            </Button>
          </Box>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Toolbar>
      </AppBar>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ textAlign: "center", mt: 10, mb: 4 }}>
          <canvas
            style={{
              border: "1px solid rgba(0,0,0,0.1)",
            }}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
            onMouseMove={mouseMoveHandler}
            ref={canvasRef}
          ></canvas>
        </Box>
      )}
    </Dialog>
  );
}

export default SelectCoordingates;
