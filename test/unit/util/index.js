exports.triggerEvent = function (elm, name, ...opts) {
  let eventName
  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents'
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent'
  } else {
    eventName = 'HTMLEvents'
  }
  const evt = document.createEvent(eventName)
  evt.initEvent(name, ...opts)
  elm.dispatchEvent
    ? elm.dispatchEvent(evt)
    : elm.fireEvent('on' + name, evt)

  return elm
}

exports.triggerClick = function (elm, ...opts) {
  exports.triggerEvent(elm, 'mousedown', ...opts)
  exports.triggerEvent(elm, 'mouseup', ...opts)
  return elm
}

exports.triggerKeyDown = function (el, keyCode) {
  const evt = document.createEvent('Events')
  evt.initEvent('keydown', true, true)
  evt.keyCode = keyCode
  el.dispatchEvent(evt)
}
