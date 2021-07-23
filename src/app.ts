import express from "express";
import cors from "cors";
import {AddRecomendation} from "./controllers/recommendationController";
const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("OK!");
});

app.post("/recommendations", AddRecomendation);

export default app;
