import init, { LangtonsAnt } from "./pkg/langtons_ant.js";

const CELL_SIZE = 30;
const GRID_COLOR = "#BBBBBB";
const WHITE_COLOR = "#F8F8F8";
const BLACK_COLOR = "#333333";
const ANT_COLOR = "#800020";
const TRANSITION_DURATION = 200; // Transition duration in milliseconds

let wasm;
let animationId;
let speed = 100;

init().then((module) => {
    wasm = module;
    let ant = LangtonsAnt.new();
    const width = 25;
    const height = 25;

    const canvas = document.getElementById("langtons-ant-canvas");
    canvas.width = width * CELL_SIZE + 1;
    canvas.height = height * CELL_SIZE + 1;
    const ctx = canvas.getContext("2d");

    function drawGrid() {
        ctx.beginPath();
        ctx.strokeStyle = GRID_COLOR;
        ctx.lineWidth = 0.5;

        for (let i = 0; i <= width; i++) {
            ctx.moveTo(i * CELL_SIZE, 0);
            ctx.lineTo(i * CELL_SIZE, height * CELL_SIZE);
        }

        for (let j = 0; j <= height; j++) {
            ctx.moveTo(0, j * CELL_SIZE);
            ctx.lineTo(width * CELL_SIZE, j * CELL_SIZE);
        }

        ctx.stroke();
    }

    function drawCells() {
        const cellsPtr = ant.get_grid_ptr();
        const cells = new Uint8Array(wasm.memory.buffer, cellsPtr, width * height);

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const idx = row * width + col;
                let targetColor = cells[idx] === 0 ? WHITE_COLOR : BLACK_COLOR;

                // Apply transition effect
                ctx.fillStyle = targetColor;
                ctx.globalAlpha = 0.8;
                ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                ctx.globalAlpha = 1;
            }
        }

        ctx.fillStyle = ANT_COLOR;
        const antX = ant.get_ant_x() * CELL_SIZE + CELL_SIZE / 2;
        const antY = ant.get_ant_y() * CELL_SIZE + CELL_SIZE / 2;
        ctx.save();
        ctx.translate(antX, antY);
        let direction = ant.get_direction();
        let angle = 0;
        if (direction === 1) angle = Math.PI / 2;
        if (direction === 2) angle = Math.PI;
        if (direction === 3) angle = -Math.PI / 2;
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, -CELL_SIZE / 2);
        ctx.lineTo(-CELL_SIZE / 2, CELL_SIZE / 2);
        ctx.lineTo(CELL_SIZE / 2, CELL_SIZE / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function renderLoop() {
        if (!ant.is_running()) return;
        ant.step();
        drawCells();
        animationId = setTimeout(() => requestAnimationFrame(renderLoop), speed);
    }

    document.getElementById("start-btn").addEventListener("click", () => {
        if (!animationId) renderLoop();
    });

    document.getElementById("pause-btn").addEventListener("click", () => {
        clearTimeout(animationId);
        animationId = null;
    });

    document.getElementById("reset-btn").addEventListener("click", () => {
        clearTimeout(animationId);
        animationId = null;
        ant = LangtonsAnt.new();
        drawCells();
    });

    document.getElementById("speed-slider").addEventListener("input", (event) => {
        speed = event.target.value;
    });

    drawGrid();
    drawCells();
});
