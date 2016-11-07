const getenv = require('getenv')
const restify = require('restify')
const {queryParser, bodyParser, serveStatic} = require('restify-plugins')
const {createLog} = require('./log')
const {createRoutes} = require('./routes')
const verifySignature = require('./verifySignature')

const log = createLog('server')
const rootPath = process.cwd()

const server = restify.createServer({
  name: getenv('SERVER_NAME', 'messenger-bot-server')
})
server.use(queryParser())
server.use(bodyParser())
server.use(verifySignature)
createRoutes(server)

Object.assign(server, {
  start: () => {
    server.listen(getenv.int('SERVER_PORT', 3000), getenv('SERVER_HOST', 'localhost'), () => {
      log.info(log.SERVER_STARTED, {
        name: server.name,
        url: server.url
      })
    })
  },
  serveStatic: (publicPath) => {
    server.get(new RegExp(`/${publicPath}/?.*`), serveStatic({
      directory: rootPath
    }))
  }
})

module.exports = server
