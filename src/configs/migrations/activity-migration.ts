import sql from '../database-connection';
import {tableName} from '../../models/activity-models';

export function up(): void {
  sql.execute(
    `CREATE TABLE ${tableName} (
        id int NOT NULL AUTO_INCREMENT,
        email varchar(255),
        title varchar(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
        deleted_at TIMESTAMP DEFAULT NULL,
        UNIQUE (email),
        PRIMARY KEY (id)
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
