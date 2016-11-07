const {createLog} = require('./log')
const botRegistry = require('./botRegistry')

const log = createLog('webhook')

const processEvent = (event, botEntry) => {
  const {bot, chat} = botEntry
  const handler = bot.getHandler(event, bot)
  if (handler) {
    handler(event, chat, bot)
  } else {
    log.warn(log.WEBHOOK_UNHANDLED_PAGE_EVENT, {
      botInfo: chat.botInfo,
      event
    })
  }
}

const handleWebhook = (req, res, next) => {
  const data = req.body
  try {
    if (data.object === 'page') {
      data.entry.forEach((entry) => {
        const botEntry = botRegistry.findByPageId(entry.id)
        if (botEntry) {
          entry.messaging.forEach((event) => {
            processEvent(event, botEntry)
          })
        }
      })
    } else {
      log.warn(log.WEBHOOK_UNHANDLED_OBJECT_TYPE, data)
    }
  } catch (err) {
    log.error(log.WEBHOOK_HANDLE_ERROR, err)
  }
  res.send(200)
  return next()
}

module.exports = handleWebhook
