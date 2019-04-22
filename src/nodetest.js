const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('./films.json')
});

rl.on('line', (line) => {
  const arr = line.split(' '); 
  console.log(arr);
});

