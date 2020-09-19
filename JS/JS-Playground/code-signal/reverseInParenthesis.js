/** @format */
// This is still pending

const inputString = "abc((ghi((mno((stu((xyz)wv))rqp))lkj))fed)((abcd))";

const reverseString = (inputString) => {
  const position1 = inputString.lastIndexOf("(");
  const position2 = inputString.indexOf(")");
  const position3 = inputString.indexOf("(");

  if(inputString.length === 1) return ''

  if (position1 === -1 || position2 === -1) {
    return inputString;
  }

  //   Variable Declarations
  let inputString1 = inputString.slice(position1, position2 + 1);
  let inputString2;
  let inputString3;
  let inputString4 = inputString.slice(position3, position2 + 1);

  // If condition to check the brackets
  if (inputString1 !== "") {
    inputString2 = inputString1.split("").reverse().join("").replace("(", "").replace(")", "");
    inputString3 = inputString.replace(inputString1, inputString2);
    if (inputString3.indexOf("(") === -1) return inputString3;
  } else {
    inputString2 = inputString4.split("").reverse().join("").replace("(", "").replace(")", "");
    inputString3 = inputString.replace(inputString4, inputString2);
  }

  if (inputString3.indexOf("(") !== -1) {
    return reverseString(inputString3);
  }
};
console.log(reverseString(inputString));


// Input:
// inputString: "abc((ghi((mno((stu((xyz)wv))rqp))lkj))fed)((abcd))"
// Output:
// "abczyxvwutspqrghijklonmdefabcd"
// Expected Output:
// "abcdefghijklmnopqrstuvwxyzabcd"