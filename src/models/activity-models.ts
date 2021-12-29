import {Connection} from 'mysql2';

import connection from '../configs/database-connection';

export const tableName = 'activities';

export interface IActivitys {
  id: number;
  email: string;
  title: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

class Activitys {
  private connection: Connection;

  constructor(conn: Connection) {
    this.connection = conn;
  }

  /**
   * Find all Activitys
   */
  public findActivitys(): Promise<any> {
    return new Promise(resolve => {
      this.connection.query(`SELECT * FROM ${tableName}`, (err, res) => {
        if (err) {
          throw err;
        } else {
          resolve(res);
        }
      });
    });
  }

  /**
   * Create a new Activitys
   *
   * @param <data> any
   */
  public createActivity(data: any): Promise<any> {
    return new Promise(resolve => {
      this.connection.query(
        `
        INSERT INTO ${tableName} (email, title)
        VALUES ('${data.email}', '${data.title}');
        SELECT id, email, title, updated_at, created_at FROM ${tableName} WHERE id = LAST_INSERT_ID()
      `,
        (err, res) => {
          if (err) {
            throw err;
          } else {
            // @ts-ignore
            resolve(res);
          }
        }
      );
    });
  }

  /**
   * Find one Activitys
   *
   * @param <id> number
   */
  public findActivity(id: number): Promise<any> {
    return new Promise(resolve => {
      this.connection.query(
        `SELECT * FROM ${tableName} WHERE id = ?`,
        [id],
        (err, res) => {
          if (err) {
            throw err;
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  /**
   * Update one existing Activity
   *
   * @param <data> any
   */
  public updateActivity(data: any, id: number): Promise<any> {
    return new Promise(resolve => {
      this.connection.query(
        `UPDATE ${tableName} SET title = '${data.title}', updated_at = CURRENT_TIMESTAMP() WHERE id = ?; 
        SELECT * FROM ${tableName}
        WHERE id = ?
      `,
        [id, id],
        (err, res) => {
          if (err) {
            throw err;
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  /**
   * Remove one existing Activitys
   *
   * @param <id> number
   */
  public deleteActivity(id: number): Promise<any> {
    return new Promise(resolve => {
      this.connection.query(
        `DELETE FROM ${tableName} WHERE id = ?`,
        [id],
        (err, res) => {
          if (err) {
            throw err;
          } else {
            resolve(res);
          }
        }
      );
    });
  }
}

export const activityModel = new Activitys(connection);
