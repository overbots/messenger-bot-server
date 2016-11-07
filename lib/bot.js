const getenv = require('getenv')
const path = require('path')

const rootPath = process.cwd()

const baseBot = {
  getHandler: (event, bot) => {
    // https://developers.facebook.com/docs/messenger-platform/webhook-reference
    if (event.message) {
      if (!event.message.is_echo) {
        return bot.messageReceived
      }
    }
    if (event.read) {
      return bot.messageRead
    }
    if (event.postback) {
      return bot.postbackReceived
    }
    if (event.optin) {
      return bot.optinReceived
    }
    return null
  },
  messageReceived: (event, chat) => {
    // https://developers.facebook.com/docs/messenger-platform/webhook-reference/message
    const {message} = event
    const {log} = chat
    log.info(log.MESSAGE_RECEIVED, message)
  },
  messageRead: (event, chat) => {
    // https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-read
    const {read} = event
    const {log} = chat
    log.info(log.MESSAGE_READ, read)
  },
  postbackReceived: (event, chat) => {
    // https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback
    const {postback} = event
    const {log} = chat
    log.info(log.POSTBACK_RECEIVED, postback)
  },
  optinReceived: (event, chat) => {
    // https://developers.facebook.com/docs/messenger-platform/webhook-reference/optins
    const {optin} = event
    const {log} = chat
    log.info(log.OPTIN_RECEIVED, optin)
  }
}

const createBot = (botId) => {
  const bot = Object.assign({
    base: baseBot
  }, baseBot)
  const modulePath = getenv(`${botId}_MODULE_PATH`)
  if (modulePath) {
    const botOverrides = require(modulePath.indexOf('.') === 0 ? path.join(rootPath, modulePath) : modulePath)
    Object.assign(bot, botOverrides)
  }
  return bot
}

module.exports = {
  createBot
}
