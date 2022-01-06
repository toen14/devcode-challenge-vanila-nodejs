import {IncomingMessage, ServerResponse} from 'http';

import * as todoController from '../controllers/todo-controller';

export function todoRouter(req: IncomingMessage, res: ServerResponse): void {
  if (req.url === '/todo-items' && req.method === 'POST') {
    todoController.store(req, res);
  } else if (
    (req.url === '/todo-items' && req.method === 'GET') ||
    req.url!.split('=')[1]
  ) {
    let id: number | undefined = parseInt(req.url!.split('=')[1]);

    if (isNaN(id)) {
      id = undefined;
    }

    todoController.index(res, id);
  } else if (req.url!.match(/\/todo-items\/\w+/) && req.method === 'GET') {
    todoController.show(res, parseInt(req.url!.split('/')[2]));
  } else if (req.url!.match(/\/todo-items\/\w+/) && req.method === 'PATCH') {
    todoController.update(req, res, parseInt(req.url!.split('/')[2]));
  } else if (req.url!.match(/\/todo-items\/\w+/) && req.method === 'DELETE') {
    todoController.destroy(res, parseInt(req.url!.split('/')[2]));
  }
}
