import * as scoreRepository from "../repositories/scoreRepository";
import * as recommendationRepository from "../repositories/recommendationRepository";

async function upVote(songId:number) {
  const existingSong= await scoreRepository.findMusicById(songId);
  if (!existingSong) return false;
    await scoreRepository.incrementScore(songId);
    return true;
}

async function downVote(songId: number) {
    const result = await recommendationRepository.deleteOrdecrease(songId);
    if (!result) return false;
    return true;
  }
  
export { upVote, downVote };
