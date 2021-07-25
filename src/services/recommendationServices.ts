
import * as recommendationRepository from "../repositories/recommendationRepository";
async function createMusic(name: string, youtubeLink: string) {
  const music = await recommendationRepository.musicCheck(youtubeLink);
  if (music.length > 0) return false;

  await recommendationRepository.createRecommendation(name, youtubeLink);

  return true;
}

async function CaseRecommendation() {
  const random = Math.random();
  const list:Array<{id:number, name:string, youtubeLink:string, score:number}> = await recommendationRepository.getAllMusics();
  const classOfMusics = Math.floor(random * 100);
  console.log(classOfMusics,"numero");

  if (list){ 
  console.log(list,"list");

  if(classOfMusics > 30){
    const topMusics = list.filter( e => {
    return (e.score > 10)
    })
    const indexOfList = Math.floor(random * topMusics.length) ;
    console.log(topMusics[indexOfList],"INDEX")
    return topMusics[indexOfList];

  } else if(classOfMusics < 30) {
    const averageMusics = list.filter( e => {
      return (e.score <= 10 && e.score >= -5 ) 
    });
    
    const indexOfList = Math.floor(random * averageMusics.length) ;
    console.log(averageMusics[indexOfList],"INDEX 2")
    return averageMusics[indexOfList];
  } 
  console.log(list[Math.floor(random * list.length)])
  return list[Math.floor(random * list.length)]}
  return false;
}

export { createMusic, CaseRecommendation };
