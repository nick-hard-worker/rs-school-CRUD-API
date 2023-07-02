import { IncomingMessage } from 'node:http';

export const bodyParser = async (req: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      if (req.headers['content-type'] === 'application/json') {
        try {
          const data = JSON.parse(body);
          resolve(data);
        } catch (error) {
          reject(new Error('Invalid JSON format'));
        }
      } else {
        reject(new Error('Unsupported content type'));
      }
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
};