const getenv = require('getenv')
const {createLog} = require('./log')
const {createSendHelper} = require('./sendHelper')
const templateHelper = require('./templateHelper')

const createChat = (botId) => {
  const accessToken = getenv(`${botId}_ACCESS_TOKEN`)
  const botInfo = {
    id: botId,
    pageId: getenv(`${botId}_PAGE_ID`)
  }
  const log = createLog(`BOT ${botId}`)
  const sendHelper = createSendHelper({
    accessToken,
    log
  })
  const chat = {
    botInfo,
    log
  }
  Object.assign(chat, sendHelper, {
    template: templateHelper
  })
  return chat
}

module.exports = {
  createChat
}
