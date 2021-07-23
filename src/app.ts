import express from "express";
import cors from "cors";
import {AddRecomendation} from "./controllers/recommendationController";
import { AddVote, DownVote } from "./controllers/scoreController";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("OK!");
});

app.post("/recommendations", AddRecomendation);
app.post("/recommendations/:id/upvote", AddVote);
app.post("/recommendations/:id/downvote", DownVote);

export default app;
