const http = require('http');

const CarService = require('../../05 - tdd-project-pt03/src/service/carService');

const DEFAULT_PORT = 3030;

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

const defaultFactory = () => ({
  carService: new CarService({ cars: './../database/cars.json' }),
});

class Api {
  constructor(dependencies = defaultFactory()) {
    this.carService = dependencies.carService;
  }

  generateRoutes() {
    return {
      default: (request, response) => {
        response.write(JSON.stringify({ sucess: 'Hello World!' }));
        return response.end();
      },
    };
  }

  handler(request, response) {
    const { url, method } = request;
    const routeKey = `${url}:${method.toLowerCase()}`;

    const routes = this.generateRoutes();
    const chosen = routes[routeKey] || routes.default;

    response.writeHead(200, DEFAULT_HEADERS);

    return chosen(request, response);
  }

  initialize(port = DEFAULT_PORT) {
    const app = http
      .createServer(this.handler.bind(this))
      .listen(port, () => console.log('app running at', this.generateRoutes));
  }
}

if (process.env.NODE_ENV !== 'test') {
  const api = new Api();
  api.initialize();
}

module.exports = (dependencies) => new Api(dependencies);
