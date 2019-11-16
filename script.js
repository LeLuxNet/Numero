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
  $("#digits-val").html(getNumberLink(info.digits));
  $("#sign-val").html(info.sign === 0 ? getNumberLink(0) : info.signSymbol);

  $("#information").removeClass("d-none");
} else {
  $("#information").addClass("d-none");
}

function getNumberLink(number) {
  return "<a href='?n=" + number + "'>" + number + "</a>";
}
