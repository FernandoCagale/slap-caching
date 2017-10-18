const Sequelize = require('sequelize');

module.exports = function () {
  return [{
    register: require('good'),
    options: {
      ops: {
        interval: 1000
      },
      reporters: {
        myConsoleReporter: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*' }]
        }, {
          module: 'good-console'
        }, 'stdout']
      }
    }
  }, {
    register: require('hapi-sequelize'),
    options: [
      {
        name: 'slap',
        models: ['./models/*.js'],
        sequelize: new Sequelize('slap', 'dbuser', 'dbuser', {
          host: '127.0.0.1',
          port: 5434,
          dialect: 'postgres',
          operatorsAliases: Sequelize.Op,
          logging: false
        }),
        sync: true,
        forceSync: false
      }
    ]
  }, {
    register: require('hapi-slap'),
    options: {
      // url: 'redis://127.0.0.1:6379/0',
      // expireIn: 300
    }    
  }, {
    register: require('hapi-boom-decorators')
  }];
};
