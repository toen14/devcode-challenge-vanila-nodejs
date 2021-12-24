import {IncomingMessage, ServerResponse} from 'http';

import {bodyParser} from '../helpers/body-parser';
import {successRespon} from '../helpers/responser';
import {NotFoundError, ValidationError} from '../errors-handler';
import {ITodos, todoModel} from '../models/todo-models';

export async function index(res: ServerResponse, id?: number) {
  const todos = await todoModel.findTodos(id);

  successRespon(todos, res);
}

export async function store(req: IncomingMessage, res: ServerResponse) {
  const data = (await bodyParser(req)) as ITodos;

  // data validations
  if (!data.title) {
    throw new ValidationError('title connot be null', res);
  }

  if (!data.activity_group_id) {
    throw new ValidationError('activity_group_id connot be null', res);
  }

  const todo = await todoModel.createTodo(data);

  successRespon(todo[1][0], res, 201);
}

export async function show(res: ServerResponse, id: number) {
  const todo = await todoModel.findTodo(id);

  if (!todo.length) {
    throw new NotFoundError(`Todo with ID ${id} Not Found`, res);
  }

  successRespon(todo[0], res);
}

export async function update(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  const data = (await bodyParser(req)) as ITodos;

  // data validations
  // if (!data.title) {
  //   throw new ValidationError('title connot be null', res);
  // }

  const todo = await todoModel.updateTodo(data, id);

  if (!todo[0].affectedRows) {
    throw new NotFoundError(`Todo with ID ${id} Not Found`, res);
  }

  successRespon(todo[1][0], res);
}

export async function destroy(res: ServerResponse, id: number) {
  const todo = await todoModel.deleteTodo(id);

  if (!todo[1].affectedRows) {
    throw new NotFoundError(`Todo with ID ${id} Not Found`, res);
  }

  successRespon(todo[0][0], res);
}
