
import connection from "../database"
//mudar importação pra ficar mais intuitivo quando importar no services

async function createRecommendation(name:string, youtubeLink:string) {
    await connection.query('INSERT INTO musics (name, "youtubeLink", score) VALUES ($1, $2, $3)', 
                            [name, youtubeLink, 0]);

}
async function musicCheck(youtubeLink:string) {
    const result = await connection.query('SELECT * FROM musics WHERE "youtubeLink" = $1', 
                            [youtubeLink]);
    
    return result.rows

}
export { createRecommendation, musicCheck };
