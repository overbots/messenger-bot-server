const request = require('request')

const GRAPH_API_VERSION = '2.8'
const GRAPH_API_BASE_URL = `https://graph.facebook.com/v${GRAPH_API_VERSION}`
const SEND_API_URL = `${GRAPH_API_BASE_URL}/me/messages`

const apiRequest = (method, url, query, data, logError, logSuccess) => {
  return new Promise((resolve, reject) => {
    request({
      method,
      url,
      qs: query,
      json: data
    }, (err, res, body) => {
      if (err) {
        if (logError) {
          logError(err)
        }
        reject(err)
        return
      }
      if (res.statusCode !== 200) {
        if (logError) {
          logError({
            statusCode: res.statusCode,
            req: data,
            res: body
          })
        }
        reject(body)
        return
      }
      if (logSuccess) {
        logSuccess({
          req: data,
          res: body
        })
      }
      resolve(body)
    })
  })
}

const apiGet = apiRequest.bind(null, 'GET')
const apiPost = apiRequest.bind(null, 'POST')

module.exports = {
  apiGet,
  apiPost,
  SEND_API_URL
}
