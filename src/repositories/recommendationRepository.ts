import connection from "../database";
import * as scoreRepository from "../repositories/scoreRepository";

export async function createRecommendation(name: string, youtubeLink: string) {
  await connection.query(
    'INSERT INTO musics (name, "youtubeLink", score) VALUES ($1, $2, $3)',
    [name, youtubeLink, 0]
  );
}

export async function musicCheck(youtubeLink: string) {
  const result = await connection.query(
    'SELECT * FROM musics WHERE "youtubeLink" = $1',
    [youtubeLink]
  );

  return result.rows;
}

export async function getAllMusics() {
  const result = await connection.query(
    'SELECT * FROM musics');
    console.log(result.rows,"HEEEEY")
  return result.rows;
}

export async function deleteOrdecrease(songId: number) {
  const result = await connection.query("SELECT * FROM musics WHERE id = $1", [
    songId,
  ]);
  if (!result.rows[0]) return false;
  if (result.rows[0].score === -5) {
    await connection.query("DELETE FROM musics WHERE id = $1", [songId]);
    return false;
  }

  await scoreRepository.decreaseScore(songId);
  return true;
}
