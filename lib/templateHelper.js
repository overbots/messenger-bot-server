// https://developers.facebook.com/docs/messenger-platform/send-api-reference/buttons
const templateHelper = {
  url: (url, title, options) => Object.assign({
    type: 'web_url',
    url,
    title
  }, options),
  postback: (payload, title, options) => Object.assign({
    type: 'postback',
    payload,
    title
  }, options),
  element: (itemUrl, imageUrl, title, subtitle, buttons) => ({
    title,
    subtitle,
    buttons,
    item_url: itemUrl,
    image_url: imageUrl
  }),
  quickReply: (payload, title, imageUrl, options) => Object.assign({
    content_type: 'text',
    payload,
    title,
    image_url: imageUrl
  }, options)
}

module.exports = templateHelper
