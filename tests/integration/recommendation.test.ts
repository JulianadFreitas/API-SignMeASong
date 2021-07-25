import "../../src/setup.ts";
import supertest from "supertest";
import app from "../../src/app";
import { generateMusicBody } from "../factories/bodyFactory";
import { endConnection, cleanDatabase } from "../utils/databaseUtils";
import {createMusic} from "../factories/musicfactory";

const agent = supertest(app);

beforeEach(cleanDatabase);
//afterEach(cleanDatabase);
afterAll( endConnection);

describe("POST /recommendations", () => {
  it("returns status 201 when added recommendation", async () => {
    const body = generateMusicBody();
    const response = await agent.post("/recommendations").send(body);
    expect(response.status).toBe(201);
  });

  it("returns status 409 when link already exists", async () => {
    const body = generateMusicBody();
    await agent.post("/recommendations").send(body);
    const response = await agent.post("/recommendations").send(body);
    expect(response.status).toBe(409);
  });
  
  it("returns status 403 when name  is empty", async () => {
    const body = generateMusicBody();
    const response = await agent.post("/recommendations").send({...body, name:""});
    expect(response.status).toBe(403);
  });

  it("returns status 403 when youtubeLink is empty", async () => {
    const body = generateMusicBody();
    const response = await agent.post("/recommendations").send({...body, name:""});
    expect(response.status).toBe(403);
  });

  it('returns status 403 for invalid name', async() => {
    const body = generateMusicBody()
    const response = await agent.post("/recommendations").send({...body, name:123});
    expect(response.status).toBe(403);
  });

  it('returns status 403 for invalid (not a string) youtubeLink', async() => {
    const body = generateMusicBody()
    const response = await agent.post("/recommendations").send({...body, youtubeLink:123});
    expect(response.status).toBe(403);
  });

  it('returns status 403 for invalid (not a url format) youtube link', async() => {
    const body = generateMusicBody()
    const response = await agent.post("/recommendations").send({...body, youtubeLink:"whongformat"});
    expect(response.status).toBe(403);
  });
});

 describe("POST /recommendations/random", () => {
   beforeEach(async() => await createMusic());
   it("returns status 201 when added recommendation", async () => {
     await createMusic();
     const body = createMusic();
     await agent.post("/recommendations").send({...body, youtubeLink:"https:www.youtube.com/watch?v=iIuyjJ7co8Y", score:5});
     await agent.post("/recommendations").send({...body, youtubeLink:"https:www.youtube.com/watch?v=iIuyjJ7uo8Y", score:5});
     const response = await agent.post("/recommendations/random");
     console.log(response.body)
     expect(response.status).toBe(200);
   });

 });