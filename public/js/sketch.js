let socket = io();
let points = {};
let width = 800;
let height = 800;
let lastMouseX = 0;
let lastMouseY = 0;

socket.on("move", (user) => {
    points[user.id] = {x: user.coords.x, y: user.coords.y};
});

socket.on("offline-user", (user) => {
    delete points[user.id];
    console.log(user.id, "disconnected");
});

function setup() {
    createCanvas(width, height);
}

function draw() {
    background(220);

    fill(0, 0, 255);
    ellipse(mouseX, mouseY, 10, 10);
    text("Owner", mouseX + 5, mouseY - 5);
    
    if((mouseX != lastMouseX || mouseY != lastMouseY) && (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0)) {
        socket.emit("move", {x: mouseX, y: mouseY});
    }
    
    lastMouseX = mouseX;
    lastMouseY = mouseY;

    if (Object.keys(points).length > 0) {
        for (let key in points) {
            fill(255, 0, 0);
            ellipse(points[key].x, points[key].y, 10, 10);
            text(key, points[key].x + 5, points[key].y - 5);
        }
    }
}