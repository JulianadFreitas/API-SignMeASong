
 import "../../src/setup.ts";
 import supertest from "supertest";
 import app from "../../src/app";
 import connection from "../../src/database";
 import { insertMusic } from "../factories/musicfactory";
 export {insertMusic} from "../factories/musicfactory";

 beforeEach( async () => {
   await connection.query("TRUNCATE musics RESTART IDENTITY");
 });

  afterAll( async() => {
   await connection.end();
  });

 describe("POST /recommendations/:id/upvote", () => {
   it("returns status 201 when added a vote successfully", async () => {
      await insertMusic();
      const response = await supertest(app).post("/recommendations/1/upvote");
      expect(response.status).toBe(201);
   });

   it("returns 404 if the song is not registered", async () => {
      await insertMusic();
      const response = await supertest(app).post("/recommendations/30/upvote");
      expect(response.status).toBe(404);
    });

   it('returns 404 if the song is not registered', async() => {
      const response = await supertest(app).post("/recommendations/1/upvote");
      expect(response.status).toEqual(404);
    });

    it('returns 403 for wrong id param (not a number)', async() => {
      const response = await supertest(app).post("/recommendations/wrongIdParam/upvote");
      expect(response.status).toEqual(403);
    });

    it('verifies if a song has been delete if the score is lower than -5', async() => {

        await insertMusic();

        await supertest(app).post("/recommendations/1/downvote");
        await supertest(app).post("/recommendations/1/downvote");
        await supertest(app).post("/recommendations/1/downvote");
        await supertest(app).post("/recommendations/1/downvote");
        await supertest(app).post("/recommendations/1/downvote");
        await supertest(app).post("/recommendations/1/downvote");
        await supertest(app).post("/recommendations/1/downvote");

        const score =  await connection.query('SELECT * FROM musics WHERE id = $1', [1])
        expect(score.rows.length).toEqual(0);
      });
 });