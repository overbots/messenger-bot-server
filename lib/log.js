const bunyan = require('bunyan')

const wrapLog = (logger, level) => (event, details) => {
  if (!event || !event.length) {
    throw new Error('Invalid logging event')
  }
  if (details instanceof Error) {
    return logger[level](details, event)
  }
  return logger[level]({
    details
  }, event)
}

const createLog = (name) => {
  const logger = bunyan.createLogger({
    name
  })
  const log = {
    trace: wrapLog(logger, 'trace'),
    debug: wrapLog(logger, 'debug'),
    info: wrapLog(logger, 'info'),
    warn: wrapLog(logger, 'warn'),
    error: wrapLog(logger, 'error'),
    fatal: wrapLog(logger, 'fatal'),
    BOT_REGISTERED: '',
    BOT_NOT_FOUND: '',
    SERVER_STARTED: '',
    SERVER_STOPPED: '',
    WEBHOOK_VERIFY_SUCCESS: '',
    WEBHOOK_VERIFY_ERROR: '',
    WEBHOOK_UNHANDLED_OBJECT_TYPE: '',
    WEBHOOK_UNHANDLED_PAGE_EVENT: '',
    WEBHOOK_HANDLE_ERROR: '',
    SIGNATURE_NOT_MATCHED: '',
    SEND_SUCCESS: '',
    SEND_ERROR: '',
    MESSAGE_RECEIVED: '',
    MESSAGE_READ: '',
    POSTBACK_RECEIVED: '',
    OPTIN_RECEIVED: ''
  }
  Object.keys(log).forEach((key) => {
    if (typeof log[key] === 'string' && !log[key].length) {
      log[key] = key
    }
  })
  return log
}

module.exports = {
  createLog
}
