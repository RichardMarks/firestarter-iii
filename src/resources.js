export const resources = {
  _assets: {},
  load (manifest) {
    return new Promise((resolve, reject) => {
      function loadNext (manifest) {
        if (manifest.length === 0) {
          resolve(resources._assets)
          return
        }
        const asset = manifest.shift()
        const image = new window.Image()
        image.onload = () => {
          resources._assets[asset.id] = image
          loadNext(manifest)
        }
        image.onerror = () => {
          reject(new Error(`Unable to load asset ${asset.id} from ${asset.src}`))
        }
        image.src = asset.src
      }
      loadNext(manifest.slice())
    })
  }
}

export const asset = (id, src) => {
  return {
    id,
    src: `${src}?${Date.now()}`
  }
}
