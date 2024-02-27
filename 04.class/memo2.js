#!/usr/bin/env node

import sqlite3 from "sqlite3";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "memo.db");

class Memo {
  constructor() {
    this.db = new sqlite3.Database(
      dbPath,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          console.error("Error opening database:", err.message);
        } else {
          console.log("Connected to the SQLite database.");
          this.createTable();
        }
      },
    );
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS memos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT
      )
    `;
    this.db.run(sql, (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("Table 'memos' created successfully.");
      }
    });
  }

  addMemo(text) {
    const sql = `INSERT INTO memos (text) VALUES (?)`;
    this.db.run(sql, [text], (err) => {
      if (err) {
        console.error("Error adding memo:", err.message);
      } else {
        console.log("Memo added successfully.");
      }
    });
  }

  listMemos() {
    const sql = `SELECT * FROM memos`;
    this.db.all(sql, (err, rows) => {
      if (err) {
        console.error("Error listing memos:", err.message);
      } else {
        console.log("Memo List:");
        rows.forEach((row) => {
          console.log(`${row.id}. ${row.text}`);
        });
      }
    });
  }

  readMemo(id) {
    const sql = `SELECT * FROM memos WHERE id = ?`;
    this.db.get(sql, [id], (err, row) => {
      if (err) {
        console.error("Error reading memo:", err.message);
      } else {
        if (row) {
          console.log(row.text);
        } else {
          console.log("Memo not found.");
        }
      }
    });
  }

  deleteMemo(id) {
    const sql = `DELETE FROM memos WHERE id = ?`;
    this.db.run(sql, [id], (err) => {
      if (err) {
        console.error("Error deleting memo:", err.message);
      } else {
        console.log("Memo deleted successfully.");
      }
    });
  }
}

const memo = new Memo();

// コマンドライン引数の処理
const args = process.argv.slice(2);
const command = args[0];

if (command === "-a") {
  const text = args.slice(1).join(" ");
  memo.addMemo(text);
} else if (command === "-l") {
  memo.listMemos();
} else if (command === "-r") {
  const id = parseInt(args[1]);
  memo.readMemo(id);
} else if (command === "-d") {
  const id = parseInt(args[1]);
  memo.deleteMemo(id);
} else {
  console.log("Invalid command. Please use one of the following commands:");
  console.log("-a : メモ追加");
  console.log("-l : メモリスト参照");
  console.log("-r : メモを読む");
  console.log("-d : メモを消す");
}
