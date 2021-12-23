import sql from '../database-connection';
import {tableName} from '../../models/todo-models';

export function up(): void {
  sql.execute(
    `CREATE TABLE ${tableName} (
      id int NOT NULL AUTO_INCREMENT,
      activity_group_id int,
      title varchar(255),
      is_active varchar(255) DEFAULT 'true',
      priority varchar(255) DEFAULT 'very-high',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
      deleted_at TIMESTAMP DEFAULT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (activity_group_id) REFERENCES activitys(id)
    )`,
    err => {
      if (err) {
        console.log(`create table ${tableName} failed`, err);
      } else {
        console.log(`create table ${tableName} succsesfuly`);
      }
    }
  );
}

export function down(): void {
  sql.execute(`DROP TABLE ${tableName}`, err => {
    if (err) {
      console.log(`drop table ${tableName} failed`, err);
    } else {
      console.log(`drop table ${tableName} succsesfuly`);
    }
  });
}
