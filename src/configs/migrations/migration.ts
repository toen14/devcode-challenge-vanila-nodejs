import connection from '../database-connection';
import * as activity from './activity-migration';
import * as todo from './todo-migration';

// running migrations
function migrate() {
  activity.up();
  todo.up();

  // close the connection
  connection.end();
}

migrate();
