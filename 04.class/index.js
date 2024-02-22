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
  console.log("Invalid command. Please use one of the following commands:");
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
  rl.question("メモの内容: ", (userInput) => {
    addMemo(userInput, MEMO_FILE); // MEMO_FILE を引数として渡す
    rl.close();
  });
}
