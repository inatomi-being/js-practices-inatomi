#!/usr/bin/env node

const today = new Date();
const yearmonths = process.argv.slice(2);
const year = yearmonths[0] || today.getFullYear();
const month = yearmonths[1] || today.getMonth() + 1;
console.log(year + "年" + month + "月");
let weeks = ["日", "月", "火", "水", "木", "金", "土"];
console.log(weeks.join("  "));
let startDate = new Date(year, month - 1, 1);
let endDate = new Date(year, month, 0);
let startDay = startDate.getDay();

for (let i = 0; i < startDay; i++) {
  process.stdout.write("    ");
}
for (let i = 1; i <= endDate.getDate(); i++) {
  if (String(i).length > 1) {
    i = i;
  } else {
    i = " " + i;
  }

  process.stdout.write(` ${i} `);
  let Day = new Date(year, month - 1, i).getDay();

  if (Day == 6) {
    console.log(``);
  }
}
