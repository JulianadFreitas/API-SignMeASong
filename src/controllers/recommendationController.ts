import { Request, Response } from "express";
import {
  postRecommendSchema,
  getRandRecommendSchema,
  paramAmountSchema,
} from "../schemas/recommendationSchemas";
import * as recommendationServices from "../services/recommendationServices";

async function AddRecomendation(req: Request, res: Response) {
  const name: string = req.body.name;
  const youtubeLink: string = req.body.youtubeLink;
  const { error } = postRecommendSchema.validate({
    name: req.body.name,
    youtubeLink: req.body.youtubeLink,
  });
  try {
    if (!name || !youtubeLink) return res.sendStatus(403);

    if (error)
      return res.status(403).send({ message: error.details[0].message });

    const createdMusic = await recommendationServices.createMusic(
      name,
      youtubeLink
    );

    !createdMusic ? res.sendStatus(409) : res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function GetRandomRecommend(req: Request, res: Response) {
  const recommendation = await recommendationServices.caseRecommendation();
  console.log(recommendation, "result recomendation");
  const { error } = getRandRecommendSchema.validate(recommendation);
  try {
    if (!recommendation) return res.sendStatus(404);
    if (error) return res.sendStatus(400);
    return res.status(200).send(recommendation);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function GetTopMusics(req: Request, res: Response) {
  const amount: number = Number(req.params.amount);
  const { error } = paramAmountSchema.validate({ param: amount });
  try {
    if (error)
      return res.status(403).send({ message: error.details[0].message });
    const musics = await recommendationServices.amountMusics(amount);
    if (musics === null) return res.sendStatus(404);
    return res.status(200).send(musics);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export { AddRecomendation, GetRandomRecommend, GetTopMusics };
