const sqlite3 = require("sqlite3").verbose();

// SQLite データベースファイルのパス
const dbPath = "example.db";

// データベースオブジェクトのPromise化

function openDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(
      dbPath,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(db);
        }
      }
    );
  });
}

// テーブルの作成のPromise化
function createTable(db) {
  return new Promise((resolve, reject) => {
    //promise関数を返す
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        )`, //文字列
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

// レコードの追加のPromise化
function insertRecord(db, name, email) {
  return new Promise((resolve, reject) => {
    //promise関数を返す
    db.run(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
}

// レコードの取得のPromise化
function fetchRecords(db) {
  return new Promise((resolve, reject) => {
    //promise関数を返す
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// テーブルの削除のPromise化
function dropTable(db) {
  return new Promise((resolve, reject) => {
    db.run("DROP TABLE IF EXISTS users", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// エラーなしのプログラム
async function runWithoutError() {
  try {
    const db = await openDatabase();
    await createTable(db);
    const insertedId = await insertRecord(db, "John Doe", "john@example.com");
    console.log("Inserted row with ID:", insertedId);
    const records = await fetchRecords(db);
    console.log("Fetched rows:", records);
    await dropTable(db);
    db.close();
  } catch (err) {
    console.error("Error:", err);
  }
}

// エラーなしのプログラムの実行
runWithoutError();
