const https = require('https');

class Service {
  makeRequest(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        response.on('data', (data) => resolve(JSON.parse(data)));
        response.on('error', reject);
      });
    });
  }
}

(async () => {
  response = await new Service().makeRequest(
    'https://swapi.dev/api/planets/2/'
  );
  console.log(JSON.stringify(response));
})();

module.exports = Service;
