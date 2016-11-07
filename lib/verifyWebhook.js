const getenv = require('getenv')
const {ForbiddenError} = require('restify')
const {createLog} = require('./log')

const log = createLog('webhook')

const verifyWebhook = (req, res, next) => {
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === getenv('WEBHOOK_VERIFICATION_TOKEN')) {
    const challenge = req.query['hub.challenge']
    log.info(log.WEBHOOK_VERIFY_SUCCESS, {
      challenge
    })
    res.end(challenge)
    return next()
  }
  log.error(log.WEBHOOK_VERIFY_ERROR, req.query)
  return next(new ForbiddenError('Failed to verify webhook'))
}

module.exports = verifyWebhook
