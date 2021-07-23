import { Request, Response } from "express";
import { upVote, downVote } from "../services/scoreServices";
import {paramIdSchema} from "../schemas/recommendationSchemas";

async function AddVote(req: Request, res: Response) {
  const songId:number = Number(req.params.id);
  const {error} = paramIdSchema.validate({id: songId})
  try {

  if (error) return res.status(403).send({ message: error.details[0].message });

  const votedsong = await upVote(songId);
  
  !votedsong ? res.sendStatus(404) : res.sendStatus(201);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
async function DownVote(req: Request, res: Response) {
    const songId:number = Number(req.params.id);
    const {error} = paramIdSchema.validate({id: songId})
    try {
  
    if (error) return res.status(403).send({ message: error.details[0].message });
  
    const stopVoting = await downVote(songId);
    
    !stopVoting ? res.sendStatus(404) : res.sendStatus(201);
  
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
export { AddVote, DownVote };
