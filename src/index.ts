import dotenv from "dotenv";
import http, { IncomingMessage, ServerResponse } from 'node:http';
import { usersRouter } from "./users/usersRouter.js";

dotenv.config();
const port = Number(process.env.PORT) || 4000;

const server = http.createServer(requestHandler);
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function requestHandler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  console.debug(req.url)
  if (req.url === '/api/users') {
    usersRouter(req, res);
    return
  }
  res.writeHead(404);
  res.end(JSON.stringify({ error: "Resource not found" }));
}
