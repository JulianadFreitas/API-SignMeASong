import { Request, Response } from "express";
import { postRecommendationSchema } from "../schemas/recommendationSchemas";
import { createRecommendation } from "../services/recommendationServices";

async function AddRecomendation(req: Request, res: Response) {
  const { name, youtubeLink } = req.body;
  console.log(name, youtubeLink);
  const { error } = postRecommendationSchema.validate(req.body);
  try {
    if (error) {
      return res.status(422).send({ message: error.details[0].message });
    }
    const createdMusic = await createRecommendation(name, youtubeLink);
    if (!createdMusic) {
      res.sendStatus(409);
    } else {
      res.sendStatus(201);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export { AddRecomendation };
