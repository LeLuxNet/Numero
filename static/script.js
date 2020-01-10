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

function darkMode(is) {
  if (is) {
    $(".table").addClass("table-dark");
  } else {
    $(".table").removeClass("table-dark");
  }
}

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  darkMode(true);
}

window.matchMedia("(prefers-color-scheme: dark)").addListener(e => e.matches && darkMode(true));
window.matchMedia("(prefers-color-scheme: light)").addListener(e => e.matches && darkMode(false));

function getIsWithNumbers(is, numbers) {
  return is ? lang.yes + " (" + getLinkedNumerList(numbers) + ")" : lang.no;
}

function getLinkedNumerList(numbers) {
  return numbers.map(index => getNumberLink(index)).join(", ");
}

function getNumberLink(number) {
  if (isFinite(number)) {
    var parts = number.toString().split(".");
    return "<a href='javascript:run(false, " + parts[0] + ")'>" + parts[0] + "</a>" +
      (parts.length > 1 ? "." + parts[1] : "");
  } else {
    return number;
  }
}

function isNumber(number) {
  try {
    new Decimal(number);
    return true;
  } catch {
    return false;
  }
}

function run(load, number) {
  var number;
  if (load) {
    number = findGetParameter("n");
  } else {
    if (!number) {
      number = $("#number").val();
      $("#number").val("");
    }
    history.pushState("", "", "?n=" + number);
  }
  if (isNumber(number)) {
    var info = getInformation(number);
    console.log(info);

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
    $("#factorial-val").html(getNumberLink(info.factorial));
    $("#base-2-val").html(info.base2);
    $("#base-8-val").html(info.base8);
    $("#base-16-val").html(info.base16);
    $("#sine-val").html(getNumberLink(info.sine));
    $("#cosine-val").html(getNumberLink(info.cosine));
    $("#tangent-val").html(getNumberLink(info.tangent));
    $("#cotangent-val").html(getNumberLink(info.cotangent));
    $("#divider-val").html(getLinkedNumerList(info.divider));
    $("#prime-val").html(info.isPrime ? lang.yes : lang.no);
    $("#fibonacci-number-val").html(getIsWithNumbers(info.isFibonacciNumber, info.fibonacciNumberIndexes));
    $("#catalan-number-val").html(getIsWithNumbers(info.isCatalanNumber, info.catalanNumberIndexes));

    $("#information").removeClass("d-none");
  } else {
    $("#information").addClass("d-none");
  }
}
run(true);
