#!/usr/bin/env node
const today = new Date()
const yearmonths = process.argv.slice(2)
const year = yearmonths[0] || today.getFullYear()
const month = yearmonths[1] || today.getMonth() + 1
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
