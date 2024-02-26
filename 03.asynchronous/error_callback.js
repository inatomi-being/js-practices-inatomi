const sqlite3 = require("sqlite3").verbose();

// SQLite データベースファイルのパス
const dbPath = "example.db";

// データベースオブジェクトの取得
function openDatabase(callback) {
  const db = new sqlite3.Database(
    dbPath,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, db);
      }
    },
  );
}

// テーブルの作成
function createTable(db, callback) {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL
      )`,
    (err) => {
      callback(err);
    },
  );
}

// レコードの追加
function insertRecord(db, name, email, callback) {
  db.run(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, this.lastID);
      }
    },
  );
}

// レコードの取得
function fetchRecords(db, callback) {
  db.all("SELECT * FROM users", (err, rows) => {
    callback(err, rows);
  });
}

// テーブルの削除
function dropTable(db, callback) {
  db.run("DROP TABLE IF EXISTS users", (err) => {
    callback(err);
  });
}

// エラーありのプログラム
function runWithError() {
  openDatabase((err, db) => {
    if (err) {
      console.error("Error opening database:", err);
      return;
    }
    createTable(db, (err) => {
      if (err) {
        console.error("Error creating table:", err);
        db.close();
        return;
      }
      insertRecord(db, "John Doe", null, (err) => {
        if (err) {
          console.error("Error inserting record:", err);
        }
        fetchRecords(db, (err, rows) => {
          if (err) {
            console.error("Error fetching records:", err);
          } else {
            console.log("Fetched records:", rows);
          }
          dropTable(db, (err) => {
            if (err) {
              console.error("Error dropping table:", err);
            }
            db.close();
          });
        });
      });
    });
  });
}

// エラーありのプログラムの実行
runWithError();
