import { IncomingMessage, ServerResponse } from "node:http";
export const usersController = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200);
  res.end("My first response!");
}