import "react-router";
import api from "./routes";
import express from "express";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";

const PORT = Number.parseInt(process.env.PORT || "3030");

const app = express();

app.use(compression());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.disable("x-powered-by");
app.use("/api/v1/", api);
app.listen(PORT, () => {
  console.log(`Backend server is running on port: ${PORT}`);
});
