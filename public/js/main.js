// Función para obtener la posición del mouse en el Canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// Agregar evento mousemove para mostrar un punto que siga la posición del mouse
canvas.addEventListener('mousemove', function (evt) {
    // Borrar el contenido anterior del Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar un círculo en la posición del mouse
    var mousePos = getMousePos(canvas, evt);
    ctx.beginPath();
    ctx.arc(mousePos.x, mousePos.y, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'blue';
    ctx.fill();

    // Agregar texto flotante sobre el punto
    ctx.font = "12px Arial";
    ctx.fillText(`Owner`, mousePos.x + 5, mousePos.y - 5);
    
    // Enviar la posición del mouse al servidor
    socket.emit("move", mousePos);
}, false);