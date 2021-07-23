import * as scoreRepository from "../repositories/scoreRepository";
import * as recommendationRepository from "../repositories/recommendationRepository"
async function upVote(songId:number) {
  const existingSong= await scoreRepository.findMusicById(songId);
  if (!existingSong) return false;

    await scoreRepository.incrementScore(songId);
    return true;

}
async function downVote(songId: number) {
    const existingSong: { id:number, 
     name:string, 
     youtubeLink:string, 
     score:number } = await scoreRepository.findMusicById(songId);
    
    if (!existingSong) return false;
    
    const score:number = existingSong.score;

    console.log(score)
    if (score < -5) await recommendationRepository.deleteRecommendation(songId);
    await scoreRepository.decreaseScore(songId);
    return true;
  
  }

export { upVote, downVote };
