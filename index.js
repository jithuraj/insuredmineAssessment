import express from "express";
import http from "http";
import cors from "cors";
import startServer from "./config/serverConnection.js";
import connectMongoDB from "./config/dbConnection.js";
import router from "./routes/userRouter.js";
import pidusage from "pidusage";

const app = express();

const server = http.createServer(app);

const enableCors = {
  origin: "*",
  exposeHeaders: ["Cross-Origin-Opener-Policy", "Cross-Origin-Resource-Policy"],
};

app.use(cors(enableCors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

connectMongoDB();

startServer(server);
async function checkCPU() {
  try {
    const stats = await pidusage(process.pid);

    // Check if CPU usage exceeds threshold
    if (stats.cpu > 70) {
      console.log("CPU usage exceeded threshold. Restarting server...");
      restartServer();
    }
  } catch (error) {
    console.error("Error checking CPU usage:", error);
  }
}

function restartServer() {
  server.close(() => {
    startServer(server);
  });
}

setInterval(checkCPU, 5000);
