import express from "express";
import cors from "cors";
import {AddRecomendation, GetRandomRecommend} from "./controllers/recommendationController";
import { AddVote, DownVote } from "./controllers/scoreController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", AddRecomendation);
app.post("/recommendations/:id/upvote", AddVote);
app.post("/recommendations/:id/downvote", DownVote);
app.get("/recommendations/random", GetRandomRecommend );

export default app;
