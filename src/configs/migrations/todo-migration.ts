import sql from '../database-connection';
import {tableName} from '../../models/todo-models';

export function up(): void {
  sql.query(
    `DROP TABLE IF EXISTS ${tableName}; CREATE TABLE ${tableName} (
      id SMALLINT NOT NULL AUTO_INCREMENT,
      activity_group_id TINYINT(2) NOT NULL,
      title varchar(22),
      is_active BOOLEAN DEFAULT TRUE,
      priority CHAR(10) DEFAULT 'very-high',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
      PRIMARY KEY (id)
    ) ENGINE=MyISAM`,
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
  sql.query(`DROP TABLE ${tableName}`, err => {
    if (err) {
      console.log(`drop table ${tableName} failed`, err);
    } else {
      console.log(`drop table ${tableName} succsesfuly`);
    }
  });
}
