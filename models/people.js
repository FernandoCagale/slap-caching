module.exports = (sequelize, DataType) => {
  const People = sequelize.define('People', {
    first_name: {
      type: DataType.STRING(120)
    },
    last_name: {
      type: DataType.STRING(120)
    },
    email: {
      type: DataType.STRING(120)
    },
    gender: {
      type: DataType.STRING(120)
    }
  }, {
    createdAt: 'created_at',
    updatedAt: 'update_at',
    tableName: 'people'
  });

  return People;
};
