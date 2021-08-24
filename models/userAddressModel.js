module.exports = (sequelizeConnection, Sequelize) => {
  const UserAddress = sequelizeConnection.define('userAddress', {
    street: {
      type: Sequelize.STRING(100)
    },
    city: {
      type: Sequelize.STRING(100)
    },
    province: {
      type: Sequelize.STRING(100)
    },

  })

  return UserAddress
}