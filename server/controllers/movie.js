const DB = require('../utils/db.js')
module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM movies;")
    console.log(ctx.state.data)
  },

  detail: async ctx => {
    movieId = + ctx.params.id

    if (!isNaN(movieId)) {
      ctx.state.data = (await DB.query('select * from movies where movies.id = ?', [movieId]))[0]
    } else {
      ctx.state.data = {}
    }
  } 
}