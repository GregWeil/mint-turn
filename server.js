// server.js
// where your node app starts

// init project
const browserify = require('browserify');
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static('node_modules/two.js/build'));

// bundle up the client code and send it when it's ready
const client = new Promise((resolve, reject) => {
  browserify({
    entries: 'client.js',
    plugin: 'esmify',
    transform: require('browserify-global-shim').configure({ 'two.js': 'Two' }),
  }).bundle(
    (error, data) => {
      if (error) {
        console.error(error.toString());
        reject(error);
      } else {
        console.log('build complete');
        resolve(data);
      }
    }
  );
});
app.get('/client.js', async (request, response, next) => {
  response.set('Content-Type', 'application/javascript');
  try {
    response.send(await client);
  } catch (error) {
    response.status(500);
    response.end();
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
