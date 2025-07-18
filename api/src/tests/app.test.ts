import request from "supertest";
import app from "../app";

describe('Testando rota raiz', () => {
  test('GET / deve responder com "Servidor está rodando"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe("Servidor está rodando");
  });
});
