
function absentNumber(array) {
  const newArray = [];
  newArray.length = array.length + 1;
  array.forEach(item => newArray.push(item));
  const sortArr = newArray.sort((a, b) => a - b);
  const result = sortArr.find(item => (item / (sortArr.indexOf(item) + 1)) !== ((item + 1) / (sortArr.indexOf(item) + 2)));
  if (isNaN(result)) {
      return array.length + 1;
  } 
      return (result - 1);
}
const arr = [2, 1];
console.log(absentNumber(arr));
// console.log(arr.sort((a, b) => a - b));

function absentNumber(array) {
    let maxsum = array.length + 1;
    let minelem = /* array.sort()[0]; */1;
    let sumOfIntegers = 0;
  
    for (let i = 0; i < array.length; i++) {
      sumOfIntegers += array[i];
    }
    let upperLimitSum = (maxsum * (maxsum + 1)) / 2;
    let lowerLimitSum = (minelem * (minelem - 1)) / 2;
  
    let theoreticalSum = upperLimitSum - lowerLimitSum;

    if (isNaN(theoreticalSum)) {
        return array.length + 1;
    }
  
    return theoreticalSum - sumOfIntegers;
  }
  const array = [2];
console.log(absentNumber(array));