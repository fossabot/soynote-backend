const db = require('../db')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const UUIDGen = require('./UUIDGen')

module.exports.findById = async (id) => {
  let user = db.User.findOne({
    where: { id }
  })
  return (!!user) && user.dataValues
}

module.exports.findByEmail = async (email) => {
  let user = await db.User.findOne({
    where: { email }
  })
  return (!!user) && user.dataValues
}

module.exports.findByNick = async (nickname) => {
  let user = await db.User.findOne({
    where: { nickname }
  })
  return (!!user) && user.dataValues
}

module.exports.register = async ({email, password, nickname}) => {
  const createPassword = require('./User').createPassword
  let {uuid, genPassword} = await Promise.all([
    UUIDGen(async (result) => {
      const findById = require('./User').findById
      let find = await findById(result)
      return !find
    }),
    createPassword(password)
  ])
  await db.User.create({
    uuid,
    email,
    genPassword,
    nickname
  })
  return true
}

module.exports.createPassword = async (password) => {
  const sha256Password = crypto.createHash('sha256').update(password).digest('hex')
  const bcryptPassword = await bcrypt.hash(sha256Password, 12)
  return bcryptPassword
}

module.exports.comparePassword = async (plaintextPassword, hashedPassword) => {
  const sha256Password = crypto.createHash('sha256').update(plaintextPassword).digest('hex')
  const compare = await bcrypt.compare(sha256Password, hashedPassword)
  return compare
}
