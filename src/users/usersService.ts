import { randomUUID } from 'node:crypto';
import { IUser } from './entity/user.js'
import { IUserRequestDTO } from './dto/userValidator.js'

let repoUsers: IUser[] = [];

export const getAll = () => {
  return repoUsers;
};

export const getOne = (id: string) => {
  const index = repoUsers.findIndex(user => user.id === id);
  if (index !== -1) {
    return repoUsers[index];
  }
  throw new Error(`Not found user with id ${id}`);
};

export const create = (newUser: IUserRequestDTO) => {
  const userToDB: IUser = { ...newUser, id: randomUUID() }
  repoUsers.push(userToDB);
  return userToDB;
};

export const update = (id: string, body: IUserRequestDTO) => {
  const index = repoUsers.findIndex(user => user.id === id);
  if (index !== -1) {
    const updaterUser: IUser = { ...body, id }
    repoUsers[index] = updaterUser;
    return repoUsers[index];
  }
  throw new Error(`Not found user with id ${id}`);
};

export const remove = (id: string) => {
  const index = repoUsers.findIndex(user => user.id === id);
  if (index !== -1) {
    repoUsers = repoUsers.filter(user => user.id !== id);
    return;
  }
  throw new Error(`Not found user with id ${id}`);
};
