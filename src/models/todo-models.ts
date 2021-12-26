import {Connection} from 'mysql2';

import connection from '../configs/database-connection';

export const tableName = 'todos';

export interface ITodos {
  id: number;
  activity_group_id: number;
  is_active: string;
  title: string;
  priority: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

class Todos {
  private connection: Connection;

  constructor(conn: Connection) {
    this.connection = conn;
  }

  /**
   * Find all Todos
   */
  public findTodos(id?: number): Promise<any> {
    const q = id ? `WHERE id = ${id}` : '';
    return new Promise(resolve => {
      // , IF(is_active = 'true', true, false) as is_active
      this.connection.query(`SELECT * FROM ${tableName} ${q}`, (err, res) => {
        if (err) {
          throw err;
        } else {
          resolve(res);
        }
      });
    });
  }

  /**
   * Create a new Todos
   *
   * @param <data> any
   */
  public createTodo(data: any): Promise<any> {
    return new Promise(resolve => {
      this.connection.query(
        `
        INSERT INTO ${tableName} (activity_group_id, title)
        VALUES ('${data.activity_group_id}', '${data.title}');
        SELECT * FROM ${tableName} WHERE id = LAST_INSERT_ID()
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
   * Find one Todos
   *
   * @param <id> number
   */
  public findTodo(id: number): Promise<any> {
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
   * Update one existing Todo
   *
   * @param <data> any
   */
  public updateTodo(data: any, id: number): Promise<any> {
    return new Promise(resolve => {
      const k = data.title ? 'title' : 'is_active';

      this.connection.query(
        `
        UPDATE ${tableName}
        SET ${k} = '${
          data.title ?? data.is_active
        }', updated_at = CURRENT_TIMESTAMP()
        WHERE id = ?; 
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
   * Remove one existing Todos
   *
   * @param <id> number
   */
  public deleteTodo(id: number): Promise<any> {
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

export const todoModel = new Todos(connection);
