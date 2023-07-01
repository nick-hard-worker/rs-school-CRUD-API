const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:4000/api';

describe('API users test, scenario1:', () => {
  let userId;

  test('Step 1: Get all records - empty array', async () => {
    const response = await axios.get('/users');
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('Step 2: Create a new record', async () => {
    const newRecord = {
      username: 'John_Doe',
      age: 34,
      hobbies: ['hobby1', 'second']
    };
    const response = await axios.post('/users', newRecord);
    expect(response.data.username).toBe('John_Doe');
    expect(+response.data.age).toBe(34);
    userId = response.data.id;
  });

  test('Step 3: Get the created record by user id', async () => {
    const response = await axios.get(`/users/${userId}`);
    expect(response.data.id).toBe(userId);
  });

  test('Step 4: Update the created record', async () => {
    const updatedRecord = {
      username: 'John_DoeNEW',
      age: 44,
      hobbies: ['hobby1', 'second']
    };
    const response = await axios.put(`/users/${userId}`, updatedRecord);
    expect(response.data.username).toBe('John_DoeNEW');
    expect(+response.data.age).toBe(44);
  });

  test('Step 5: Delete the created record', async () => {
    const response = await axios.delete(`/users/${userId}`);
    expect(response.status).toBe(204);
  });

  test('Step 6: Try to get a deleted record by its id', async () => {
    try {
      await axios.get(`/users/${userId}`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});
