const parity = Object.freeze({
  ODD: 0,
  EVAN: 1
});

const sign = Object.freeze({
  POSITIVE: {
    number: 1,
    string: "+"
  },
  ZERO: {
    number: 0,
    string: 0
  },
  NEGATIVE: {
    number: -1,
    string: "-"
  }
});

function getInformation(number) {
  var number = new Decimal(number);
  var numberString = number.toString();
  var numberSign;
  if (number > 0) {
    numberSign = sign.POSITIVE;
  } else if (number < 0) {
    numberSign = sign.NEGATIVE;
  } else {
    numberSign = sign.ZERO;
  }
  var absoluteValue = number.abs();

  var digits = new Decimal(numberString.length);
  var digitSum = positiveDigitSum(absoluteValue);
  var digitalRoot = positiveDigitSum(digitSum, true);

  var divider = [];
  for (var i = new Decimal(1); i.lte(number); i = i.add(1)) {
    if (number.mod(i).eq(0)) {
      divider.push(i);
    }
  }

  if (numberSign === sign.NEGATIVE) {
    digitSum.mul(-1);
    digits.sub(1);
  }

  var tangent = number.tan();

  var fibonacciNumberIndexes = getFibonacciNumberIndexes(number);
  var catalanNumberIndexes = getCatalanNumberIndexes(number);

  return {
    number: number,
    previosNumber: number.sub(1),
    nextNumber: number.add(1),
    sign: numberSign,
    additiveInverse: number.neg(),
    absoluteValue: absoluteValue,
    parity: number.mod(2).eq(0) ? parity.EVAN : parity.ODD,
    squareNumber: number.pow(2),
    cube: number.pow(3),
    squareRoot: number.sqrt(),
    cubeRoot: number.cbrt(),
    base2: number.toBinary(),
    base8: number.toOctal(),
    base16: number.toHex(),
    digitSum: digitSum,
    digitalRoot: digitalRoot,
    digits: digits,
    reciprocal: new Decimal(1).div(number),
    sine: number.sin(),
    cosine: number.cos(),
    tangent: tangent,
    cotangent: new Decimal(1).div(tangent),
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
  var result = new Decimal(0);
  for (var i = 0; i < string.length; i++) {
    result = result.add(string[i]);
  }
  if (!singleDigit || result.lte(9)) {
    return result;
  } else {
    return positiveDigitSum(result, true);
  }
}

function getFibonacciNumberIndexes(number) {
  if (number.eq(0)) {
    return [new Decimal(1)];
  } else if (number.eq(1)) {
    return [new Decimal(2), new Decimal(3)];
  } else {
    var a = new Decimal(1);
    var b = new Decimal(1);
    var c = new Decimal(2);
    var index = new Decimal(4);
    while (c.lt(number)) {
      a = b;
      b = c;
      c = a.add(b);
      index = index.add(1);
    }
    return c.eq(number) ? [index] : [];
  }
}

function getCatalanNumberIndexes(number) {
  if (number.eq(1)) {
    return [new Decimal(0), new Decimal(1)];
  }
  var a = new Decimal(2);
  var index = new Decimal(2);
  while (a.lt(number)) {
    index = index.add(1);
    a = getCatalanNumber(index);
  }
  return (number.eq(a)) ? [index] : [];
}

function getCatalanNumber(n) {
  if (n.eq(0)) {
    return new Decimal(1);
  }
  return new Decimal(1).div(n.add(1)).mul(getBinomialCoefficient(n.mul(2), n));
}

function getFactorial(number) {
  if (number.eq(1) || number.eq(0)) {
    return new Decimal(1);
  }
  return number.mul(getFactorial(number.sub(1)));
}

function getBinomialCoefficient(n, k) {
  return getFactorial(n).div(getFactorial(k).mul(getFactorial(n.sub(k))));
}
