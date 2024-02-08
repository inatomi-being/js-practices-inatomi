#!/usr/bin/env node
const today = new Date()
const yearmonths = import('minimist')(process.yearmonths.slice(2))
let year = today.getFullYear()
if (yearmonths.y != null) {
  year = yearmonths.y
}
let month = today.getMonth() + 1
if (yearmonths.m != null) {
  month = yearmonths.m
}

if (month < 1) {
  month = 1
} else if (month > 12) {
  month = 12
}
console.log(year + '年' + month + '月')
const weeks = ['日', '月', '火', '水', '木', '金', '土']
console.log(weeks.join(' '))
const startDate = new Date(year, month - 1, 1)
const endDate = new Date(year, month, 0)
const startDay = startDate.getDay()

for (let i = 0; i < startDay; i++) {
  process.stdout.write('   ')
}
for (let i = 1; i <= endDate.getDate(); i++) {
  const dayString = String(i).padStart(2, ' ')
  process.stdout.write(`${dayString} `)

  const day = new Date(year, month - 1, i).getDay()

  if (day == 6) {
    console.log(``)
  }
}
