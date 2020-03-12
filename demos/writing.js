const fs = require('fs');

const data = {
    name: 'Sunkanmi'
}

fs.writeFile('dummy-data.json', JSON.stringify(data), (err) => {
    console.log("Writing finished.", err);
});
