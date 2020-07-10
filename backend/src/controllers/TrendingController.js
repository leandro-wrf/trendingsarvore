const connection = require('../config/database')
const trending = require('../utils/trending')
const byTopic = require('../utils/byTopic.js')
const newDate = require('../utils/newDate')

module.exports = {
  async index(req, res) {
    const dateCurrent = newDate()
    const data =
      await connection('tweets')
        .where('created_at', '=', dateCurrent)
        .select('*')

    const topTrending = trending(data)

    const topTrendingSerialized = topTrending.map((trends) => {
      return {
        ...trends,
        select: 0
      }
    })

    return res.json(topTrendingSerialized)
  },

  async show(req, res) {
    const { topic } = req.params
    const dateCurrent = newDate()

    const tweets =
      await connection('tweets')
        .where('created_at', '=', dateCurrent)
        .select('*')

    const tweetByTopic = byTopic(tweets, topic)

    return res.json(tweetByTopic)
  }
}
