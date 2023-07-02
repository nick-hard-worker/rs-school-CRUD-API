const axios = require('axios');
const { randomUUID } = require('node:crypto');

axios.defaults.baseURL = 'http://localhost:4000/api';

describe('API users test, scenario2 (check GET, POST return codes)', () => {
  let userId;
  const newUser = {
    username: 'John_Doe',
    age: 34,
    hobbies: ['hobby1', 'second']
  };

  test('Should GET all records - code 200', async () => {
    const response = await axios.get('/users');
    expect(response.status).toBe(200);
  });

  test('Should create(POST) a new record - code 201', async () => {

    const response = await axios.post('/users', newUser);
    expect(response.status).toBe(201);
    expect(response.data.username).toBe('John_Doe');
    expect(+response.data.age).toBe(34);
    userId = response.data.id;
  });

  test('Check created user - GET by user id - code 200', async () => {
    const response = await axios.get(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(userId);
  });

  test('Try to GET user with valid UUID, but not exist - code 404', async () => {
    const randUUID = randomUUID();
    try {
      const response = await axios.get(`/users/${randUUID}`);
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data.error).toContain(randUUID);
    }
  });

  test('Try to GET invalid url - code 404', async () => {
    try {
      const response = await axios.get(`/some-url`);
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toHaveProperty('error');
    }
  });

  test('Try to GET user with invalid UUID - code 400', async () => {
    const notUUID = 'eeffre7-6feef';
    try {
      const response = await axios.get(`/users/${notUUID}`);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toContain(notUUID);
    }
  });
});
