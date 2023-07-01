import { IncomingMessage, ServerResponse } from 'node:http';
import * as usersService from './usersService.js';
import { ICheckUUID, getUUIDFromUrl } from '../utils/getIdFromUrl.js';
import { bodyParser } from '../utils/bodyParser.js';
import { IUserRequestDTO, validateUser } from './dto/userValidator.js';

export const usersRouter = async (req: IncomingMessage, res: ServerResponse) => {
  const method = req.method;
  const uuid = getUUIDFromUrl(req.url);

  if (!uuid) { // no param UUID
    if (method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify(usersService.getAll()));
      return;
    }

    if (method === 'POST') {
      try {
        const body = await bodyParser(req);
        if (validateUser(body)) {
          const verifyBody = body as IUserRequestDTO;
          res.writeHead(201);
          res.end(JSON.stringify(usersService.create(verifyBody)));
          return;
        }
        send400InvalidBody(res);
      } catch (err) {
        throw err
      }
    }
  } else if (!uuid.valid) { // invalid UUID:
    res.writeHead(400);
    const error = `Invalid format of id, expected UUID, get ${uuid.id}`;
    res.end(JSON.stringify({ error }));
    return;
  } else {
    if (!uuid.valid) return; // type narrow, valid UUID:
    if (method === 'GET') {
      try {
        const response = usersService.getOne(uuid.id);
        res.writeHead(200);
        res.end(JSON.stringify(response));
      } catch (err) {
        send404TS(err, res)
      } finally {
        return;
      }
    }

    if (method === 'PUT') {
      const body = await bodyParser(req);
      try {
        if (validateUser(body)) {
          const verifyBody = body as IUserRequestDTO;
          const updatedUser = usersService.update(uuid.id, verifyBody);
          res.writeHead(200);
          res.end(JSON.stringify(updatedUser));
          return;
        }
        send400InvalidBody(res)
      } catch (err) {
        send404TS(err, res);
        return;
      }
    }

    if (method === 'DELETE') {
      try {
        usersService.remove(uuid.id);
        res.writeHead(204);
        res.end();
        return;
      } catch (err) {
        send404TS(err, res)
      }
    }
  }
};

function send404TS(err: unknown, res: ServerResponse) {
  let errMsg: string = '';
  if (typeof err === "string") {
    errMsg = err.toUpperCase() // `err` narrowed to string
  } else if (err instanceof Error) {
    errMsg = err.message //  `err` narrowed to Error
  }
  res.writeHead(404);
  res.end(JSON.stringify({ error: errMsg }));
}

function send400InvalidBody(res: ServerResponse) {
  res.writeHead(400);
  const error = `Invalid body format or required user property`;
  res.end(JSON.stringify({ error }));
}
