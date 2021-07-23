import connection from "../database";


export async function findMusicById(songId: number) {
    const result = await connection.query(
      'SELECT * FROM musics WHERE id = $1',
      [songId]
    );
    
    return result.rows[0];
  }

export async function incrementScore(songId: number) {
  await connection.query(
    'UPDATE musics SET score = score + 1 WHERE id = $1',
    [songId]
  );
}
export async function decreaseScore(songId: number) {
   await connection.query(
    'UPDATE musics SET score = score - 1 WHERE id = $1',
    [songId]
    );
}

