import {createServer} from 'http';

import {port} from './configs/env';
import {activityRouter} from './routers/activity-route';
import {todoRouter} from './routers/todo-route';
import {handler} from './errors-handler/handler';

const server = createServer();

server.on('request', todoRouter);
server.on('request', activityRouter);

// handling errors
handler();

server.listen(port, () => console.log(`Server running on port ${port}`));
