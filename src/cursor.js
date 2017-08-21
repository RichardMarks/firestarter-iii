export const cursor = {
  _options: {
    center: false
  },
  get center () {
    window.console.log('cursor.center')
    cursor._options.center = true
    return cursor
  },
  print (text) {
    window.console.log(`cursor.print ${text}`)
    const element = document.createElement('div')
    if (cursor._options.center) {
      Object.assign(element.style, {
        textAlign: 'center'
      })
    }
    element.innerText = text
    document.body.appendChild(element)
    return cursor
  }
}
