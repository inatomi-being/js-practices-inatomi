for (let num = 1; num <= 20; num++) {
  if (num % 3 === 0 && num % 5 !== 0) {
    console.log("fizz");
  } else if (num % 3 !== 0 && num % 5 === 0) {
    console.log("buzz");
  } else if (num % 3 === 0 && num % 5 === 0) {
    console.log("fizzbuzz");
  } else {
    console.log(num);
  }
}
