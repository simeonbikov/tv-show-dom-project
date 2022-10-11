// const string1 = "abcddd";
// const string2 = "Abc";
// const areEqual = string1.localeCompare(string2, undefined, {
//   sensitivity: "base",
// });
// console.log(areEqual);


// input.on("input", function () {
//   var val = $(this).text().toLowerCase();
//   listItems.each(function () {
//     var text = $(this).text().toLowerCase();
//     $(this).toggle(text.indexOf(val) != -1);
//   });
// });

//     if (episodeName[i].innerText.toLowerCase().includes(input.toLowerCase())
// ||
//       summary[i].innerText.toLowerCase().includes(input.toLowerCase())) {
//       episodeBoxes[i].classList.remove("is-hidden");
      
    //   highlighter(episodeName[i], input);


// function sameCase(str) {
//     return /^[A-Z]+$/.test(str) || /^[a-z]+$/.test(str);
// }
// console.log(sameCase("GeojG BggA"));



// var haystack = "A. BAIL. Of. Hay.";
// var needle = "bail.";
// var needleRegExp = new RegExp(needle.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i");
// var result = needleRegExp.test(haystack);

// console.log(result);
// if (result) {
//     // Your code here
// }


var querystr = "ca";
var result = "Calculator";
var reg = new RegExp(querystr, "gi");
var final_str =
  "foo " +
  result.replace(reg, function (str) {
    return "<b>" + str + "</b>";
  });
$("#id").html(final_str);