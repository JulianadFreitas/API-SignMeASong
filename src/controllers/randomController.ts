import { Request, Response } from "express";
import { postRecommendationSchema } from "../schemas/recommendationSchemas";
import { createMusic } from "../services/recommendationServices";
// - **70% das vezes**: uma música com pontuação maior que 10 deve ser recomendada aleatoriamente
// - **30% das vezes**: uma música com pontuação entre -5 e 10 (inclusive), deve ser recomendada aleatoriamente
// - Caso não haja músicas dentro de alguma categoria acima, deve ser sorteada uma música qualquer independente da pontuação
// - Caso não haja músicas cadastradas, deve ser retornado status 404
async function Random(req: Request, res: Response) {
  const { name, youtubeLink } = req.body;
  console.log(name, youtubeLink);
  const { error } = postRecommendationSchema.validate(req.body);
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

export { Random };
