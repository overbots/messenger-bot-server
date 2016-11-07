const {apiPost, SEND_API_URL} = require('./fbAPI')

const locationQuickReplies = [{content_type: 'location'}]

const createSendHelper = (options) => {
  const {accessToken, log} = options
  const logError = (err) => log.error(log.SEND_ERROR, err)
  const logSuccess = (result) => log.info(log.SEND_SUCCESS, result)
  // https://developers.facebook.com/docs/messenger-platform/send-api-reference
  const sendRaw = (data) => {
    return apiPost(SEND_API_URL, {
      access_token: accessToken
    }, data, logError, logSuccess)
  }
  const sendMessage = (recipientId, message) => sendRaw({
    recipient: {
      id: recipientId
    },
    message
  })
  const send = (recipientId, textMessage, quickReplies) => sendMessage(recipientId, {
    text: textMessage,
    quick_replies: quickReplies
  })

  const sendAttachment = (recipientId, url, type, quickReplies) => sendMessage(recipientId, {
    attachment: {
      type,
      payload: {
        url
      }
    },
    quick_replies: quickReplies
  })
  const bindSendAttachment = (type) => (recipientId, url, quickReplies) => sendAttachment(recipientId, url, type, quickReplies)
  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/image-attachment
  const sendImage = bindSendAttachment('image')
  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/audio-attachment
  const sendAudio = bindSendAttachment('audio')
  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/video-attachment
  const sendVideo = bindSendAttachment('video')
  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/file-attachment
  const sendFile = bindSendAttachment('file')

  const sendTemplate = (recipientId, payload) => sendMessage(recipientId, {
    attachment: {
      type: 'template',
      payload
    }
  })
  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/button-template
  const sendButtons = (recipientId, text, buttons) => sendTemplate(recipientId, {
    template_type: 'button',
    text,
    buttons
  })
  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template
  const sendElements = (recipientId, elements) => sendTemplate(recipientId, {
    template_type: 'generic',
    elements
  })

  // https://developers.facebook.com/docs/messenger-platform/send-api-reference/sender-actions
  const sendTyping = (recipientId, status) => sendRaw({
    recipient: {
      id: recipientId
    },
    sender_action: 'typing_on'
  })

  const sendLocationPrompt = (recipientId, textMessage) => send(recipientId, textMessage, locationQuickReplies)

  return {
    sendRaw,
    sendMessage,
    send,
    sendAttachment,
    sendImage,
    sendAudio,
    sendVideo,
    sendFile,
    sendTemplate,
    sendButtons,
    sendElements,
    sendTyping,
    sendLocationPrompt
  }
}

module.exports = {
  createSendHelper
}
