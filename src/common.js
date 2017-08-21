import { core } from './core'

export const common = {
  set title ($title) {
    document.title = $title
  },
  set width ($width) {
    core.stage.width = $width
  },
  set height ($height) {
    core.stage.height = $height
  },
  get width () { return core.stage.width },
  get height () { return core.stage.height },
  scale: core.stage.scale,
  set resize ($resize) {
    core.stage.resize = $resize
  }
}
