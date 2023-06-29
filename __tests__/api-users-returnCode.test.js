const axios = require('axios');
const { randomUUID } = require('node:crypto');

axios.defaults.baseURL = 'http://localhost:4000/api';

describe('API /users test, scenario1:', () => {
  let userId;
  const newUser = {
    username: 'John_Doe',
    age: 34,
    hobbies: ['hobby1', 'second']
  };

  const updateUser = {
    username: 'John_DoeNEW',
    age: 44,
    hobbies: ['hobby1', 'second']
  };

  test('Should GET all records - code 200', async () => {
    const response = await axios.get('/users');
    expect(response.status).toBe(200);
  });

  test('Should POST Create a new record - code 201', async () => {

    const response = await axios.post('/users', newUser);
    expect(response.status).toBe(201);
    expect(response.data.username).toBe('John_Doe');
    expect(+response.data.age).toBe(34);
    userId = response.data.id;
  });

  test('Check created user - GET by user id', async () => {
    const response = await axios.get(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(userId);
  });

  test('Try to GET user with valid UUID, but not exist', async () => {
    const randUUID = randomUUID();
    try {
      const response = await axios.get(`/users/${randUUID}`);
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data.error).toContain(randUUID);
    }
  });

  test('Try to GET invalid entity', async () => {
    try {
      const response = await axios.get(`/some-url`);
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toHaveProperty('error');
    }
  });

  test('Try to GET user with invalid UUID', async () => {
    const notUUID = 'eeffre7-6feef';
    try {
      const response = await axios.get(`/users/${notUUID}`);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toContain(notUUID);
    }
  });

  test('Update the created record', async () => {
    const response = await axios.put(`/users/${userId}`, updateUser);
    expect(response.status).toBe(200);
    expect(response.data.username).toBe('John_DoeNEW');
    expect(+response.data.age).toBe(44);
  });

  test('Try to UPDATE record with random uuid', async () => {
    const randUUID = randomUUID();
    try {
      const response = await axios.put(`/users/${randUUID}`, updateUser);
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data.error).toContain(randUUID);
    }
  });

  test('Try to UPDATE record with invalid uuid', async () => {
    const notUUID = 'rhur767-5486jirj';
    try {
      const response = await axios.put(`/users/${notUUID}`, updateUser);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toContain(notUUID);
    }
  });

  test('Delete the created record', async () => {
    const response = await axios.delete(`/users/${userId}`);
    expect(response.status).toBe(204);
  });

  test('Try to DELETE record again', async () => {
    try {
      await axios.delete(`/users/${userId}`);
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data.error).toContain(userId);
    }
  });

  test('Try to DELETE the record with wrong format id', async () => {
    const notUUID = 'rhur767-5486jirj';

    try {
      const response = await axios.delete(`/users/${notUUID}`);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toContain(notUUID);
    }
  });
});
