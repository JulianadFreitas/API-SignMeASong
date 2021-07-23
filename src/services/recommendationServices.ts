
import {musicCheck} from "../repositories/recommendationRepository"
async function createRecommendation(name: string, youtubeLink:string) {
  const music = await musicCheck(youtubeLink);
  if(music.length > 0){
      return false
  } else {
    await createRecommendation(name, youtubeLink) 
    return true
  }
}

export { createRecommendation };
