import { addMemo, listMemos, readMemo, deleteMemo } from "./indexmemo.js";
import readline from "readline";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MEMO_FILE = path.join(__dirname, "memo.txt"); // memo.js と同じく、ここでファイルパスを設定する

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const args = process.argv.slice(2);
const command = args[0];

if (args.length === 0) {
  console.log("次のいずれかのコマンドを使用してください");
  console.log("-l : メモリスト参照");
  console.log("-r : メモを読む");
  console.log("-d : メモを消す");
} else if (command === "-l") {
  listMemos(MEMO_FILE); // MEMO_FILE を引数として渡す
} else if (command === "-r") {
  const index = parseInt(args[1]) - 1;
  readMemo(index, MEMO_FILE); // MEMO_FILE を引数として渡す
} else if (command === "-d") {
  const index = parseInt(args[1]) - 1;
  deleteMemo(index, MEMO_FILE); // MEMO_FILE を引数として渡す
} else {
  // パイプ経由で入力を受け取る
  let userInput = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("readable", () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
      userInput += chunk;
    }
  });

  process.stdin.on("end", () => {
    addMemo(userInput.trim(), MEMO_FILE);
  });
}
