import "react-router";
import api from "./routes";
import express from "express";
import morgan from "morgan";
import compression from "compression";

const app = express();

app.use(compression());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/v1/", api);

export { app };
