const rAFPolyfill = () => {
  const data = { last: 0, now: 0, timeout: 0 }
  return callback => {
    data.now = Date.now()
    data.timeout = Math.max(0, (1000 / 60) - (data.now - data.last))
    data.last = data.now + data.timeout
    const next = data.now + data.timeout
    return setTimeout(() => callback(next), data.timeout)
  }
}
const requestAnimFrame = window.requestAnimationFrame || rAFPolyfill
const cancelAnimFrame = window.cancelAnimationFrame || clearTimeout

const NOP = () => {}
export const engine = {
  _onBegin: NOP, // begin(timestamp:DOMHighResTimeStamp, deltaTime:float)
  _onUpdate: NOP, // update(simulationTimestep:float)
  _onDraw: NOP, // draw(interpolationPercentage:float)
  _onEnd: NOP, // end(fps:int, panic:boolean)

  _frameHandle: null,
  _simulationTimestep: 1000 / 60,
  _frameDelta: 0,
  _lastFrameTimeMs: 0,
  _fps: 60,
  _lastFpsUpdate: 0,
  _framesThisSecond: 0,
  _numUpdateSteps: 0,
  _minFrameDelay: 0,
  _running: false,
  _started: false,
  _panic: false,

  get fps () { return engine._fps },

  set begin (fn) { engine._onBegin = fn || engine._onBegin },
  set update (fn) { engine._onUpdate = fn || engine._onUpdate },
  set draw (fn) { engine._onDraw = fn || engine._onDraw },
  set end (fn) { engine._onEnd = fn || engine._onEnd },

  resetFrameDelta () {
    const prevDelta = engine._frameDelta
    engine._frameDelta = 0
    return prevDelta
  },

  start () {
    if (engine._started) {
      return
    }
    engine._started = true
    engine._frameHandle = requestAnimFrame(ts => {
      engine._onDraw(1)
      engine._running = true
      engine._lastFrameTimeMs = ts
      engine._lastFpsUpdate = ts
      engine._framesThisSecond = 0
      engine._frameHandle = requestAnimFrame(engine._animate.bind(engine))
    })
  },

  stop () {
    if (!engine._started) {
      return
    }
    engine._running = false
    engine._started = false
    cancelAnimFrame(engine._frameHandle)
  },

  _animate (ts) {
    engine._frameHandle = requestAnimFrame(engine._animate.bind(engine))
    if (ts < engine._lastFrameTimeMs + engine._minFrameDelay) {
      return
    }
    engine._frameDelta += ts - engine._lastFrameTimeMs
    engine._lastFrameTimeMs = ts
    engine._onBegin(ts, engine._frameDelta)
    if (ts > this._lastFpsUpdate + 1000) {
      engine._fps = 0.25 * engine._framesThisSecond + 0.75 * engine._fps
      engine._lastFpsUpdate = ts
      engine._framesThisSecond = 0
    }
    engine._framesThisSecond += 1
    engine._numUpdateSteps = 0
    while (engine._frameDelta >= engine._simulationTimestep) {
      engine._onUpdate(engine._simulationTimestep)
      engine._frameDelta -= engine._simulationTimestep
      engine._numUpdateSteps += 1
      if (engine._numUpdateSteps >= 240) {
        engine._panic = true
        break
      }
    }
    engine._onDraw(engine._frameDelta / engine._simulationTimestep)
    engine._onEnd(engine._fps, engine._panic)
    engine._panic = false
  }
}
