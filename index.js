const http = require("http");
const app = require("./app");

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: true,
  origins: ["*"],
  // cors: {
  //   origin: "http://localhost:3000", // client address
  // },
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
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
