let socket = io();
let points = {};
let width = 800;
let height = 800;
let lastMouseX = 0;
let lastMouseY = 0;

socket.on("move", (user) => {
    let { x, y } = user.coords;
    let { username, color } = user;

    points[user.id] = { x, y, username, color };
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

    let localUser = localStorage.getItem("local-user-fz");

    if(localUser) {
        localUser = JSON.parse(localUser);

        fill(localUser.color);
        ellipse(mouseX, mouseY, 10, 10);
        text(localUser.username, mouseX + 5, mouseY - 5);
        
        if((mouseX != lastMouseX || mouseY != lastMouseY) && (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0)) {
            socket.emit("move", {
                username: localUser.username, 
                color: localUser.color,
                coords: {x: mouseX, y: mouseY}
            });
        }
    }
    
    lastMouseX = mouseX;
    lastMouseY = mouseY;

    if (Object.keys(points).length > 0) {
        for (let key in points) {
            fill(points[key].color);
            ellipse(points[key].x, points[key].y, 10, 10);
            text(points[key].username, points[key].x + 5, points[key].y - 5);
        }
    }
}