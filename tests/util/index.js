exports.triggerEvent = function (elm, name, ...opts) {
  let eventName
  const el = Object.prototype.hasOwnProperty.call(elm, 'element') ? elm.element : elm;

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents'
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent'
  } else {
    eventName = 'HTMLEvents'
  }
  const evt = document.createEvent(eventName)
  evt.initEvent(name, ...opts)
  el.dispatchEvent
    ? el.dispatchEvent(evt)
    : el.fireEvent('on' + name, evt)

  return el
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
exports.triggerMouseWheel = function(el, delta) {
  var evt = document.createEvent('MouseEvents');
  evt.initEvent('wheel', true, true);
  evt.deltaY = delta;
  el.dispatchEvent(evt);
}
