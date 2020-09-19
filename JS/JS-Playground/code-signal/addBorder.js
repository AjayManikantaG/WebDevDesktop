/** @format */

let picture = ["a"];

function addBorder(picture) {
  let frameLength = picture[0].length + 2;
  let borderAster = '';

// creating top and down border
  while(true) {
    borderAster = borderAster + '*';
    if(borderAster.length === frameLength) break;
  }

  const picture1 = picture.map((string, index) => string = '*' + string + '*');
  picture1.unshift(borderAster);
  picture1.push(borderAster);
  return picture1;
}


console.log(addBorder(picture));
