const sqlite3 = require("sqlite3").verbose();

// SQLite データベースファイルのパス
const dbPath = "example.db";

// データベースオブジェクトのPromise化

function openDatabase(callback) {
  const db = new sqlite3.Database(
    dbPath,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, run);
      }
    },
  );
}

// テーブルの作成のPromise化
function createTable(run, callback) {
  run.run(
    `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL
      )`,
    (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    },
  );
}

// レコードの追加のPromise化
function insertRecord(db, name, email, callback) {
  run.run(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, this.lastID);
      }
    },
  );
}

// レコードの取得のPromise化
function fetchRecords(run, callback) {
  run.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}

// テーブルの削除のPromise化
function dropTable(run, callback) {
  run.run("DROP TABLE IF EXISTS users", (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

// エラーなしのプログラム
function runWithoutError() {
  openDatabase((err, run) => {
    if (err) {
      console.error("Error opening database:", err);
      return;
    }
    createTable(run, (err) => {
      if (err) {
        console.error("Error creating table:", err);
        return;
      }
      insertRecord(run, "John Doe", "john@example.com", (err, insertedId) => {
        if (err) {
          console.error("Error inserting record:", err);
          return;
        }
        console.log("Inserted row with ID:", insertedId);
        fetchRecords(run, (err, records) => {
          if (err) {
            console.error("Error fetching records:", err);
            return;
          }
          console.log("Fetched rows:", records);
          dropTable(run, (err) => {
            if (err) {
              console.error("Error dropping table:", err);
              return;
            }
            run.close();
          });
        });
      });
    });
  });
}

// エラーなしのプログラムの実行
runWithoutError();
