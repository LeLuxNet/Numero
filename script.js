function findGetParameter(parameterName) {
  var result = null,
    tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function(item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

var number = parseInt(findGetParameter("n"));
if (isFinite(number)) {
  var info = getInformation(number);

  $("#number-val").html(getNumberLink(info.number));
  $("#previos-number-val").html(getNumberLink(info.previosNumber));
  $("#next-number-val").html(getNumberLink(info.nextNumber));
  $("#digits-val").html(getNumberLink(info.digits));
  $("#sign-val").html(info.sign === 0 ? getNumberLink(0) : info.signSymbol);
  $("#absolute-value-val").html(getNumberLink(info.absoluteValue));
  $("#additive-inverse-val").html(getNumberLink(info.additiveInverse));
  $("#digit-sum-val").html(getNumberLink(info.digitSum));
  $("#digital-root-val").html(getNumberLink(info.digitalRoot));
  $("#reciprocal-val").html(getNumberLink(info.reciprocal));
  $("#square-root-val").html(getNumberLink(info.squareRoot));
  $("#cube-root-val").html(getNumberLink(info.cubeRoot));
  $("#base-2-val").html(getNumberLink(info.base2));
  $("#base-8-val").html(getNumberLink(info.base8));
  $("#base-16-val").html(getNumberLink(info.base16));
  $("#sinus-val").html(getNumberLink(info.sinus));
  $("#cosinus-val").html(getNumberLink(info.cosinus));
  $("#tangens-val").html(getNumberLink(info.tangens));
  $("#cotangens-val").html(getNumberLink(info.cotangens));
  $("#divider-val").html(getLinkedNumerList(info.divider));
  $("#prime-val").html(info.isPrime ? "Yes" : "No");
  $("#fibonacci-number-val").html(getIsWithNumbers(info.isFibonacciNumber, info.fibonacciNumberIndexes));
  $("#catalan-number-val").html(getIsWithNumbers(info.isCatalanNumber, info.catalanNumberIndexes));

  $("#information").removeClass("d-none");
} else {
  $("#information").addClass("d-none");
}

function getIsWithNumbers(is, numbers) {
  return is ? "Yes (" + getLinkedNumerList(numbers) + ")" : "No";
}

function getLinkedNumerList(numbers) {
  return numbers.map(index => getNumberLink(index)).join(", ");
}

function getNumberLink(number) {
  if (isFinite(number)) {
    var parts = number.toString().split(".");
    return "<a href='?n=" + parts[0] + "'>" + parts[0] + "</a>" +
      (parts.length > 1 ? "." + parts[1] : "");
  } else {
    return number;
  }
}
