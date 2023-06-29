
export const bodyParser = async (req) => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      if (req.headers['content-type'] === 'application/json') {
        const data = JSON.parse(body);
        resolve(data);
      } else {
        reject('Unsupported content type');
      }
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
};