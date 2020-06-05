function s(num: number) {
  switch (num) {
    case 1:
    case 2:
      return 'good';

    default:
      return 'bad';
  }
}

console.log(s(1));
console.log(s(2));
console.log(s(3));
