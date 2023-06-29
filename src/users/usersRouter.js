import * as usersService from './usersService.js';
import { getUUIDFromUrl } from '../utils/getIdFromUrl.js';
import { bodyParser } from '../utils/bodyParser.js';

export const usersRouter = async (req, res) => {
  const method = req.method;
  const uuid = getUUIDFromUrl(req.url);

  if (method === 'GET' && !uuid) {
    res.writeHead(200);
    res.end(JSON.stringify(usersService.getAll()));
    return;
  }

  if (method === 'GET' && uuid.valid) {
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

  if (method === 'GET' && !uuid.valid) {
    res.writeHead(400);
    const error = `Invalid format of id, expected UUID, get ${uuid.id}`;
    res.end(JSON.stringify({ error }));
  }

  if (method === 'POST') {
    const body = await bodyParser(req);
    res.writeHead(201);
    res.end(JSON.stringify(usersService.create(body)));
    return;
  }

  if (method === 'PUT' && uuid) {
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
    } else {
      sendInvalidUUID(uuid, res);
      return;
    }
  }

  if (method === 'DELETE' && uuid) {
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
    } else {
      sendInvalidUUID(uuid, res);
      return;
    }
  }
};

function sendInvalidUUID(uuid, res) {
  res.writeHead(400);
  const error = `Invalid format of id, expected UUID, get ${uuid.id}`;
  res.end(JSON.stringify({ error }));
}
