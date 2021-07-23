import "../../src/setup.ts";
import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";

beforeEach(async () => {
  await connection.query("DELETE FROM musics");
});

 afterAll(() => {
    connection.end();
 });

describe("GET /test", () => {
  it('should answer with text "OK!" and status 200', async () => {
    const response = await supertest(app).get("/test");
    expect(response.text).toBe("OK!");
    expect(response.status).toBe(200);
  });
});

describe("POST /recommendations", () => {
  it("should answer with text 201 if created a recommendation with sucess", async () => {
    const body = {
      name: "teste",
      youtubeLink: "https:www.youtube.com/watch?v=oppyiJbco1Y",
    };
    const response = await supertest(app).post("/recommendations").send(body);
    expect(response.status).toBe(201);
  });
});
//    it("should answer with text 409 if created a recommendation with sucess", async () => {
//      const body = {
//        name: "teste",
//        youtubeLink: "https:www.youtube.com/watch?v=oppypJbco1Y",
//      };
//      const response = await supertest(app).post("/recommendations").send(body);
//      expect(response.status).toBe(409);
//    });
//  });
