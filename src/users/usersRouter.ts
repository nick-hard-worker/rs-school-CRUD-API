import { IncomingMessage, ServerResponse } from 'node:http';
import * as usersService from './usersService.js';
import { getUUIDFromUrl } from '../utils/getIdFromUrl.js';
import { bodyParser } from '../utils/bodyParser.js';
import { validateUser } from './dto/userValidator.js';

export const usersRouter = async (req: IncomingMessage, res: ServerResponse) => {
  const method = req.method;
  const uuid = getUUIDFromUrl(req.url);

  if (!uuid) {
    if (method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify(usersService.getAll()));
      return;
    }

    if (method === 'POST') {
      try {
        const body = await bodyParser(req);
        if (validateUser(body)) {
          res.writeHead(201);
          res.end(JSON.stringify(usersService.create(body)));
          return;
        }
        throw new Error('No validate');
      } catch (err) {
        res.writeHead(400);
        const error = `Invalid body format or required user property`;
        res.end(JSON.stringify({ error }));
        return;
      }
    }
  } else if (!uuid.valid) { // invalid UUID:
    res.writeHead(400);
    const error = `Invalid format of id, expected UUID, get ${uuid.id}`;
    res.end(JSON.stringify({ error }));
    return;
  } else { // valid UUID:
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
      if (uuid.valid) {
        const body = await bodyParser(req);
        try {
          const updatedUser = usersService.update(uuid.id, body);
          res.writeHead(200);
          res.end(JSON.stringify(updatedUser));
          return;
        } catch (err) {
          send404TS(err, res)
        }
      }
    }

    if (method === 'DELETE') {
      if (uuid.valid) {
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
