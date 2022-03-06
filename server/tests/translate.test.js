const request = require("supertest");
const express = require("express");
const app = express();

const translateRoute = require('../routes/translate');

app.use("/",translateRoute);
describe("Test the 'Hello how are you path' with cache miss", () => {
    test("It should response the GET method", async () => {
        const response = await request(app).get('/translate?sourceText=Hello how are you path&targetLanguage=hi');
        expect(response.statusCode).toBe(200);
    });
});

app.use("/",translateRoute);
describe("Test the 'Hello how are you path' with cache miss", () => {
    test("It should response the GET method", async () => {
        const response = await request(app).get('/translate?sourceText=Hello how are you path&targetLanguage=ja');
        expect(response.statusCode).toBe(200);
    });
});


app.use("/",translateRoute);
describe("Test the 'Hello how are you path' with cache hit for hindi", () => {
    test("It should response the GET method", async () => {
        const response = await request(app).get('/translate?sourceText=Hello how are you path&targetLanguage=hi');
        expect(response.statusCode).toBe(200);
    });
});
