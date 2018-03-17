const db = require('../db')

module.exports.findById = async (id) => {
  let user = await db.OAuth.findOne({
    where: { id },
    include: { model: db.User }
  })
  if (user) {
    let result = user.dataValues
    result.user = user.dataValues.user.dataValues
    return result
  }
}

module.exports.findByUserId = async (userId) => {
  let user = await db.OAuth.findOne({
    where: { userId },
    include: { model: db.User }
  })
  if (user) {
    let result = user.dataValues
    result.user = user.dataValues.user.dataValues
    return result
  }
}

module.exports.findByOauth = async (oauthId, vendor) => {
  let user = await db.OAuth.findOne({
    where: { oauthId, vendor },
    include: { model: db.User }
  })
  if (user) {
    let result = user.dataValues
    result.user = user.dataValues.user.dataValues
    return result
  }
}
