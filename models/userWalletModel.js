module.exports = (sequelizeConnection, Sequelize) => {
  const UserWallet = sequelizeConnection.define('userWallet', {
    balance: {
      type: Sequelize.INTEGER()
    },


  })

  return UserWallet
}