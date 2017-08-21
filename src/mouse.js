export const mouse = {
  click: {
    _handlers: [],
    add (handler) {
      mouse.click._handlers.push(handler)
      document.addEventListener('click', handler)
    }
  }
}
