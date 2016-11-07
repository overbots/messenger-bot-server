const getenv = require('getenv')

const createRoutes = (server) => {
  const webhookPath = getenv('WEBHOOK_PATH', '/webhook')
  server.get(webhookPath, require('./verifyWebhook'))
  server.post(webhookPath, require('./handleWebhook'))
}

module.exports = {
  createRoutes
}
