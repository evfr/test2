const axios = require('axios');
const app = require('../server');
const test_port = 3001;

describe('E2ETests', () => {
  let db;

  let server;

  beforeAll(async() => {
    server = app.listen(test_port);
  });

  afterAll(async () => {
    await server.close();
  });

  it('Exact by filename. should return one video', async () => {
    const url = `http://localhost:${test_port}/exact`;
    const data = {
      "field": "filename",
      "value": "Extended product demo"
    };

    const response = await axios.post(url, data);
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(1);
    expect(response.data[0]).toHaveProperty('filename');
    expect(response.data[0]).toHaveProperty('authorId');
    expect(response.data[0]).toHaveProperty('duration');
    expect(response.data[0]).toHaveProperty('tags');
  });

  it('Exact by author. should return one video', async () => {
    const url = `http://localhost:${test_port}/exact`;
    const data = {
      "field": "authorId",
      "value": "user1"
    };

    const response = await axios.post(url, data);
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(2);
    expect(response.data[0]).toHaveProperty('filename');
    expect(response.data[0]).toHaveProperty('authorId');
    expect(response.data[0]).toHaveProperty('duration');
    expect(response.data[0]).toHaveProperty('tags');
  });

  it('Partial by author. should return 12 videos', async () => {
    const url = `http://localhost:${test_port}/partial`;
    const data = {
      "field": "authorId",
      "value": "user"
    };

    const response = await axios.post(url, data);
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(12);
  });

  it('Partial by filename. should return 6 videos', async () => {
    const url = `http://localhost:${test_port}/partial`;
    const data = {
      "field": "filename",
      "value": "product"
    };

    const response = await axios.post(url, data);
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(6);
  });

  it('Duration-range. should return 4 videos', async () => {
    const url = `http://localhost:${test_port}/duration-range`;
    const data = {
      "minDuration": 1,
      "maxDuration": 300
    };

    const response = await axios.post(url, data);
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(4);
  });

  it('Tags. should return 3 videos', async () => {
    const url = `http://localhost:${test_port}/tags`;
    const data = {
      "tags": "webinar, marketing"
    };

    const response = await axios.post(url, data);
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(3);
  });

  it('should respond with an error when "value" filed not supplied', async () => {
    const url = `http://localhost:${test_port}/partial`;
    const data = {
      "field": "authorId",
    };
    let response;

    try {
      response = await axios.post(url, data);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe('very bad request');      
    }
  });
});