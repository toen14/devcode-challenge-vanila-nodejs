import {IncomingMessage, ServerResponse} from 'http';

import {bodyParser} from '../helpers/body-parser';
import {successRespon} from '../helpers/responser';
import {NotFoundError, ValidationError} from '../errors-handler';
import {IActivitys, activityModel} from '../models/activity-models';

export async function index(res: ServerResponse) {
  const activity = await activityModel.findActivitys();

  successRespon(activity, res);
}

export async function store(req: IncomingMessage, res: ServerResponse) {
  const data = (await bodyParser(req)) as IActivitys;

  // data validations
  if (!data.title) {
    throw new ValidationError('title cannot be null', res);
  }

  const activity = await activityModel.createActivity(data);

  successRespon(activity[1][0], res, 201);
}

export async function show(res: ServerResponse, id: number) {
  const activity = await activityModel.findActivity(id);

  if (!activity.length) {
    throw new NotFoundError(`Activity with ID ${id} Not Found`, res);
  }

  successRespon(activity[0], res);
}

export async function update(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  const data = (await bodyParser(req)) as IActivitys;

  // data validations
  if (!data.title) {
    throw new ValidationError('title cannot be null', res);
  }

  const activity = await activityModel.updateActivity(data, id);

  if (!activity[0].affectedRows) {
    throw new NotFoundError(`Activity with ID ${id} Not Found`, res);
  }

  successRespon(activity[1][0], res);
}

export async function destroy(res: ServerResponse, id: number) {
  const activity = await activityModel.deleteActivity(id);

  if (!activity.affectedRows) {
    throw new NotFoundError(`Activity with ID ${id} Not Found`, res);
  }

  successRespon({}, res);
}
