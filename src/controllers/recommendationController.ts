import { Request, Response } from "express";
import { postRecommendSchema, getRandRecommendSchema } from "../schemas/recommendationSchemas";
import { createMusic } from "../services/recommendationServices";
import { CaseRecommendation } from "../services/recommendationServices"

async function AddRecomendation(req: Request, res: Response) {
  const { name, youtubeLink } = req.body;
  const { error } = postRecommendSchema.validate(req.body);
  try {
    if (!name || !youtubeLink) return res.sendStatus(403);
  
    if (error) return res.status(403).send({ message: error.details[0].message });

    const createdMusic = await createMusic(name, youtubeLink);

    !createdMusic ? res.sendStatus(409) : res.sendStatus(201);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function GetRandomRecommend(req: Request, res: Response) {
  const recommendation = await CaseRecommendation();
  console.log(recommendation,"result recomendation")
  const {error} = getRandRecommendSchema.validate(recommendation);
  try {
     if(!recommendation) return res.sendStatus(404);   
     if (error) return res.sendStatus(400);   
     return res.status(200).send(recommendation); 
  }catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export { AddRecomendation, GetRandomRecommend };
