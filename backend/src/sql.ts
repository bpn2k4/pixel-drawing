import sqlite3 from 'sqlite3'

interface Row {
  count: number;
}

class Sql {

  private db: sqlite3.Database

  constructor() {
    this.db = new sqlite3.Database("database.sqlite")
  }

  public getDb() {
    return this.db
  }

  public close() {
    this.db.close()
  }

  public createTable() {
    return new Promise<void>((resolve, reject) => {
      this.db.run(
        `CREATE TABLE IF NOT EXISTS points (
          x INTEGER, 
          y INTEGER,
          color TEXT,
          PRIMARY KEY (x, y)
        )`,
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve()
        }
      );
    });
  }

  public async getPoints() {
    return new Promise<Point[]>((resolve, reject) => {
      this.db.all(
        `SELECT x, y, color FROM points`,
        function (err, rows: Point[]) {
          if (err) {
            return reject(err)
          }
          resolve(rows)
        }
      );
    });
  }

  public async updatePoint(x: number, y: number, color: string) {
    return new Promise<void>((resolve, reject) => {
      this.db.run(
        `INSERT OR REPLACE INTO points (x, y, color) VALUES (${x}, ${y}, '${color}')`,
        function (err) {
          if (err) {
            return reject(err)
          }
          resolve();
        }
      )
    })
  }
}

type Point = {
  x: number,
  y: number,
  color: string
}

const sql = new Sql()

export default sql