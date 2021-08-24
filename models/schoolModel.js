module.exports = (sequelizeConnection, Sequelize) => {
  const School = sequelizeConnection.define('school', {
    name: {
      type: Sequelize.STRING(100)
    },
    address: {
      type: Sequelize.STRING(100)
    },
  })

  return School
}