const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const search = req.url ;
    if(search === '/') {
        res.writeHead(200, {'content-type': 'text/html'});
        res.write('<h1>This is the Home Page</h1>')
        res.end();
    }

    if(search === '/products') {
        res.writeHead(200, {'content-type': 'text/html'});
        res.write('<h3>This is products Page</h3>');
        res.end();
    }

    if(search === '/help') {
        res.writeHead(200, {'content-type': 'text/html'});
        res.write('<h4>This is Help Page</h4>');
        res.end();
    }

    if(search === '/convert') {
        let filePath = path.join(__dirname, '..', 'public', 'sample.txt')
        let fileData = fs.readFileSync(filePath).toString();
        const data = fileData.replace(/ajay/g, 'vijay').toUpperCase().trim();
        fs.writeFile(filePath, data, (err) => {
            if(err) console.log(err);
        })
        res.end(); 
        
    }
})

server.listen(4000); 