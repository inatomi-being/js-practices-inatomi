#!/usr/bin/env node

import fs from "fs";
import path from "path";

const MEMO_FILE = path.join("memo.txt");
//メモを保存するファイルのパスを設定しています。
function addMemo(text) {
  fs.appendFileSync(MEMO_FILE, text + "\n");
  console.log("Memo added successfully.");
}
//fs.appendFileSync メソッドを使って、ファイルの末尾にテキストを追記しています。
function listMemos() {
  const memos = fs.readFileSync(MEMO_FILE, "utf8").trim().split("\n");
  console.log("Memo List:");

  memos.forEach((memo, index) => {
    console.log(`${index + 1}. ${memo.split("\n")[0]}`);
  });
}
//ファイルからメモを読み取り、それぞれのメモを行番号付きで表示します。
function readMemo(index) {
  const memos = fs.readFileSync(MEMO_FILE, "utf8").trim().split("\n");
  console.log(memos[index]);
}
//指定された行番号のメモを読み取り、その内容を表示します。
function deleteMemo(index) {
  let memos = fs.readFileSync(MEMO_FILE, "utf8").trim().split("\n");
  memos.splice(index, 1);
  fs.writeFileSync(MEMO_FILE, memos.join("\n"));
  console.log("Memo deleted successfully.");
}
//まず、ファイルからメモを読み取り、削除する行を配列から取り除いた後、ファイルに残ったメモを書き戻します。

// コマンドライン引数の処理
const args = process.argv.slice(2);
const command = args[0];

if (command === "-l") {
  listMemos();
} else if (command === "-r") {
  const index = parseInt(args[1]) - 1;
  readMemo(index);
} else if (command === "-d") {
  const index = parseInt(args[1]) - 1;
  deleteMemo(index);
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("メモの内容: ", (userInput) => {
    addMemo(userInput);
    rl.close();
  });

  console.log("Invalid command. Please use one of the following commands:");
  console.log("-l : メモリスト参照");
  console.log("-r : メモを読む");
  console.log("-d : メモを消す");
}
