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
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        )`,
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

// エラーありのプログラム
async function runWithError() {
  try {
    const db = await openDatabase();
    await createTable(db);
    try {
      await insertRecord(db, "John Doe", null); // エラーを発生させるために email を null にする
    } catch (err) {
      console.error("Error inserting record:", err);
    }
    try {
      await fetchRecords(db);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
    await dropTable(db);
    db.close();
  } catch (err) {
    console.error("Error:", err);
  }
}

// エラーありのプログラムの実行
runWithError();