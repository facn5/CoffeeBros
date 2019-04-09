const fs = require('fs');
const path = require('path');

const handleHome = (request, response, url) => {
  let filePath = path.join(__dirname, "..", "public", "index.html")

  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.end("500 server error");
    } else {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(file);
    }
  })
}

module.exports = {handleHome};
