function draw(idCanva) {
    const canva = document.getElementById(idCanva);

    if (!canva.getContext) {
        throw new Error("No se puede obtener el contexto del canvas");
    }

    const ctx = canva.getContext("2d");

    // draw a point
    ctx.beginPath(); // start drawing 
    ctx.arc(100, 100, 5, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle
    ctx.fill(); // fill the point
    ctx.stroke(); // draw the point
}

// draw("draw");

// función que dibuje un punto cuando pasa el mouse encima
function drawPoint(idCanva) {
    const canva = document.getElementById(idCanva);

    if (!canva.getContext) {
        throw new Error("No se puede obtener el contexto del canvas");
    }

    const ctx = canva.getContext("2d");

    ctx.beginPath(); // start drawing 
    ctx.arc(100, 100, 5, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle
    ctx.fill(); // fill the point
    ctx.stroke(); // draw the point

    // agregar un evento de mousemove, pero sin eliminar el punto anterior
    // canva.addEventListener("mousemove", (e) => {
    //     ctx.beginPath(); // start drawing 
    //     ctx.arc(e.offsetX, e.offsetY, 5, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle
    //     ctx.fill(); // fill the point
    //     ctx.stroke(); // draw the point
    // });

    canva.addEventListener("mousemove", (e) => {
        const x = e.offsetX;
        const y = e.offsetY;

        ctx.clearRect(0, 0, canva.width, canva.height); // clear the canvas

        ctx.beginPath(); // start drawing 
        ctx.arc(x, y, 5, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle
        ctx.fill(); // fill the point

        // add text floating above the point
        ctx.font = "12px Arial";
        // ctx.fillText(`(${x}, ${y})`, x + 5, y - 5);
        ctx.fillText(`David Tovar`, x + 5, y - 5);

        ctx.stroke(); // draw the point
    });
}

// drawPoint("draw");


// Obtener el Canvas y el contexto de dibujo
var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");

// Obtener la posición del centro del Canvas
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

// Dibujar el punto en el centro del Canvas
ctx.beginPath();
ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI, false);
ctx.fillStyle = 'red';
ctx.fill();

// Agregar evento mousemove para mostrar un punto que siga la posición del mouse
canvas.addEventListener('mousemove', function (evt) {
    // Borrar el contenido anterior del Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar el punto en el centro del Canvas
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Dibujar un círculo en la posición del mouse
    var mousePos = getMousePos(canvas, evt);
    ctx.beginPath();
    ctx.arc(mousePos.x, mousePos.y, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'blue';
    ctx.fill();
    
    // Agregar texto flotante sobre el punto
    ctx.font = "12px Arial";
    ctx.fillText(`David Tovar`, mousePos.x + 5, mousePos.y - 5);
}, false);

// Función para obtener la posición del mouse en el Canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
