const DB = require('../utils/db.js')

module.exports = {
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let review = ctx.request.body

    await DB.query('INSERT INTO fav(comment_id, user) VALUES (?, ?)', [review.commentId, user])
  }
}