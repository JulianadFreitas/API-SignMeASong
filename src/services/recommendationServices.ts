import * as recommendationRepository from "../repositories/recommendationRepository";

async function createMusic(name: string, youtubeLink: string) {
  const music = await recommendationRepository.musicCheck(youtubeLink);
  if (music.length > 0) return false;

  await recommendationRepository.createRecommendation(name, youtubeLink);

  return true;
}

export { createMusic };
