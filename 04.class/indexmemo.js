import fs from "fs";
import path from "path";

// モジュールのディレクトリパスを取得
const __dirname = path.dirname(new URL(import.meta.url).pathname);
// memo.txt ファイルのパスを生成
const MEMO_FILE = path.resolve(__dirname, "memo.txt");

export function addMemo(text, MEMO_FILE) {
  fs.appendFileSync(MEMO_FILE, text + "\n");
  console.log("Memo added successfully.");
}

export function listMemos(MEMO_FILE) {
  const memos = fs.readFileSync(MEMO_FILE, "utf8").trim().split("\n");
  console.log("Memo List:");

  memos.forEach((memo, index) => {
    console.log(`${index + 1}. ${memo}`);
  });
}

export function readMemo(index, MEMO_FILE) {
  const memos = fs.readFileSync(MEMO_FILE, "utf8").trim().split("\n");
  console.log(memos[index]);
}

export function deleteMemo(index, MEMO_FILE) {
  let memos = fs.readFileSync(MEMO_FILE, "utf8").trim().split("\n");
  memos.splice(index, 1);
  fs.writeFileSync(MEMO_FILE, memos.join("\n"));
  console.log("Memo deleted successfully.");
}
