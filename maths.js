function getInformation(number) {
  var numberString = number.toString();
  var absoluteValue = (number < 0) ? -number : number;
  var sign = 0;
  var signSymbol = "0";
  if (number > 0) {
    sign = 1;
    signSymbol = "+";
  } else if (number < 0) {
    sign = -1;
    signSymbol = "-";
  }

  var digits = numberString.length;
  var digitSum = positiveDigitSum(absoluteValue);
  var digitalRoot = positiveDigitSum(absoluteValue, true);

  var divider = [];
  for (var i = 1; i <= number; i++) {
    if (number % i === 0) {
      divider.push(i);
    }
  }

  if (sign === -1) {
    digitSum *= -1;
    digits--;
  }

  var fibonacciNumberIndexes = getFibonacciNumberIndexes(number);
  var catalanNumberIndexes = getCatalanNumberIndexes(number);

  return {
    number: number,
    previosNumber: number - 1,
    nextNumber: number + 1,
    sign: sign,
    signSymbol: signSymbol,
    additiveInverse: -number,
    absoluteValue: absoluteValue,
    squareNumber: number * number,
    squareRoot: Math.sqrt(number),
    cubeRoot: Math.cbrt(number),
    base2: number.toString(2),
    base8: number.toString(8),
    base16: number.toString(16),
    digitSum: digitSum,
    digitalRoot: digitalRoot,
    digits: digits,
    reciprocal: 1 / number,
    sinus: Math.sin(number),
    cosinus: Math.cos(number),
    tangens: Math.tan(number),
    cotangens: 1 / Math.tan(number),
    divider: divider,
    isPrime: divider.length === 2,
    isFibonacciNumber: fibonacciNumberIndexes.length !== 0,
    fibonacciNumberIndexes: fibonacciNumberIndexes,
    isCatalanNumber: catalanNumberIndexes.length !== 0,
    catalanNumberIndexes: catalanNumberIndexes
  }
}

// Only use this function with positive numbers
function positiveDigitSum(number, singleDigit) {
  var string = number.toString();
  var result = 0;
  for (var i = 0; i < string.length; i++) {
    result += parseInt(string[i]);
  }
  console.log(result);
  if (!singleDigit || result <= 9) {
    return result;
  } else {
    return positiveDigitSum(result, true);
  }
}

function getFibonacciNumberIndexes(n) {
  if (n === 0) {
    return [1];
  } else if (n === 1) {
    return [2, 3];
  } else {
    var a = 1;
    var b = 1;
    var c = 2;
    var index = 4;
    while (c < n) {
      a = b;
      b = c;
      c = a + b;
      index++;
    }
    return (c === n) ? [index] : [];
  }
}

function getCatalanNumberIndexes(number) {
  if (number === 1) {
    return [0, 1];
  }
  var a = 2;
  var index = 2;
  while (a < number) {
    a = getCatalanNumber(++index);
  }
  return (number === a) ? [index] : [];
}

function getCatalanNumber(n) {
  if (n === 0) {
    return 1;
  }
  return (1 / (n + 1)) * getBinomialCoefficient(2 * n, n);
}

function getFactorial(n) {
  if (n <= 1) {
    return n;
  }
  return n * getFactorial(n - 1);
}

function getBinomialCoefficient(n, k) {
  return getFactorial(n) / (getFactorial(k) * getFactorial(n - k));
}
