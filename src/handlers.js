const fs = require('fs');
const path = require('path');
const urlHTTP = require('url');
const querystring = require('querystring');
const selectQueries = require('../database/queries/readdata.js');


const handleServer500 = (res, err) => {
  res.writeHead(500, {"content-Type":'text/html'})
  res.end("error 500" + err) // TODO : Add erro 500 page
}

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

const handlePublic = (response, url) => {
  let filePath = path.join(__dirname, "..", "public", url);
  let extension = url.split('.')[1];
  const extensionType ={
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon'
  }
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, {'Content-Type': 'text/html'})
      response.end('500 server error');
    } else response.writeHead(200, {'Content-Type': extensionType[extension]})
    response.end(file);
  })
}

const handleSearch = (response ,url) => {
  const query = querystring.parse(urlHTTP.parse(url).query);
  let placename = query.place;
  let placecity = query.city;
  selectQueries.getPlacesByName(`%${placename}%`,(err,results)=>{
    if(err){
      console.log("ERRORROR",err);
      handleServer500(response,err);
    }
    response.writeHead(200,{'content-type': 'application/json'});
    console.log(results);
    response.end(JSON.stringify(results));
  })
}


module.exports = {
  handleHome,
  handlePublic,
  handleSearch
};
