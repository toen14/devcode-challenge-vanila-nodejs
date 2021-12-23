import {IncomingMessage, ServerResponse} from 'http';

import * as todoController from '../controllers/todo-controller';

export function todoRouter(req: IncomingMessage, res: ServerResponse): void {
  if (req.url! === '/todo-items' && req.method === 'GET') {
    let id: number | undefined;
    if (req.url?.match(/\/todo-items\?([a-zA-Z]+(_[a-zA-Z]+)+)=\d/)) {
      id = parseInt(req.url.split('=')[1])
    }
    console.log('i')
    todoController.index(res, id);
  } else if (req.url === '/todo-items' && req.method === 'POST') {
    todoController.store(req, res);
  } else if (req.url!.match(/\/todo-items\/\w+/) && req.method === 'GET') {
    todoController.show(res, parseInt(req.url!.split('/')[2]));
  } else if (req.url!.match(/\/todo-items\/\w+/) && req.method === 'PATCH') {
    todoController.update(req, res, parseInt(req.url!.split('/')[2]));
  } else if (req.url!.match(/\/todo-items\/\w+/) && req.method === 'DELETE') {
    todoController.destroy(res, parseInt(req.url!.split('/')[2]));
  }
}
