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

var browserLanguage = navigator.language || navigator.userLanguage;
// var browserLanguage = "en";

var lang = langEn;
if (browserLanguage.startsWith("de")) {
  lang = langDe;
}

if (lang.number) {
  $("#number")[0].placeholder = lang.enterANumber;
  $("#submit").text(lang.submit);

  $("#number-key").text(lang.number);
  $("#previos-number-key").text(lang.previosNumber);
  $("#next-number-key").text(lang.nextNumber);
  $("#digits-key").text(lang.digits);
  $("#sign-key").text(lang.sign);
  $("#parity-key").text(lang.parity);
  $("#absolute-value-key").text(lang.absoluteValue);
  $("#additive-inverse-key").text(lang.additiveInverse);
  $("#digit-sum-key").text(lang.digitSum);
  $("#digital-root-key").text(lang.digitalRoot);
  $("#reciprocal-key").text(lang.reciprocal);
  $("#square-number-key").text(lang.squareNumber);
  $("#cube-key").text(lang.cube);
  $("#square-root-key").text(lang.squareRoot);
  $("#cube-root-key").text(lang.cubeRoot);
  $("#base-2-key").text(lang.base2);
  $("#base-8-key").text(lang.base8);
  $("#base-16-key").text(lang.base16);
  $("#sinus-key").text(lang.sinus);
  $("#cosinus-key").text(lang.cosinus);
  $("#tangens-key").text(lang.tangens);
  $("#cotangens-key").text(lang.cotangens);
  $("#divider-key").text(lang.divider);
  $("#prime-key").text(lang.prime);
  $("#fibonacci-number-key").text(lang.fibonacciNumber);
  $("#catalan-number-key").text(lang.catalanNumber);
}

var number = parseInt(findGetParameter("n"));
if (isFinite(number)) {
  var info = getInformation(number);

  $("#number-val").html(getNumberLink(info.number));
  $("#previos-number-val").html(getNumberLink(info.previosNumber));
  $("#next-number-val").html(getNumberLink(info.nextNumber));
  $("#digits-val").html(getNumberLink(info.digits));
  $("#sign-val").html(getNumberLink(info.sign.string));
  $("#parity-val").html(info.parity === parity.EVAN ? lang.parityEvan : lang.parityOdd);
  $("#absolute-value-val").html(getNumberLink(info.absoluteValue));
  $("#additive-inverse-val").html(getNumberLink(info.additiveInverse));
  $("#digit-sum-val").html(getNumberLink(info.digitSum));
  $("#digital-root-val").html(getNumberLink(info.digitalRoot));
  $("#reciprocal-val").html(getNumberLink(info.reciprocal));
  $("#square-number-val").html(getNumberLink(info.squareNumber));
  $("#cube-val").html(getNumberLink(info.cube));
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
  $("#prime-val").html(info.isPrime ? lang.yes : lang.no);
  $("#fibonacci-number-val").html(getIsWithNumbers(info.isFibonacciNumber, info.fibonacciNumberIndexes));
  $("#catalan-number-val").html(getIsWithNumbers(info.isCatalanNumber, info.catalanNumberIndexes));

  $("#information").removeClass("d-none");
} else {
  $("#information").addClass("d-none");
}

function getIsWithNumbers(is, numbers) {
  return is ? lang.yes + " (" + getLinkedNumerList(numbers) + ")" : lang.no;
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
