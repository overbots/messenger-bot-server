const getenv = require('getenv')
const {createLog} = require('./log')
const {createBot} = require('./bot')
const {createChat} = require('./chat')

const log = createLog('botRegistry')
const botEntryByPageId = {}

getenv('MESSENGER_BOTS').split(',').forEach((botId) => {
  const bot = createBot(botId)
  const chat = createChat(botId)
  botEntryByPageId[chat.botInfo.pageId] = {
    bot,
    chat
  }
  log.info(log.BOT_REGISTERED, {
    botId
  })
})

const botRegistry = {
  findByPageId: (pageId) => {
    const botEntry = botEntryByPageId[pageId]
    if (!botEntry) {
      log.warn(log.BOT_NOT_FOUND, {
        pageId
      })
    }
    return botEntry
  }
}

module.exports = botRegistry
