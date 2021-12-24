import {IncomingMessage, ServerResponse} from 'http';

import * as activityController from '../controllers/activity-controller';

export function activityRouter(
  req: IncomingMessage,
  res: ServerResponse
): void {
  if (req.url === '/activity-groups' && req.method === 'GET') {
    activityController.index(res);
  } else if (req.url === '/activity-groups' && req.method === 'POST') {
    activityController.store(req, res);
  } else if (req.url!.match(/\/activity-groups\/\w+/) && req.method === 'GET') {
    activityController.show(res, parseInt(req.url!.split('/')[2]));
  } else if (
    req.url!.match(/\/activity-groups\/\w+/) &&
    req.method === 'PATCH'
  ) {
    activityController.update(req, res, parseInt(req.url!.split('/')[2]));
  } else if (
    req.url!.match(/\/activity-groups\/\w+/) &&
    req.method === 'DELETE'
  ) {
    activityController.destroy(res, parseInt(req.url!.split('/')[2]));
  }
}
