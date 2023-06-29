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

  if (method === 'GET' && uuid?.valid) {
    res.writeHead(200);
    const payload = JSON.stringify(usersService.getOne(uuid.id));
    res.end(payload);
    return;
  }

  if (method === 'POST') {
    const body = await bodyParser(req);
    res.writeHead(200);
    res.end(JSON.stringify(usersService.create(body)));
    return;
  }

  if (method === 'PUT' && uuid?.valid) {
    const body = await bodyParser(req);
    res.writeHead(200);
    res.end(JSON.stringify(usersService.update(uuid.id, body)));
    return;
  }

  if (method === 'DELETE' && uuid?.valid) {
    usersService.remove(uuid.id);
    res.writeHead(204);
    res.end();
    return;
  }
  res.writeHead(200);
  res.end('NOPE');

};