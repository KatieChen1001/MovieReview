const DB = require('../utils/db.js')
module.exports = {
  
  list: async ctx => {
    let movie_id = ctx.params.id
    ctx.state.data = await DB.query('SELECT * FROM comment where comment.movie_id = ?', movie_id)
  },

  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let useravatar = ctx.state.$wxInfo.userinfo.avatarUrl
    
    let movie_id = ctx.request.body.movie_id
    let content = ctx.request.body.content || null
    let type = ctx.request.body.type
    await DB.query('INSERT INTO comment(user, username, useravatar, content, movie_id, type) VALUES (?, ?, ?, ?, ?, ?)', [user, username, useravatar, content, movie_id, type])
  }
}