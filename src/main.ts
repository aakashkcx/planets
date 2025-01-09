import "./style.css";

const canvasElement = document.querySelector<HTMLCanvasElement>("canvas")!;
const canvasCtx = canvasElement.getContext("2d")!;

canvasCtx.fillStyle = "white";
canvasCtx.fillRect(100, 100, 100, 100);
