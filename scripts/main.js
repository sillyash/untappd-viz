const filename = 'main.js'
const start = Date.now();
console.info(filename + " loaded.")

/* --------------------------------- */

console.log(`D3.js version %c${d3.version}`, "color:#a980c4; font-weight:bold;");

/* --------------------------------- */

const end = Date.now();
console.log(`Execution time: ${end - start} ms`);
