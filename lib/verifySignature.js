const crypto = require('crypto')
const getenv = require('getenv')
const {ForbiddenError} = require('restify')
const {createLog} = require('./log')

const log = createLog('signature')

const checkSignature = (body, signature) => {
  if (!signature) {
    return false
  }
  const parts = signature.split('=')
  const hash = crypto.createHmac(parts[0], getenv('WEBHOOK_APP_SECRET')).update(body).digest('hex')
  return parts[1] === hash
}

const verifySignature = (req, res, next) => {
  const signature = req.headers['x-hub-signature']
  const body = req.rawBody
  if (body && !checkSignature(body, signature)) {
    log.warn(log.SIGNATURE_NOT_MATCHED, signature)
    return next(new ForbiddenError('Failed to verify signature'))
  }
  return next()
}

module.exports = verifySignature
