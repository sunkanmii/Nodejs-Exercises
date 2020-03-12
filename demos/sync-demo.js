const fs = require('fs');
const data = require('./data.json');

console.log(data.name);

fs.readFile('./data.json', 'utf-8', (err, data) =>{
    data = JSON.parse(data);
    console.log(data.name);
})

fs.readdir('c:/', (err, data) => {
    console.log(data);
})