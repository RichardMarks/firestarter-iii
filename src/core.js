import { scene } from './scene'

export const core = {
  stage: {
    isAspectScale: false,
    canvas: null, // set by ignite internal engine
    get resize () { return core.stage._resize },
    set resize ($resize) {
      if ($resize) {
        window.addEventListener('resize', core.stage._resize)
      } else {
        window.removeEventListener('resize', core.stage._resize)
      }
    },
    _resize () {
      if (core.stage.isAspectScale) {
        // find aspect ratio
        const portrait = core.stage.width < core.stage.height
        let aspectRatio = core.stage.width / core.stage.height
        if (portrait) {
          aspectRatio = core.stage.height / core.stage.width
        }
        const invAspect = 1.0 / aspectRatio

        // scale the canvas to fit either width or height
        // based on interpreted orientation

        if (portrait) {
          core.stage.canvas.height = window.innerHeight
          core.stage.canvas.width = window.innerHeight * invAspect
        } else {
          core.stage.canvas.width = window.innerWidth
          core.stage.canvas.height = window.innerWidth * invAspect
        }

        // scale the stage
        core.stage.scale.x = core.stage.canvas.width / core.stage.width
        core.stage.scale.y = core.stage.canvas.height / core.stage.height

        // center the canvas
        const left = ((window.innerWidth - core.stage.canvas.width) * 0.5) | 0
        const top = ((window.innerHeight - core.stage.canvas.height) * 0.5) | 0
        Object.assign(core.stage.canvas.style, {
          position: 'absolute',
          left: `${left}px`,
          top: `${top}px`
        })
//         window.console.log(`resize landscape
// aspect: ${aspectRatio}
// scale: x: ${core.stage.scale.x} y: ${core.stage.scale.y}
// window: ${window.innerWidth} x ${window.innerHeight}
// canvas: ${core.stage.canvas.width} x ${core.stage.canvas.height}
// position: x: ${left}, y: ${top}
// `);
      } else {
        // fill window scaling
        core.stage.scale.x = window.innerWidth / core.stage.width
        core.stage.scale.y = window.innerHeight / core.stage.height
        core.stage.canvas.width = window.innerWidth
        core.stage.canvas.height = window.innerHeight
        Object.assign(core.stage.canvas.style, {
          position: 'absolute',
          left: `0px`,
          top: `0px`
        })
      }
    },
    scale: {
      get aspect () { return core.stage.isAspectScale },
      set aspect (isAspectScale) {
        core.stage.isAspectScale = isAspectScale
        if (isAspectScale) {
          window.console.log('set aspect ratio scaling on stage')
        } else {
          window.console.log('set fill scaling on stage')
        }
      }
    },
    render (ctx, interpolationPercentage) {
      ctx.save()
      ctx.scale(core.stage.scale.x, core.stage.scale.y)
      if (scene._background) {
        ctx.drawImage(scene._background, 0, 0)
      } else {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      }

      scene._current.render._exec(ctx, interpolationPercentage)
      ctx.restore()
    }
  }
}
