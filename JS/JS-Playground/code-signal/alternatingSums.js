const array = [200, 300, 400, 500]

function alternatingSums(a) {
    let oddTotal = 0;
    let evenTotal = 0;
    a.map((value, index) => {
        if(index % 2 === 0) {
            oddTotal = oddTotal + value;
        } else {
            evenTotal = evenTotal + value;
        }
    });
    return [oddTotal, evenTotal];
}

console.log(alternatingSums(array));
