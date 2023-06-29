const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:4000/api';

describe('API /users test, scenario1:', () => {
  let userId;

  test('Step 1: Get all records - empty array', async () => {
    const response = await axios.get('/users');
    expect(response.data).toEqual([]);
  });

  test('Step 2: Create a new record', async () => {
    const newRecord = { name: 'John Doe', email: 'johndoe@example.com' };
    const response = await axios.post('/users', newRecord);
    expect(response.data.name).toBe('John Doe');
    expect(response.data.email).toBe('johndoe@example.com');
    userId = response.data.id;
  });

  test('Step3: Get the created record by user id', async () => {
    const response = await axios.get(`/users/${userId}`);
    expect(response.data.id).toBe(userId);
  });

  test('Step 4: Update the created record', async () => {
    const updatedRecord = { name: 'John Smith', email: 'johnsmith@example.com' };
    const response = await axios.put(`/users/${userId}`, updatedRecord);
    expect(response.data.name).toBe('John Smith');
    expect(response.data.email).toBe('johnsmith@example.com');
  });

  test('Step5: Delete the created record', async () => {
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
