const Hapi = require('hapi');

const handlers = require('./handler');
const plugins = require('./plugins');
const validators = require('./validator');

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 3000
});

server.route({
  method: 'GET',
  path: '/people',
  config: {
    plugins: {
      slap: {
        rule: 'people'
      }
    },
    handler: handlers.all,
    validate: validators.all()
  }
});

server.route({
  method: 'GET',
  path: '/people/{id}',
  config: {
    plugins: {
      slap: {
        rule: 'people-id',
        expireIn: 60
      }
    },
    handler: handlers.show,
    validate: validators.show()
  }
});

server.route({
  method: 'POST',
  path: '/people',
  config: {
    plugins: {
      slap: {
        clear: ['people', 'people-id']
      }
    },
    handler: handlers.create,
    validate: validators.create()
  }
});

server.route({
  method: 'PUT',
  path: '/people/{id}',
  config: {
    plugins: {
      slap: {
        clear: ['people', 'people-id']
      }
    },
    handler: handlers.update,
    validate: validators.update()
  }
});

server.route({
  method: 'DELETE',
  path: '/people/{id}',
  config: {
    plugins: {
      slap: {
        clear: ['people', 'people-id']
      }
    },
    handler: handlers.remove,
    validate: validators.remove()
  }
});

server.route({
  method: 'POST',
  path: '/add',
  config: {
    plugins: {
      slap: {
        clear: ['people', 'people-id']
      }
    },
    handler: handlers.add,
    validate: validators.add()
  }
});

server.register(plugins(), (err) => {
  if (err) {
    return console.error(err);
  }
  server.start(() => {
    console.info(`Server started at ${server.info.uri}`);
  });
});
