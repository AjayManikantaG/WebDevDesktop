/** @format */

let a = [1, 4, 2, 5, 3, 7, 4, 8, 4, 2, 25];
let b = [1, 4, 2, 5, 3, 3, 7, 8, 4, 2, 25];

// a =  [2, 1, 2, 1, 1, 1, 2]
// b = [1, 1, 2, 1, 2, 1, 2]

a = [1, 2, 3, 4];
b = [4, 2, 3, 1];

// function areSimilar(a, b) {
//   if (a.length !== b.length) return false;
//   if (JSON.stringify(a) == JSON.stringify(b)) return true;

//   let c = [...b];
//   let val1;
//   let val2;

//   for (let i = 0; i < b.length - 1; i++) {
//     for (let j = 0; j < c.length - 1; j++) {
//       val1 = b[i];
//       val2 = b[j + 1];
//       c[i] = val2;
//       c[j + 1] = val1;

//       if (JSON.stringify(a) == JSON.stringify(c)) return true;
//       else c = [...b];
//     }
//   }
//   return false;
// }

function areSimilar(a, b) {
    let diffIndex = [];
    
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            diffIndex.push(i);
        }
    }
    
    if (diffIndex.length === 1 || diffIndex.length > 2) {
        return false;
    } else if (a[diffIndex[0]] === b[diffIndex[1]] && b[diffIndex[0]] === a[diffIndex[1]]) {
        return true;
    } else {
        return false;
    }
    }

console.log(areSimilar(a, b));
