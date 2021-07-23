import "../../src/setup.ts";
import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";
import { generateMusicBody } from "../factories/bodyFactory";

beforeEach( async () => {
  await connection.query("DELETE FROM musics");
});

 afterAll( async() => {
  await connection.end();
 });

describe("GET /test", () => {
  it('should answer with text "OK!" and status 200', async () => {
    const response = await supertest(app).get("/test");
    expect(response.text).toBe("OK!");
    expect(response.status).toBe(200);
  });
});

describe("POST /recommendations", () => {
  it("returns status 201 when added recommendation", async () => {
      const body = generateMusicBody();
      const response = await supertest(app).post("/recommendations").send(body);
      expect(response.status).toBe(201);
  });

  it("returns status 409 when link already exists", async () => {
      const body = generateMusicBody();
      await supertest(app).post("/recommendations").send(body);
      const response = await supertest(app).post("/recommendations").send(body);
      expect(response.status).toBe(409);
  });
    it("returns status 403 when name  is empty", async () => {
      const body = generateMusicBody();
      const response = await supertest(app).post("/recommendations").send({...body, name:""});
      expect(response.status).toBe(403);
  });
    it("returns status 403 when youtubeLink is empty", async () => {
      const body = generateMusicBody();
      const response = await supertest(app).post("/recommendations").send({...body, name:""});
      expect(response.status).toBe(403);
  });
    it('returns status 422 for invalid name', async() => {
      const body = generateMusicBody()
      const response = await supertest(app).post("/recommendations").send({...body, name:123});
      expect(response.status).toBe(422);
  });
  it('returns status 422 for invalid (not a string) youtubeLink', async() => {
      const body = generateMusicBody()
      const response = await supertest(app).post("/recommendations").send({...body, youtubeLink:123});
      expect(response.status).toEqual(422);
  });
  it('returns status 422 for invalid (not a url format) youtube link', async() => {
      const body = generateMusicBody()
      const response = await supertest(app).post("/recommendations").send({...body, youtubeLink:"whongformat"});
      expect(response.status).toEqual(422);
  });
});
