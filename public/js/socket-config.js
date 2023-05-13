var socket = io();

socket.on("move", (coords) => {
    // Borrar el contenido anterior del Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Agregar texto flotante sobre el punto
    ctx.font = "12px Arial";
    ctx.fillText(`Friend`, coords.x + 5, coords.y - 5);
});