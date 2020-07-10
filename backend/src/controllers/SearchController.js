const connection = require('../config/database')
const byTopic = require('../utils/byTopic.js')
const newDate = require('../utils/newDate')

module.exports = {
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
