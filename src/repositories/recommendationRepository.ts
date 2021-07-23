import connection from "../database";

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

export async function deleteRecommendation(songId: number) {
    await connection.query(
     'DELETE FROM musics WHERE id = $1',
     [songId]
     );
  }


