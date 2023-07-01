import * as usersService from './usersService.js';
import { getUUIDFromUrl } from '../utils/getIdFromUrl.js';
import { bodyParser } from '../utils/bodyParser.js';
import { validateUser } from './dto/userValidator.ts';

export const usersRouter = async (req, res) => {
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
        const error = `Invalid format or required user property`;
        res.end(JSON.stringify({ error }));
        return;
      }
    }
  }

  if (!uuid.valid) {
    res.writeHead(400);
    const error = `Invalid format of id, expected UUID, get ${uuid.id}`;
    res.end(JSON.stringify({ error }));
    return;
  }

  // valid UUID:
  if (method === 'GET') {
    try {
      const response = usersService.getOne(uuid.id);
      res.writeHead(200);
      res.end(JSON.stringify(response));
    } catch (err) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: err.message }));
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
        res.writeHead(404);
        res.end(JSON.stringify({ error: err.message }));
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
        res.writeHead(404);
        res.end(JSON.stringify({ error: err.message }));
      }
    }
  }
};
