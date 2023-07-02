import dotenv from "dotenv";
import http, { IncomingMessage, ServerResponse } from 'node:http';
import { usersRouter } from "./users/usersRouter.js";

dotenv.config();
const port = process.env.PORT || 4000;

const server = http.createServer(requestHandler);
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

async function requestHandler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  console.debug(req.method, req.url)
  try {
    if (req.url) {
      if (req.url.slice(-1) === '/') { req.url = req.url.slice(0, -1) }
      if (req.url.startsWith('/api/users')) {
        await usersRouter(req, res);
        return
      }
      res.writeHead(404);
      res.end(JSON.stringify({ error: `NOT FOUND ${req.url}` }));
    }
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error')
  }
}
