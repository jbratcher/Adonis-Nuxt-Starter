const querystring = require("querystring");

let string =
  "97d40ac0ce62e9f2657bd84befb405bdcj1u6jL/qQTAGIOeGLOCbgGUe548gl0RfiLx+Tn3UCs=";

console.log("Encode: ", querystring.encode(string));
console.log("Decode: ", querystring.decode(string));
console.log("Escape: ", querystring.escape(string));
console.log("Stringify: ", querystring.stringify(string));

console.log("escaped: ", Object.keys(querystring.decode(string))[0]);

console.log("encoded: ", encodeURI(string));
console.log("encoded component: ", encodeURIComponent(string));
console.log("decoded: ", decodeURI(encodeURI(string)));
console.log("decoded component: ", decodeURIComponent(encodeURI(string)));
