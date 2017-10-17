const sequelizeFixtures = require('sequelize-fixtures');

module.exports = {
  create: create,
  update: update,
  show: show,
  all: all,
  remove: remove,
  add: add
};

async function create (request, reply) {
  try {
    const db = request.getDb('slap');

    request.clearCache();

    const value = await db.models.People.create(request.payload);

    return reply({id: value.id});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function update (request, reply) {
  try {
    const db = request.getDb('slap');
    const id = request.params.id;

    const value = await db.models.People.findOne({where: {id: id}});
    if (!value) {
      return reply.notFound();
    }

    await value.update(request.payload, {where: {id: id}});

    request.clearCache();

    return reply({id: id});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function show (request, reply) {
  try {
    const id = request.params.id;
    const cache = await request.getCache(id);

    if (cache) {
      return reply(cache);
    }

    const db = request.getDb('slap');

    const value = await db.models.People.findOne({where: {id: id}});
    if (!value) {
      return reply.notFound();
    }

    request.addCache(value, id);

    return reply(value);
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function all (request, reply) {
  try {
    const cache = await request.getCache();

    if (cache) {
      return reply(cache);
    }

    const db = request.getDb('slap');

    const where = request.query.gender ? {where: {gender: request.query.gender}} : {};

    const values = await db.models.People.findAll(where);

    request.addCache(values);

    return reply(values);
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function remove (request, reply) {
  try {
    const id = request.params.id;
    const db = request.getDb('slap');

    const value = await db.models.People.findOne({where: {id: id}});
    if (!value) {
      return reply.notFound();
    }

    request.clearCache();

    return reply({ok: true});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function add (request, reply) {
  try {
    request.clearCache();

    const db = request.getDb('slap');

    await sequelizeFixtures.loadFile('./fixtures/*.json', db.models);

    return reply({ok: true});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}
