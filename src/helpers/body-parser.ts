import {IncomingMessage} from 'http';

export const bodyParser = function (req: IncomingMessage): Promise<object> {
  return new Promise(resolve => {
    let data = '';

    req.on('data', (chunk: Buffer) => {
      if (chunk) {
        data += chunk.toString();
      }
    });

    req.on('end', () => {
      resolve(JSON.parse(data));
    });
  });
};
