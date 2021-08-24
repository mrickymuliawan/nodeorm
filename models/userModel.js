module.exports = (sequelizeConnection, Sequelize) => {
  const User = sequelizeConnection.define('user', {
    email: {
      type: Sequelize.STRING(100)
    },
    name: {
      type: Sequelize.STRING(100),
      get() {
        const value = this.getDataValue('name');
        return value ? value.toUpperCase() : null;
      },
      set(value) {
        this.setDataValue('name', value + '12345')
      }
    },

  })

  return User
}