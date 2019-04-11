const fs = require('fs');
const path = require('path');
const urlHTTP = require('url');
const querystring = require('querystring');
const selectQueries = require('../database/queries/readdata.js');


const handleServer500 = (res, err) => {
  res.writeHead(500, {
    "content-Type": 'text/html'
  })
  res.end("error 500" + err) // TODO : Add erro 500 page
}

const handleHome = (request, response, url) => {
  let filePath = path.join(__dirname, "..", "public", "index.html")

  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      response.end("500 server error");
    } else {
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      response.end(file);
    }
  })
}

const handlePublic = (response, url) => {
  let filePath = path.join(__dirname, "..", "public", url);
  let extension = url.split('.')[1];
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon'
  }
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, {
        'Content-Type': 'text/html'
      })
      response.end('500 server error');
    } else response.writeHead(200, {
      'Content-Type': extensionType[extension]
    })
    response.end(file);
  })
}

const handleSearch = (response, url) => {
  const query = querystring.parse(urlHTTP.parse(url).query);
  let placename = query.place;
  let placecity = query.city;

  selectQueries.getPlacesByName(`%${placename}%`, (err, placeresults) => {
    if (err) {
      handleServer500(response, err);
    }
    // console.log(placeresults);
    selectQueries.getAddressByID(placeresults[0].address_id, (err, addressresults) => {
      if (err) {
        handleServer500(response, err);
      }

      let results = {
        'id': placeresults[0].id,
        'name': placeresults[0].name,
        'city': addressresults[0].city,
        'street': addressresults[0].street,
        'googlemap': addressresults[0].googlemap,
        'rating': placeresults[0].rating
      };
      response.writeHead(200, {
        'content-type': 'application/json'
      });
      response.end(JSON.stringify(results));
    });
  })
}

const handleTopRated = (response, url) => {
  const query = querystring.parse(urlHTTP.parse(url).query);
  let num = query.limit;
  // let arr;
  selectQueries.getTopPlaces(num, (err, placeresults) => {
    if (err) {
      handleServer500(response, err);
    }

     let arr = placeresults.reduce((acc, current) => {
        selectQueries.getAddressByID(current.address_id, (err, addressresults) => {
          if (err) {
            handleServer500(response, err);
          }
          // console.log("curent ",current);
          // console.log("acc",acc);
          let obj = {
            'id': current.id,
            'name': current.name,
            'city': addressresults[0].city,
            'street': addressresults[0].street,
            'googlemap': addressresults[0].googlemap,
            'rating': current.rating
          }
          acc.push(obj);
        });
        return acc;
      },
      [])
      setTimeout(()=>{
        response.writeHead(200, {
          'content-type': 'application/json'
        });
        // console.log(JSON.stringify(arr));
        response.end(JSON.stringify(arr));
      },700);
  })

}

module.exports = {
  handleHome,
  handlePublic,
  handleSearch,
  handleTopRated
};
