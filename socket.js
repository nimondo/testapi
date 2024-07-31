const socketIo = require("socket.io");

module.exports = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "*", // Modifier selon vos besoins de sécurité
            methods: ["GET", "POST"]
        },
    });

    io.on("connection", (socket) => {
        console.log("connected");

        socket.on("addDelivery", (delivery) => {
            console.log("addDelivery");
            io.emit("delivery", delivery);
            socket.emit("delivery", delivery);
        });

        socket.on("location_changed", (delivery) => {
            console.log("location_changed");
            io.emit("delivery_updated", delivery);
            socket.emit("delivery_updated", delivery);
        });

        socket.on("status_changed", (delivery) => {
            console.log("status_changed");
            io.emit("delivery_updated", delivery);
            socket.emit("delivery_updated", delivery);
        });

        socket.on("disconnect", () => {
            console.log("disconnected!");
        });
    });
};