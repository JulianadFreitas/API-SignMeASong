import { generateMusicBody } from "../factories/bodyFactory";
import connection from "../../src/database";
async function insertMusic() {
    const {name, youtubeLink} = generateMusicBody();
    await connection.query(
        'INSERT INTO musics (name, "youtubeLink", score) VALUES ($1, $2, $3)',
        [name, youtubeLink, 0]
      );
}
export {insertMusic};