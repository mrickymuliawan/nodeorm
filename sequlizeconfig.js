const Sequelize = require('sequelize')
const schoolModel = require('./models/schoolModel')
const userAddressChildModel = require('./models/userAddressChildModel')
const userAddressModel = require('./models/userAddressModel')
const userModel = require('./models/userModel')
const userWalletModel = require('./models/userWalletModel')
const sequelizeConnection = new Sequelize(
  'nodeorm',
  'root',
  'rootpassword',
  {
    dialect: 'mysql',
    host: 'localhost'
  }
)

const db = {}
db.Sequelize = Sequelize
db.sequelizeConnection = sequelizeConnection

db.user = userModel(sequelizeConnection, Sequelize)
db.userAddress = userAddressModel(sequelizeConnection, Sequelize)
db.userWallet = userWalletModel(sequelizeConnection, Sequelize)
db.userAddressChild = userAddressChildModel(sequelizeConnection, Sequelize)
db.school = schoolModel(sequelizeConnection, Sequelize)

db.user.hasMany(db.userAddress, { as: 'userAddress' })
db.userAddress.belongsTo(db.user, { as: 'user', foreignKey: 'userId' })

db.user.hasOne(db.userWallet)
db.userWallet.belongsTo(db.user)

db.userAddress.hasOne(db.userAddressChild)
db.userAddressChild.belongsTo(db.userAddress)

db.user.belongsToMany(db.school, { through: 'SchoolUser' })
db.school.belongsToMany(db.user, { through: 'SchoolUser' })

module.exports = db

