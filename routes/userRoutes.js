const router = require('express').Router()
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')
const db = require('../sequlizeconfig')
const User = db.user
const School = db.school
const UserAddress = db.userAddress
const Op = db.Sequelize.Op

const middleware = (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.header('Authorization'), '123')
    req.body.user = decodedToken
    next()
  } catch (error) {
    return res.json({
      message: error.message
    })
  }

}


router.post('/login', async (req, res) => {
  console.log(dayjs().add(2, 'minutes').unix());
  const user = await User.findOne({
    where: {
      email: req.body.email,
      name: req.body.name
    }
  })
  if (user) {
    const tokenData = {
      ...user.dataValues,
      exp: dayjs().add(2, 'minutes').unix()
    }
    const token = jwt.sign(tokenData, '123')
    return res.json({
      user: user,
      token: token,
      message: 'login success'
    })
  }
  return res.json({
    message: 'login failed'
  })

})

router.post('/user', middleware, async (req, res) => {
  const user = await User.create({
    email: req.body.email,
    name: req.body.name
  })

  return res.json({
    user: user,
    message: 'success created'
  })
})

router.get('/user', middleware, async (req, res) => {

  let myuser = await db.sequelizeConnection.query("select * from users", { type: sequelize.QueryTypes.SELECT });

  myuser = myuser.map(item => {
    return {
      ...item,
      firstName: 'hahaha'
    }
  })

  const user = await User.findAll({
    where: {
      email: {
        [Op.like]: 'e%'
      }
    },
    include: [{
      model: UserAddress,
      as: 'userAddress',
      include: ['userAddressChild']
    },
    {
      model: School,
      through: { attributes: [] }
    },
      'userWallet']
  })
  return res.json({
    user: user
  })
})

router.get('/user-address', async (req, res) => {
  const address = await UserAddress.findAll({
    include: ['user']
  })
  return res.json({
    addresses: address
  })
})
module.exports = router