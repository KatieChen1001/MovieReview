const DB = require('../utils/db.js')

module.exports = {

  list: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId

    const favComment = await DB.query('SELECT fav.comment_id, comment.id, comment.username, comment.useravatar, comment.content, comment.movie_id, comment.type, movies.title, movies.image FROM fav RIGHT JOIN comment ON comment_id = comment.id RIGHT JOIN movies ON comment.movie_id = movies.id WHERE fav.user = ?', [user])

    const myComment = await DB.query('SELECT comment.id, comment.username, comment.useravatar, comment.content, comment.movie_id, comment.type, movies.title, movies.image FROM comment RIGHT JOIN movies ON comment.movie_id = movies.id WHERE comment.user = ?', [user])

    ctx.state.data = { favComment, myComment }
  }

}