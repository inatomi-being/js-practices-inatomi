import fs from "fs";
import path from "path";

const MEMO_FILE = path.join("memo.txt");

function addMemo(text) {
  fs.appendFileSync(MEMO_FILE, text + "\n");
  console.log("Memo added successfully.");
}

function listMemos() {
  const memos = fs.readFileSync(MEMO_FILE, "utf8").trim().split("\n");
  console.log("Memo List:");

  memos.forEach((memo, index) => {
    console.log(`${index + 1}. ${memo.split("\n")[0]}`);
  });
}

function readMemo(index) {
  const memos = fs.readFileSync(MEMO_FILE, "utf8").trim().split("\n");
  console.log(memos[index]);
}

function deleteMemo(index) {
  let memos = fs.readFileSync(MEMO_FILE, "utf8").trim().split("\n");
  memos.splice(index, 1);
  fs.writeFileSync(MEMO_FILE, memos.join("\n"));
  console.log("Memo deleted successfully.");
}

// コマンドライン引数の処理
const args = process.argv.slice(2);
const command = args[0];

if (command === "-a") {
  const text = args.slice(1).join(" ");
  addMemo(text);
} else if (command === "-l") {
  listMemos();
} else if (command === "-r") {
  const index = parseInt(args[1]) - 1;
  readMemo(index);
} else if (command === "-d") {
  const index = parseInt(args[1]) - 1;
  deleteMemo(index);
} else {
  console.log("Invalid command. Please use one of the following commands:");
  console.log("-a : Add memo");
  console.log("-l : List memos");
  console.log("-r : Read memo");
  console.log("-d : Delete memo");
}
