module.exports = (sequelizeConnection, Sequelize) => {
  const UserAddressChild = sequelizeConnection.define('userAddressChild', {
    country: {
      type: Sequelize.STRING(100)
    },
   

  })

  return UserAddressChild
}