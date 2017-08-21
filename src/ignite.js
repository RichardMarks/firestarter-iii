import { scene } from './scene'
import { core } from './core'
import { engine } from './engine'

// const requestAnimFrame = window.requestAnimationFrame;
//
// const engine = {
//   start() {
//     engine.canvas = document.createElement('canvas');
//     engine.canvas.width = core.stage.width;
//     engine.canvas.height = core.stage.height;
//     engine.ctx = engine.canvas.getContext('2d');
//     document.body.appendChild(engine.canvas);
//     core.stage.canvas = engine.canvas;
//     core.stage._resize();
//     engine.loopFunc();
//   },
//   lastTime: Date.now(),
//   loopFunc() {
//     const now = Date.now();
//     const deltaTime = (now - engine.lastTime) * 0.001;
//     engine.update(deltaTime);
//     engine.render();
//     engine.lastTime = now;
//     requestAnimFrame(engine.loopFunc);
//   },
//   update(deltaTime) {
//     scene._current.update._exec(deltaTime);
//   },
//   render() {
//     core.stage.render(engine.ctx);
//   },
// };

const SHOW_FPS = true

export const ignite = () => {
  window.console.log('fire it up!')
  /*
  _onBegin: NOP, // begin(timestamp:DOMHighResTimeStamp, deltaTime:float)
  _onUpdate: NOP, // update(simulationTimestep:float)
  _onDraw: NOP, // draw(interpolationPercentage:float)
  _onEnd: NOP, // end(fps:int, panic:boolean)
  */
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = core.stage.width
  canvas.height = core.stage.height
  document.body.appendChild(canvas)
  core.stage.canvas = canvas
  core.stage._resize()

  engine.begin = () => {

  }

  engine.draw = (interpolationPercentage) => {
    core.stage.render(ctx, interpolationPercentage)
  }

  engine.update = (timeStep) => {
    scene._current.update._exec(timeStep * 0.01)
  }

  if (SHOW_FPS) {
    engine.end = (fps, panic) => {
      ctx.save()
      ctx.textBaseline = 'bottom'
      ctx.font = '24px sans-serif'
      ctx.fillStyle = 'white'
      ctx.lineWidth = 4
      ctx.fillText(`FPS: ${engine.fps | 0}`, 0, canvas.height)
      ctx.strokeStyle = 'black'
      ctx.strokeText(`FPS: ${engine.fps | 0}`, 1, canvas.height - 1)
      ctx.fillText(`FPS: ${engine.fps | 0}`, 0, canvas.height)
      ctx.restore()
      if (panic) {
        const discardTime = engine.resetFrameDelta() | 0
        window.console.warn(`Engine Panic! Discarding ${discardTime}ms`)
      }
    }
  }

  engine.start()
}
