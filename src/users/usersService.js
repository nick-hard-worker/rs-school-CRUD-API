import { randomUUID } from 'node:crypto';
console.log(randomUUID());

let repoUsers = [];

export const getAll = () => {
  return repoUsers;
};

export const getOne = (id) => {
  const index = repoUsers.findIndex(user => user.id === id);
  if (index !== -1) {
    return repoUsers[index];
  }
  throw new Error(`Not found user with id ${id}`);
};

export const create = (newUser) => {
  newUser.id = randomUUID();
  repoUsers.push(newUser);
  return newUser;
};

export const update = (id, body) => {
  const index = repoUsers.findIndex(user => user.id === id);
  if (index !== -1) {
    body.id = id;
    repoUsers[index] = body;
    return repoUsers[index];
  }
  throw new Error(`Not found user with id ${id}`);
};

export const remove = (id) => {
  const index = repoUsers.findIndex(user => user.id === id);
  if (index !== -1) {
    repoUsers = repoUsers.filter(user => user.id !== id);
    return;
  }
  throw new Error(`Not found user with id ${id}`);
};
