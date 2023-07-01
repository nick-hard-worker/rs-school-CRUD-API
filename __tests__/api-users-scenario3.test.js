const axios = require('axios');
const { randomUUID } = require('node:crypto');

axios.defaults.baseURL = 'http://localhost:4000/api';

describe('API users test, scenario3(check PUT, DELETE codes) :', () => {
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

  test('Should update(PUT) the created record  - code 200) ', async () => {
    const response = await axios.put(`/users/${userId}`, updateUser);
    expect(response.status).toBe(200);
    expect(response.data.username).toBe('John_DoeNEW');
    expect(response.data.age).toBe(44);
    expect(Array.isArray(response.data.hobbies)).toBe(true);
  });

  test('Try to UPDATE (PUT) record with random uuid - code 404', async () => {
    const randUUID = randomUUID();
    try {
      const response = await axios.put(`/users/${randUUID}`, updateUser);
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data.error).toContain(randUUID);
    }
  });

  test('Try to UPDATE record with invalid uuid - code 400', async () => {
    const notUUID = 'rhur767-5486jirj';
    try {
      const response = await axios.put(`/users/${notUUID}`, updateUser);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toContain(notUUID);
    }
  });

  test('DELETE the created record - code 204', async () => {
    const response = await axios.delete(`/users/${userId}`);
    expect(response.status).toBe(204);
  });

  test('Try to DELETE record again - code 404', async () => {
    try {
      await axios.delete(`/users/${userId}`);
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data.error).toContain(userId);
    }
  });

  test('Try to DELETE the record with wrong format id - code 400', async () => {
    const notUUID = 'rhur767-5486jirj';

    try {
      const response = await axios.delete(`/users/${notUUID}`);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toContain(notUUID);
    }
  });
});
