import "../../src/setup.ts";
import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";
import { createMusic } from "../factories/musicfactory";
import { endConnection, cleanDatabase } from "../utils.ts/databaseUtils";

const agent = supertest(app);
const db = connection;

beforeEach(cleanDatabase);
afterEach(cleanDatabase);
afterAll(endConnection);

describe("POST /recommendations/:id/upvote", () => {
  it("returns status 201 when added a vote successfully", async () => {
    await createMusic();
    const response = await agent.post("/recommendations/1/upvote");
    expect(response.status).toBe(201);
  });

  it("verifies if a point has been added to the score", async () => {
    await createMusic();
    await agent.post("/recommendations/1/upvote");
    const response = await db.query('SELECT * FROM musics WHERE id = $1', [1]);
    expect(response.rows[0].score).toEqual(1);
  });

  it("returns 404 if the song is not registered", async () => {
    await createMusic();
    const response = await agent.post("/recommendations/30/upvote");
    expect(response.status).toBe(404);
  });

  it("returns 404 if the song is not registered", async () => {
    const response = await agent.post("/recommendations/1/upvote");
    expect(response.status).toBe(404);
  });

  it("returns 403 for wrong id param (not a number)", async () => {
    const response = await agent.post("/recommendations/wrongIdParam/upvote");
    expect(response.status).toBe(403);
  });
});

describe("POST /recommendations/:id/downvote", () => {
  it("returns status 201 when down voted have successfully", async () => {
    await createMusic();
    const response = await agent.post("/recommendations/1/downvote");
    expect(response.status).toBe(201);
  });

  it("returns 404 if the song is not registered", async () => {
    await createMusic();
    const response = await agent.post("/recommendations/30/downvote");
    expect(response.status).toBe(404);
  });

  it("returns 404 if the song is not registered", async () => {
    const response = await agent.post("/recommendations/1/upvote");
    expect(response.status).toBe(404);
  });

  it("returns 403 for wrong id param (not a number)", async () => {
    await createMusic();
    const response = await agent.post("/recommendations/wrongIdParam/upvote");
    expect(response.status).toBe(403);
  });
  
  it("returns 403 for wrong id param (negative number)", async () => {
    await createMusic();
    const response = await agent.post("/recommendations/-1/upvote");
    expect(response.status).toBe(403);
  });

  it("verifies if a point has been deleted to the score", async () => {
    await createMusic();
    await agent.post("/recommendations/1/downvote");
    await agent.post("/recommendations/1/downvote");
    const response = await db.query('SELECT * FROM musics WHERE id = $1', [1]);
    expect(response.rows[0].score).toEqual(-2);
  });
  
  it("verifies if a song has been delete if the score is lower than -5", async () => {
    await createMusic();
    for (let i = 0; i <= 6; i++) {
      await agent.post("/recommendations/1/downvote");
    }

    const finalScore = await connection.query("SELECT * FROM musics WHERE id = $1", [1]);
    console.log(finalScore.rows);
    expect(finalScore.rows.length).toEqual(0);
  });

});