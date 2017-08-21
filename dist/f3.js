(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("F3", [], factory);
	else if(typeof exports === 'object')
		exports["F3"] = factory();
	else
		root["F3"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const dummyScene = {
  name: 'Dummy',
  _actors: [],
  create () {},
  update: {
    _exec () {}
  },
  render: {
    _exec () {}
  }
}

const scene = {
  _scenes: {},
  _current: dummyScene,
  _background: null,
  create (name, creator) {
    window.console.log(`creating scene ${name}`)
    const sceneInst = {
      name,
      create: creator,
      _actors: [],
      update: {
        _exec (deltaTime) {
          sceneInst._actors.forEach(actor => actor.update._exec(deltaTime))
        }
      },
      render: {
        _exec (context, interpolationPercentage) {
          sceneInst._actors.forEach(actor => actor.render._exec(context, interpolationPercentage))
        }
      }
    }
    scene._scenes[name] = sceneInst
    return scene
  },
  get background () { return scene._background },
  set background (image) {
    scene._background = image
    window.console.log(`set background to image ${image.src}`)
  },
  load ($scene) {
    document.body.innerHTML = ''
    window.console.log(`loading scene ${$scene.name}`)
    if (!$scene) {
      throw new Error('Unable to load an undefined scene reference')
    }
    const nextScene = scene._scenes[$scene.name]
    if (!nextScene) {
      throw new Error(`Unable to load scene ${$scene.name}`)
    }
    scene._current = $scene
    nextScene.create()
  },
  end () {
    window.console.log(`ending scene ${scene._current.name}`)
    scene._current = dummyScene
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = scene;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scene__ = __webpack_require__(0);


const core = {
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
      if (__WEBPACK_IMPORTED_MODULE_0__scene__["a" /* scene */]._background) {
        ctx.drawImage(__WEBPACK_IMPORTED_MODULE_0__scene__["a" /* scene */]._background, 0, 0)
      } else {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      }

      __WEBPACK_IMPORTED_MODULE_0__scene__["a" /* scene */]._current.render._exec(ctx, interpolationPercentage)
      ctx.restore()
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = core;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const point = (x, y) => {
  const p = {
    x,
    y,
    toString () {
      return `Point(${p.x}, ${p.y})`
    }
  }
  return p
}
/* harmony export (immutable) */ __webpack_exports__["e"] = point;


const vector = (x, y) => {
  return point(x, y)
}
/* unused harmony export vector */


const magnitude = v => {
  return Math.sqrt(v.x * v.x + v.y * v.y)
}
/* harmony export (immutable) */ __webpack_exports__["b"] = magnitude;


const normalize = v => {
  const length = magnitude(v)
  if (length !== 0) {
    v.x /= length
    v.y /= length
  }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = normalize;


const perpendicular = v => {
  return point(-v.y, v.x)
}
/* unused harmony export perpendicular */


const dotProduct = (v1, v2) => {
  return v1.x * v2.x + v1.y * v2.y
}
/* harmony export (immutable) */ __webpack_exports__["a"] = dotProduct;


const perpDotProduct = (v1, v2) => {
  return dotProduct(perpendicular(v1), v2)
}
/* harmony export (immutable) */ __webpack_exports__["d"] = perpDotProduct;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scenes", function() { return scenes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resources__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scene__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cursor__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mouse__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ignite__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actor__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__physics__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "common", function() { return __WEBPACK_IMPORTED_MODULE_0__common__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "resources", function() { return __WEBPACK_IMPORTED_MODULE_1__resources__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "asset", function() { return __WEBPACK_IMPORTED_MODULE_1__resources__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scene", function() { return __WEBPACK_IMPORTED_MODULE_2__scene__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cursor", function() { return __WEBPACK_IMPORTED_MODULE_3__cursor__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mouse", function() { return __WEBPACK_IMPORTED_MODULE_4__mouse__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "actor", function() { return __WEBPACK_IMPORTED_MODULE_6__actor__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "physics", function() { return __WEBPACK_IMPORTED_MODULE_7__physics__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ignite", function() { return __WEBPACK_IMPORTED_MODULE_5__ignite__["a"]; });









const scenes = __WEBPACK_IMPORTED_MODULE_2__scene__["a" /* scene */]._scenes

const api = {
  NAME: '~ F I R E S T A R T E R III ~',
  VERSION: '1.0.0',
  AUTHOR: 'Richard Marks <ccpsceo@gmail.com>',
  COPYRIGHT: '2017, Richard Marks',
  LICENSE: 'MIT',
  common: __WEBPACK_IMPORTED_MODULE_0__common__["a" /* common */],
  resources: __WEBPACK_IMPORTED_MODULE_1__resources__["b" /* resources */],
  asset: __WEBPACK_IMPORTED_MODULE_1__resources__["a" /* asset */],
  scene: __WEBPACK_IMPORTED_MODULE_2__scene__["a" /* scene */],
  cursor: __WEBPACK_IMPORTED_MODULE_3__cursor__["a" /* cursor */],
  mouse: __WEBPACK_IMPORTED_MODULE_4__mouse__["a" /* mouse */],
  actor: __WEBPACK_IMPORTED_MODULE_6__actor__["a" /* actor */],
  physics: __WEBPACK_IMPORTED_MODULE_7__physics__["a" /* physics */],
  ignite: __WEBPACK_IMPORTED_MODULE_5__ignite__["a" /* ignite */],
  scenes
}



/* harmony default export */ __webpack_exports__["default"] = (api);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(1);


const common = {
  set title ($title) {
    document.title = $title
  },
  set width ($width) {
    __WEBPACK_IMPORTED_MODULE_0__core__["a" /* core */].stage.width = $width
  },
  set height ($height) {
    __WEBPACK_IMPORTED_MODULE_0__core__["a" /* core */].stage.height = $height
  },
  get width () { return __WEBPACK_IMPORTED_MODULE_0__core__["a" /* core */].stage.width },
  get height () { return __WEBPACK_IMPORTED_MODULE_0__core__["a" /* core */].stage.height },
  scale: __WEBPACK_IMPORTED_MODULE_0__core__["a" /* core */].stage.scale,
  set resize ($resize) {
    __WEBPACK_IMPORTED_MODULE_0__core__["a" /* core */].stage.resize = $resize
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = common;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const resources = {
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
/* harmony export (immutable) */ __webpack_exports__["b"] = resources;


const asset = (id, src) => {
  return {
    id,
    src: `${src}?${Date.now()}`
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = asset;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const cursor = {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = cursor;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const mouse = {
  click: {
    _handlers: [],
    add (handler) {
      mouse.click._handlers.push(handler)
      document.addEventListener('click', handler)
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = mouse;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scene__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine__ = __webpack_require__(9);




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

const ignite = () => {
  window.console.log('fire it up!')
  /*
  _onBegin: NOP, // begin(timestamp:DOMHighResTimeStamp, deltaTime:float)
  _onUpdate: NOP, // update(simulationTimestep:float)
  _onDraw: NOP, // draw(interpolationPercentage:float)
  _onEnd: NOP, // end(fps:int, panic:boolean)
  */
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = __WEBPACK_IMPORTED_MODULE_1__core__["a" /* core */].stage.width
  canvas.height = __WEBPACK_IMPORTED_MODULE_1__core__["a" /* core */].stage.height
  document.body.appendChild(canvas)
  __WEBPACK_IMPORTED_MODULE_1__core__["a" /* core */].stage.canvas = canvas
  __WEBPACK_IMPORTED_MODULE_1__core__["a" /* core */].stage._resize()

  __WEBPACK_IMPORTED_MODULE_2__engine__["a" /* engine */].begin = () => {

  }

  __WEBPACK_IMPORTED_MODULE_2__engine__["a" /* engine */].draw = (interpolationPercentage) => {
    __WEBPACK_IMPORTED_MODULE_1__core__["a" /* core */].stage.render(ctx, interpolationPercentage)
  }

  __WEBPACK_IMPORTED_MODULE_2__engine__["a" /* engine */].update = (timeStep) => {
    __WEBPACK_IMPORTED_MODULE_0__scene__["a" /* scene */]._current.update._exec(timeStep * 0.01)
  }

  if (SHOW_FPS) {
    __WEBPACK_IMPORTED_MODULE_2__engine__["a" /* engine */].end = (fps, panic) => {
      ctx.save()
      ctx.textBaseline = 'bottom'
      ctx.font = '24px sans-serif'
      ctx.fillStyle = 'white'
      ctx.lineWidth = 4
      ctx.fillText(`FPS: ${__WEBPACK_IMPORTED_MODULE_2__engine__["a" /* engine */].fps | 0}`, 0, canvas.height)
      ctx.strokeStyle = 'black'
      ctx.strokeText(`FPS: ${__WEBPACK_IMPORTED_MODULE_2__engine__["a" /* engine */].fps | 0}`, 1, canvas.height - 1)
      ctx.fillText(`FPS: ${__WEBPACK_IMPORTED_MODULE_2__engine__["a" /* engine */].fps | 0}`, 0, canvas.height)
      ctx.restore()
      if (panic) {
        const discardTime = __WEBPACK_IMPORTED_MODULE_2__engine__["a" /* engine */].resetFrameDelta() | 0
        window.console.warn(`Engine Panic! Discarding ${discardTime}ms`)
      }
    }
  }

  __WEBPACK_IMPORTED_MODULE_2__engine__["a" /* engine */].start()
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ignite;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
const engine = {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = engine;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scene__ = __webpack_require__(0);


const actor = (id, image) => {
  window.console.log(`
creating actor ${id}
  image: ${image.src.substring(image.src.indexOf('/'))}
  width: ${image.width}
  height: ${image.height}
  `)
  const actorInst = {
    id,
    image,
    _x: 0,
    _y: 0,
    set x ($x) { actorInst._x = $x; actorInst._prevX = $x },
    get x () { return actorInst._x },
    set y ($y) { actorInst._y = $y; actorInst._prevY = $y },
    get y () { return actorInst._y },
    _prevX: 0,
    _prevY: 0,
    width: image.width,
    height: image.height,
    set physics ($p) {
      actorInst._physics = $p
      if ($p) {
        $p.setup(actorInst)
      }
    },
    _updaters: [],
    _renderers: [],
    update: {
      add (updater) {
        window.console.log(`adding updater to actor ${actorInst.id}`)
        actorInst._updaters.push(updater)
      },
      _exec (deltaTime) {
        actorInst._updaters.forEach(updater => updater(deltaTime))
        actorInst._prevX = actorInst.x
        actorInst._prevY = actorInst.y
      }
    },
    render: {
      add (renderer) {
        window.console.log(`adding renderer to actor ${actorInst.id}`)
        actorInst._renderers.push(renderer)
      },
      _exec (context, interpolationPercentage) {
        const x = actorInst._prevX + (actorInst._x - actorInst._prevX) * interpolationPercentage
        const y = actorInst._prevY + (actorInst._y - actorInst._prevY) * interpolationPercentage
        context.save()
        context.drawImage(actorInst.image, x, y)
        context.restore()
        actorInst._renderers.forEach(renderer => renderer(context, interpolationPercentage))
      }
    }
  }
  __WEBPACK_IMPORTED_MODULE_0__scene__["a" /* scene */]._current._actors.push(actorInst)
  return actorInst
}
/* harmony export (immutable) */ __webpack_exports__["a"] = actor;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vmath__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pe__ = __webpack_require__(12);



const addPhysicsModelToActor = actor => {
  if (!actor) {
    throw new Error(`Expected an actor instance, not ${actor}`)
  }

  // physics body
  actor.body = Object(__WEBPACK_IMPORTED_MODULE_1__pe__["a" /* body */])(actor)

  actor.body.applyFriction(9.8)

  // add physics methods
  actor.force = {
    add (x, y) {
      window.console.log(`adding physics force [${x}, ${y}] to actor ${actor.id}`)
      actor.body.applyLinearForce(Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["e" /* point */])(x, y))
    }
  }

  actor.gravity = {
    set y (g) {
      actor.body.applyGravity(g)
      actor.gravity._y = g
    },
    get y () { return actor.gravity._y }
  }

  // add physics step to updates
  actor.update.add(deltaTime => {
    actor.body.update(deltaTime)
    actor.body.applyGravity(actor.gravity.y)
  })
}

const physics = {
  kinetic: {
    setup (actor) {
      window.console.log(`enabling kinetic physics for actor ${actor.id}`)
      addPhysicsModelToActor(actor)
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = physics;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vmath__ = __webpack_require__(2);


const body = actor => {
  const bodyInst = {
    centerOfMass: Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["e" /* point */])(0, 0),
    mass: 10.0,
    inertia: 0.0,
    staticFrictionCoefficient: 0.7,
    kineticFrictionCoefficient: 0.6,
    coefficientOfRestitution: 0.4,
    linearVelocity: Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["e" /* point */])(0, 0),
    orientation: 0.0,
    angularVelocity: 0.0,
    totalForce: Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["e" /* point */])(0, 0),
    totalTorque: 0.0,
    frictionForce: Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["e" /* point */])(0, 0),
    totalImpulse: 0.0,

    updatePosition (deltaTime) {
      bodyInst.linearVelocity.x += (bodyInst.totalForce.x / bodyInst.mass) * deltaTime
      bodyInst.linearVelocity.y += (bodyInst.totalForce.y / bodyInst.mass) * deltaTime
      actor.x += bodyInst.linearVelocity.x * deltaTime
      actor.y += bodyInst.linearVelocity.y * deltaTime
    },

    updateRotation (deltaTime) {
      bodyInst.angularVelocity += (bodyInst.totalTorque / bodyInst.inertia) * deltaTime
      bodyInst.orientation += bodyInst.angularVelocity * deltaTime
    },

    updateFriction (deltaTime) {
      const friction = Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["e" /* point */])(
        (bodyInst.frictionForce.x / bodyInst.mass) * deltaTime,
        (bodyInst.frictionForce.y / bodyInst.mass) * deltaTime)

      // applies friction to linear velocity
      // only if the body will not move by the integration
      if (Math.abs(bodyInst.linearVelocity.x) >= Math.abs(friction.x)) {
        bodyInst.linearVelocity.x += friction.x
      } else {
        bodyInst.linearVelocity.x = 0
      }

      if (Math.abs(bodyInst.linearVelocity.y) >= Math.abs(friction.y)) {
        bodyInst.linearVelocity.y += friction.y
      } else {
        bodyInst.linearVelocity.y = 0
      }

      // apply damping
      if (Math.abs(bodyInst.linearVelocity.x) <= 0.1) {
        bodyInst.linearVelocity.x = 0
      }

      if (Math.abs(bodyInst.linearVelocity.y) <= 0.1) {
        bodyInst.linearVelocity.y = 0
      }

      // damping for rotation since friction does not affect rotation
      bodyInst.angularVelocity *= 0.995
    },

    update (deltaTime) {
      bodyInst.updatePosition(deltaTime)
      bodyInst.updateRotation(deltaTime)
      bodyInst.updateFriction(deltaTime)
      bodyInst.resetForces()
    },

    resetForces () {
      bodyInst.totalTorque = 0.0
      bodyInst.totalImpulse = 0.0
      bodyInst.totalForce.x = 0.0
      bodyInst.totalForce.y = 0.0
      bodyInst.frictionForce.x = 0.0
      bodyInst.frictionForce.y = 0.0
    },

    applyLinearForce (force) {
      bodyInst.totalForce.x += force.x
      bodyInst.totalForce.y += force.y
    },

    applyTorque (torque) {
      bodyInst.totalTorque += torque
    },

    applyForce (force, pointOfContact) {
      bodyInst.totalForce.x += force.x
      bodyInst.totalForce.y += force.y
      const arm = Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["e" /* point */])(0, 0)
      arm.x = pointOfContact.x - bodyInst.centerOfMass.x
      arm.y = pointOfContact.y - bodyInst.centerOfMass.y
      bodyInst.totalTorque += Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["d" /* perpDotProduct */])(arm, force)
    },

    applyGravity (gravity = 9.8) {
      bodyInst.applyLinearForce(Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["e" /* point */])(0, gravity * bodyInst.mass))
    },

    applyFriction (gravity) {
      let friction = null
      if (Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["b" /* magnitude */])(bodyInst.linearVelocity) < 1.0) {
        friction = Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["e" /* point */])(bodyInst.totalForce.x, bodyInst.totalForce.y)
        Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["c" /* normalize */])(friction)
        const factor = -(bodyInst.mass * gravity) * bodyInst.staticFrictionCoefficient
        friction.x *= factor
        friction.y *= factor
      } else {
        friction = Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["e" /* point */])(bodyInst.linearVelocity.x, bodyInst.linearVelocity.y)
        Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["c" /* normalize */])(friction)
        const factor = -(bodyInst.mass * gravity) * bodyInst.kineticFrictionCoefficient
        friction.x *= factor
        friction.y *= factor
      }
      bodyInst.frictionForce.x += friction.x
      bodyInst.frictionForce.y += friction.y
    },

    handleCollision (otherBody, collisionNormal) {
      Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["c" /* normalize */])(collisionNormal)
      const relativeVelocity = Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["e" /* point */])(
        bodyInst.linearVelocity.x - otherBody.linearVelocity.x,
        bodyInst.linearVelocity.y - otherBody.linearVelocity.y)
      relativeVelocity.x *= -(1 + bodyInst.coefficientOfRestitution)
      relativeVelocity.y *= -(1 + bodyInst.coefficientOfRestitution)
      const invSumOfMass = (1 / bodyInst.mass) + (1 / otherBody.mass)
      const impulseA = Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["a" /* dotProduct */])(relativeVelocity, collisionNormal)
      const impulseV = Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["e" /* point */])(
        collisionNormal.x * invSumOfMass,
        collisionNormal.y * invSumOfMass)
      const impulseB = Object(__WEBPACK_IMPORTED_MODULE_0__vmath__["a" /* dotProduct */])(collisionNormal, impulseV)
      const impulse = impulseA / impulseB
      const linearVelocityFactor = impulse / bodyInst.mass
      const otherLinearVelocityFactor = impulse / otherBody.mass
      bodyInst.linearVelocity.x += collisionNormal.x * linearVelocityFactor
      bodyInst.linearVelocity.y += collisionNormal.y * linearVelocityFactor
      otherBody.linearVelocity.x += collisionNormal.x * otherLinearVelocityFactor
      otherBody.linearVelocity.y += collisionNormal.y * otherLinearVelocityFactor
    }
  }

  return bodyInst
}
/* harmony export (immutable) */ __webpack_exports__["a"] = body;



/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0NWE0M2M4YTkyMzJlYTkzYzQ5MyIsIndlYnBhY2s6Ly8vLi9zY2VuZS5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlLmpzIiwid2VicGFjazovLy8uL3ZtYXRoLmpzIiwid2VicGFjazovLy8uL2YzLmpzIiwid2VicGFjazovLy8uL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY3Vyc29yLmpzIiwid2VicGFjazovLy8uL21vdXNlLmpzIiwid2VicGFjazovLy8uL2lnbml0ZS5qcyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vYWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vcGh5c2ljcy5qcyIsIndlYnBhY2s6Ly8vLi9wZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsS0FBSztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gscUJBQXFCLDJCQUEyQjtBQUNoRDtBQUNBO0FBQ0Esa0RBQWtELFVBQVU7QUFDNUQsR0FBRztBQUNIO0FBQ0E7QUFDQSx3Q0FBd0MsWUFBWTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLFlBQVk7QUFDMUQ7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsdUNBQXVDLG9CQUFvQjtBQUMzRDtBQUNBO0FBQ0E7QUFBQTtBQUFBOzs7Ozs7Ozs7QUMxRGdCOztBQUVoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiw0QkFBNEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixLQUFLO0FBQ3hCLGtCQUFrQixJQUFJO0FBQ3RCLFNBQVM7QUFDVDtBQUNBLGFBQWE7QUFDYixlQUFlLG1CQUFtQixNQUFNO0FBQ3hDLGFBQWEsa0JBQWtCLEtBQUs7QUFDcEMsYUFBYSx3QkFBd0IsS0FBSztBQUMxQyxrQkFBa0IsS0FBSyxPQUFPO0FBQzlCO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBLHFCQUFxQixrQ0FBa0M7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7Ozs7Ozs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixJQUFJLElBQUksSUFBSTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckNpQjtBQUNVO0FBQ1g7QUFDQztBQUNEO0FBQ0M7QUFDRDtBQUNFOztBQUVsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQWFBOztBQUVBOzs7Ozs7Ozs7QUMxQ2U7O0FBRWY7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSCxnQkFBZ0IseUVBQTBCO0FBQzFDLGlCQUFpQiwwRUFBMkI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7Ozs7Ozs7O0FDbEJBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsU0FBUyxRQUFRLFVBQVU7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxJQUFJLEdBQUcsV0FBVztBQUM5QjtBQUNBO0FBQUE7QUFBQTs7Ozs7Ozs7QUM5QkE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsdUNBQXVDLEtBQUs7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7QUNSZ0I7QUFDRDtBQUNFOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsZ0VBQWU7QUFDMUM7QUFDQSw2QkFBNkIsZ0VBQWU7QUFDNUMsMkJBQTJCLGdFQUFlO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxZQUFZO0FBQ3BFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTs7Ozs7Ozs7QUNwRkE7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLHFCQUFxQjs7QUFFbkMsa0JBQWtCLDBDQUEwQztBQUM1RCxtQkFBbUIsNENBQTRDO0FBQy9ELGlCQUFpQix3Q0FBd0M7QUFDekQsZ0JBQWdCLHNDQUFzQzs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7Ozs7Ozs7O0FDbEdnQjs7QUFFaEI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixXQUFXO0FBQ1gsV0FBVztBQUNYLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbUJBQW1CLHdCQUF3QjtBQUMzRCxjQUFjLHNCQUFzQjtBQUNwQyxnQkFBZ0IsbUJBQW1CLHdCQUF3QjtBQUMzRCxjQUFjLHNCQUFzQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsYUFBYTtBQUNuRTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSx1REFBdUQsYUFBYTtBQUNwRTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7QUMxRGdCO0FBQ0Q7O0FBRWY7QUFDQTtBQUNBLHVEQUF1RCxNQUFNO0FBQzdEOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELEVBQUUsSUFBSSxFQUFFLGFBQWEsU0FBUztBQUNoRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCxTQUFTO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7Ozs7Ozs7O0FDckNDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQUE7QUFBQSIsImZpbGUiOiJmMy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiRjNcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiRjNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiRjNcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDVhNDNjOGE5MjMyZWE5M2M0OTMiLCJjb25zdCBkdW1teVNjZW5lID0ge1xuICBuYW1lOiAnRHVtbXknLFxuICBfYWN0b3JzOiBbXSxcbiAgY3JlYXRlICgpIHt9LFxuICB1cGRhdGU6IHtcbiAgICBfZXhlYyAoKSB7fVxuICB9LFxuICByZW5kZXI6IHtcbiAgICBfZXhlYyAoKSB7fVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBzY2VuZSA9IHtcbiAgX3NjZW5lczoge30sXG4gIF9jdXJyZW50OiBkdW1teVNjZW5lLFxuICBfYmFja2dyb3VuZDogbnVsbCxcbiAgY3JlYXRlIChuYW1lLCBjcmVhdG9yKSB7XG4gICAgd2luZG93LmNvbnNvbGUubG9nKGBjcmVhdGluZyBzY2VuZSAke25hbWV9YClcbiAgICBjb25zdCBzY2VuZUluc3QgPSB7XG4gICAgICBuYW1lLFxuICAgICAgY3JlYXRlOiBjcmVhdG9yLFxuICAgICAgX2FjdG9yczogW10sXG4gICAgICB1cGRhdGU6IHtcbiAgICAgICAgX2V4ZWMgKGRlbHRhVGltZSkge1xuICAgICAgICAgIHNjZW5lSW5zdC5fYWN0b3JzLmZvckVhY2goYWN0b3IgPT4gYWN0b3IudXBkYXRlLl9leGVjKGRlbHRhVGltZSkpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZW5kZXI6IHtcbiAgICAgICAgX2V4ZWMgKGNvbnRleHQsIGludGVycG9sYXRpb25QZXJjZW50YWdlKSB7XG4gICAgICAgICAgc2NlbmVJbnN0Ll9hY3RvcnMuZm9yRWFjaChhY3RvciA9PiBhY3Rvci5yZW5kZXIuX2V4ZWMoY29udGV4dCwgaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UpKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHNjZW5lLl9zY2VuZXNbbmFtZV0gPSBzY2VuZUluc3RcbiAgICByZXR1cm4gc2NlbmVcbiAgfSxcbiAgZ2V0IGJhY2tncm91bmQgKCkgeyByZXR1cm4gc2NlbmUuX2JhY2tncm91bmQgfSxcbiAgc2V0IGJhY2tncm91bmQgKGltYWdlKSB7XG4gICAgc2NlbmUuX2JhY2tncm91bmQgPSBpbWFnZVxuICAgIHdpbmRvdy5jb25zb2xlLmxvZyhgc2V0IGJhY2tncm91bmQgdG8gaW1hZ2UgJHtpbWFnZS5zcmN9YClcbiAgfSxcbiAgbG9hZCAoJHNjZW5lKSB7XG4gICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSAnJ1xuICAgIHdpbmRvdy5jb25zb2xlLmxvZyhgbG9hZGluZyBzY2VuZSAkeyRzY2VuZS5uYW1lfWApXG4gICAgaWYgKCEkc2NlbmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGxvYWQgYW4gdW5kZWZpbmVkIHNjZW5lIHJlZmVyZW5jZScpXG4gICAgfVxuICAgIGNvbnN0IG5leHRTY2VuZSA9IHNjZW5lLl9zY2VuZXNbJHNjZW5lLm5hbWVdXG4gICAgaWYgKCFuZXh0U2NlbmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIGxvYWQgc2NlbmUgJHskc2NlbmUubmFtZX1gKVxuICAgIH1cbiAgICBzY2VuZS5fY3VycmVudCA9ICRzY2VuZVxuICAgIG5leHRTY2VuZS5jcmVhdGUoKVxuICB9LFxuICBlbmQgKCkge1xuICAgIHdpbmRvdy5jb25zb2xlLmxvZyhgZW5kaW5nIHNjZW5lICR7c2NlbmUuX2N1cnJlbnQubmFtZX1gKVxuICAgIHNjZW5lLl9jdXJyZW50ID0gZHVtbXlTY2VuZVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NjZW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHNjZW5lIH0gZnJvbSAnLi9zY2VuZSdcblxuZXhwb3J0IGNvbnN0IGNvcmUgPSB7XG4gIHN0YWdlOiB7XG4gICAgaXNBc3BlY3RTY2FsZTogZmFsc2UsXG4gICAgY2FudmFzOiBudWxsLCAvLyBzZXQgYnkgaWduaXRlIGludGVybmFsIGVuZ2luZVxuICAgIGdldCByZXNpemUgKCkgeyByZXR1cm4gY29yZS5zdGFnZS5fcmVzaXplIH0sXG4gICAgc2V0IHJlc2l6ZSAoJHJlc2l6ZSkge1xuICAgICAgaWYgKCRyZXNpemUpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNvcmUuc3RhZ2UuX3Jlc2l6ZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBjb3JlLnN0YWdlLl9yZXNpemUpXG4gICAgICB9XG4gICAgfSxcbiAgICBfcmVzaXplICgpIHtcbiAgICAgIGlmIChjb3JlLnN0YWdlLmlzQXNwZWN0U2NhbGUpIHtcbiAgICAgICAgLy8gZmluZCBhc3BlY3QgcmF0aW9cbiAgICAgICAgY29uc3QgcG9ydHJhaXQgPSBjb3JlLnN0YWdlLndpZHRoIDwgY29yZS5zdGFnZS5oZWlnaHRcbiAgICAgICAgbGV0IGFzcGVjdFJhdGlvID0gY29yZS5zdGFnZS53aWR0aCAvIGNvcmUuc3RhZ2UuaGVpZ2h0XG4gICAgICAgIGlmIChwb3J0cmFpdCkge1xuICAgICAgICAgIGFzcGVjdFJhdGlvID0gY29yZS5zdGFnZS5oZWlnaHQgLyBjb3JlLnN0YWdlLndpZHRoXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaW52QXNwZWN0ID0gMS4wIC8gYXNwZWN0UmF0aW9cblxuICAgICAgICAvLyBzY2FsZSB0aGUgY2FudmFzIHRvIGZpdCBlaXRoZXIgd2lkdGggb3IgaGVpZ2h0XG4gICAgICAgIC8vIGJhc2VkIG9uIGludGVycHJldGVkIG9yaWVudGF0aW9uXG5cbiAgICAgICAgaWYgKHBvcnRyYWl0KSB7XG4gICAgICAgICAgY29yZS5zdGFnZS5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgICAgY29yZS5zdGFnZS5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiBpbnZBc3BlY3RcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb3JlLnN0YWdlLmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgICAgY29yZS5zdGFnZS5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVyV2lkdGggKiBpbnZBc3BlY3RcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNjYWxlIHRoZSBzdGFnZVxuICAgICAgICBjb3JlLnN0YWdlLnNjYWxlLnggPSBjb3JlLnN0YWdlLmNhbnZhcy53aWR0aCAvIGNvcmUuc3RhZ2Uud2lkdGhcbiAgICAgICAgY29yZS5zdGFnZS5zY2FsZS55ID0gY29yZS5zdGFnZS5jYW52YXMuaGVpZ2h0IC8gY29yZS5zdGFnZS5oZWlnaHRcblxuICAgICAgICAvLyBjZW50ZXIgdGhlIGNhbnZhc1xuICAgICAgICBjb25zdCBsZWZ0ID0gKCh3aW5kb3cuaW5uZXJXaWR0aCAtIGNvcmUuc3RhZ2UuY2FudmFzLndpZHRoKSAqIDAuNSkgfCAwXG4gICAgICAgIGNvbnN0IHRvcCA9ICgod2luZG93LmlubmVySGVpZ2h0IC0gY29yZS5zdGFnZS5jYW52YXMuaGVpZ2h0KSAqIDAuNSkgfCAwXG4gICAgICAgIE9iamVjdC5hc3NpZ24oY29yZS5zdGFnZS5jYW52YXMuc3R5bGUsIHtcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICBsZWZ0OiBgJHtsZWZ0fXB4YCxcbiAgICAgICAgICB0b3A6IGAke3RvcH1weGBcbiAgICAgICAgfSlcbi8vICAgICAgICAgd2luZG93LmNvbnNvbGUubG9nKGByZXNpemUgbGFuZHNjYXBlXG4vLyBhc3BlY3Q6ICR7YXNwZWN0UmF0aW99XG4vLyBzY2FsZTogeDogJHtjb3JlLnN0YWdlLnNjYWxlLnh9IHk6ICR7Y29yZS5zdGFnZS5zY2FsZS55fVxuLy8gd2luZG93OiAke3dpbmRvdy5pbm5lcldpZHRofSB4ICR7d2luZG93LmlubmVySGVpZ2h0fVxuLy8gY2FudmFzOiAke2NvcmUuc3RhZ2UuY2FudmFzLndpZHRofSB4ICR7Y29yZS5zdGFnZS5jYW52YXMuaGVpZ2h0fVxuLy8gcG9zaXRpb246IHg6ICR7bGVmdH0sIHk6ICR7dG9wfVxuLy8gYCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBmaWxsIHdpbmRvdyBzY2FsaW5nXG4gICAgICAgIGNvcmUuc3RhZ2Uuc2NhbGUueCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gY29yZS5zdGFnZS53aWR0aFxuICAgICAgICBjb3JlLnN0YWdlLnNjYWxlLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyBjb3JlLnN0YWdlLmhlaWdodFxuICAgICAgICBjb3JlLnN0YWdlLmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIGNvcmUuc3RhZ2UuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICBPYmplY3QuYXNzaWduKGNvcmUuc3RhZ2UuY2FudmFzLnN0eWxlLCB7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogYDBweGAsXG4gICAgICAgICAgdG9wOiBgMHB4YFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG4gICAgc2NhbGU6IHtcbiAgICAgIGdldCBhc3BlY3QgKCkgeyByZXR1cm4gY29yZS5zdGFnZS5pc0FzcGVjdFNjYWxlIH0sXG4gICAgICBzZXQgYXNwZWN0IChpc0FzcGVjdFNjYWxlKSB7XG4gICAgICAgIGNvcmUuc3RhZ2UuaXNBc3BlY3RTY2FsZSA9IGlzQXNwZWN0U2NhbGVcbiAgICAgICAgaWYgKGlzQXNwZWN0U2NhbGUpIHtcbiAgICAgICAgICB3aW5kb3cuY29uc29sZS5sb2coJ3NldCBhc3BlY3QgcmF0aW8gc2NhbGluZyBvbiBzdGFnZScpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2luZG93LmNvbnNvbGUubG9nKCdzZXQgZmlsbCBzY2FsaW5nIG9uIHN0YWdlJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyIChjdHgsIGludGVycG9sYXRpb25QZXJjZW50YWdlKSB7XG4gICAgICBjdHguc2F2ZSgpXG4gICAgICBjdHguc2NhbGUoY29yZS5zdGFnZS5zY2FsZS54LCBjb3JlLnN0YWdlLnNjYWxlLnkpXG4gICAgICBpZiAoc2NlbmUuX2JhY2tncm91bmQpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZShzY2VuZS5fYmFja2dyb3VuZCwgMCwgMClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY3R4LmNhbnZhcy53aWR0aCwgY3R4LmNhbnZhcy5oZWlnaHQpXG4gICAgICB9XG5cbiAgICAgIHNjZW5lLl9jdXJyZW50LnJlbmRlci5fZXhlYyhjdHgsIGludGVycG9sYXRpb25QZXJjZW50YWdlKVxuICAgICAgY3R4LnJlc3RvcmUoKVxuICAgIH1cbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBjb25zdCBwb2ludCA9ICh4LCB5KSA9PiB7XG4gIGNvbnN0IHAgPSB7XG4gICAgeCxcbiAgICB5LFxuICAgIHRvU3RyaW5nICgpIHtcbiAgICAgIHJldHVybiBgUG9pbnQoJHtwLnh9LCAke3AueX0pYFxuICAgIH1cbiAgfVxuICByZXR1cm4gcFxufVxuXG5leHBvcnQgY29uc3QgdmVjdG9yID0gKHgsIHkpID0+IHtcbiAgcmV0dXJuIHBvaW50KHgsIHkpXG59XG5cbmV4cG9ydCBjb25zdCBtYWduaXR1ZGUgPSB2ID0+IHtcbiAgcmV0dXJuIE1hdGguc3FydCh2LnggKiB2LnggKyB2LnkgKiB2LnkpXG59XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemUgPSB2ID0+IHtcbiAgY29uc3QgbGVuZ3RoID0gbWFnbml0dWRlKHYpXG4gIGlmIChsZW5ndGggIT09IDApIHtcbiAgICB2LnggLz0gbGVuZ3RoXG4gICAgdi55IC89IGxlbmd0aFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBwZXJwZW5kaWN1bGFyID0gdiA9PiB7XG4gIHJldHVybiBwb2ludCgtdi55LCB2LngpXG59XG5cbmV4cG9ydCBjb25zdCBkb3RQcm9kdWN0ID0gKHYxLCB2MikgPT4ge1xuICByZXR1cm4gdjEueCAqIHYyLnggKyB2MS55ICogdjIueVxufVxuXG5leHBvcnQgY29uc3QgcGVycERvdFByb2R1Y3QgPSAodjEsIHYyKSA9PiB7XG4gIHJldHVybiBkb3RQcm9kdWN0KHBlcnBlbmRpY3VsYXIodjEpLCB2Milcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdm1hdGguanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY29tbW9uIH0gZnJvbSAnLi9jb21tb24nXG5pbXBvcnQgeyBhc3NldCwgcmVzb3VyY2VzIH0gZnJvbSAnLi9yZXNvdXJjZXMnXG5pbXBvcnQgeyBzY2VuZSB9IGZyb20gJy4vc2NlbmUnXG5pbXBvcnQgeyBjdXJzb3IgfSBmcm9tICcuL2N1cnNvcidcbmltcG9ydCB7IG1vdXNlIH0gZnJvbSAnLi9tb3VzZSdcbmltcG9ydCB7IGlnbml0ZSB9IGZyb20gJy4vaWduaXRlJ1xuaW1wb3J0IHsgYWN0b3IgfSBmcm9tICcuL2FjdG9yJ1xuaW1wb3J0IHsgcGh5c2ljcyB9IGZyb20gJy4vcGh5c2ljcydcblxuY29uc3Qgc2NlbmVzID0gc2NlbmUuX3NjZW5lc1xuXG5jb25zdCBhcGkgPSB7XG4gIE5BTUU6ICd+IEYgSSBSIEUgUyBUIEEgUiBUIEUgUiBJSUkgficsXG4gIFZFUlNJT046ICcxLjAuMCcsXG4gIEFVVEhPUjogJ1JpY2hhcmQgTWFya3MgPGNjcHNjZW9AZ21haWwuY29tPicsXG4gIENPUFlSSUdIVDogJzIwMTcsIFJpY2hhcmQgTWFya3MnLFxuICBMSUNFTlNFOiAnTUlUJyxcbiAgY29tbW9uLFxuICByZXNvdXJjZXMsXG4gIGFzc2V0LFxuICBzY2VuZSxcbiAgY3Vyc29yLFxuICBtb3VzZSxcbiAgYWN0b3IsXG4gIHBoeXNpY3MsXG4gIGlnbml0ZSxcbiAgc2NlbmVzXG59XG5cbmV4cG9ydCB7XG4gIGNvbW1vbixcbiAgcmVzb3VyY2VzLFxuICBhc3NldCxcbiAgc2NlbmUsXG4gIGN1cnNvcixcbiAgbW91c2UsXG4gIGFjdG9yLFxuICBwaHlzaWNzLFxuICBpZ25pdGUsXG4gIHNjZW5lc1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcGlcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZjMuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY29yZSB9IGZyb20gJy4vY29yZSdcblxuZXhwb3J0IGNvbnN0IGNvbW1vbiA9IHtcbiAgc2V0IHRpdGxlICgkdGl0bGUpIHtcbiAgICBkb2N1bWVudC50aXRsZSA9ICR0aXRsZVxuICB9LFxuICBzZXQgd2lkdGggKCR3aWR0aCkge1xuICAgIGNvcmUuc3RhZ2Uud2lkdGggPSAkd2lkdGhcbiAgfSxcbiAgc2V0IGhlaWdodCAoJGhlaWdodCkge1xuICAgIGNvcmUuc3RhZ2UuaGVpZ2h0ID0gJGhlaWdodFxuICB9LFxuICBnZXQgd2lkdGggKCkgeyByZXR1cm4gY29yZS5zdGFnZS53aWR0aCB9LFxuICBnZXQgaGVpZ2h0ICgpIHsgcmV0dXJuIGNvcmUuc3RhZ2UuaGVpZ2h0IH0sXG4gIHNjYWxlOiBjb3JlLnN0YWdlLnNjYWxlLFxuICBzZXQgcmVzaXplICgkcmVzaXplKSB7XG4gICAgY29yZS5zdGFnZS5yZXNpemUgPSAkcmVzaXplXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tbW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBjb25zdCByZXNvdXJjZXMgPSB7XG4gIF9hc3NldHM6IHt9LFxuICBsb2FkIChtYW5pZmVzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBmdW5jdGlvbiBsb2FkTmV4dCAobWFuaWZlc3QpIHtcbiAgICAgICAgaWYgKG1hbmlmZXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJlc29sdmUocmVzb3VyY2VzLl9hc3NldHMpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXNzZXQgPSBtYW5pZmVzdC5zaGlmdCgpXG4gICAgICAgIGNvbnN0IGltYWdlID0gbmV3IHdpbmRvdy5JbWFnZSgpXG4gICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICByZXNvdXJjZXMuX2Fzc2V0c1thc3NldC5pZF0gPSBpbWFnZVxuICAgICAgICAgIGxvYWROZXh0KG1hbmlmZXN0KVxuICAgICAgICB9XG4gICAgICAgIGltYWdlLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgVW5hYmxlIHRvIGxvYWQgYXNzZXQgJHthc3NldC5pZH0gZnJvbSAke2Fzc2V0LnNyY31gKSlcbiAgICAgICAgfVxuICAgICAgICBpbWFnZS5zcmMgPSBhc3NldC5zcmNcbiAgICAgIH1cbiAgICAgIGxvYWROZXh0KG1hbmlmZXN0LnNsaWNlKCkpXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYXNzZXQgPSAoaWQsIHNyYykgPT4ge1xuICByZXR1cm4ge1xuICAgIGlkLFxuICAgIHNyYzogYCR7c3JjfT8ke0RhdGUubm93KCl9YFxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgY29uc3QgY3Vyc29yID0ge1xuICBfb3B0aW9uczoge1xuICAgIGNlbnRlcjogZmFsc2VcbiAgfSxcbiAgZ2V0IGNlbnRlciAoKSB7XG4gICAgd2luZG93LmNvbnNvbGUubG9nKCdjdXJzb3IuY2VudGVyJylcbiAgICBjdXJzb3IuX29wdGlvbnMuY2VudGVyID0gdHJ1ZVxuICAgIHJldHVybiBjdXJzb3JcbiAgfSxcbiAgcHJpbnQgKHRleHQpIHtcbiAgICB3aW5kb3cuY29uc29sZS5sb2coYGN1cnNvci5wcmludCAke3RleHR9YClcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBpZiAoY3Vyc29yLl9vcHRpb25zLmNlbnRlcikge1xuICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCB7XG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcidcbiAgICAgIH0pXG4gICAgfVxuICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gdGV4dFxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudClcbiAgICByZXR1cm4gY3Vyc29yXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY3Vyc29yLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBjb25zdCBtb3VzZSA9IHtcbiAgY2xpY2s6IHtcbiAgICBfaGFuZGxlcnM6IFtdLFxuICAgIGFkZCAoaGFuZGxlcikge1xuICAgICAgbW91c2UuY2xpY2suX2hhbmRsZXJzLnB1c2goaGFuZGxlcilcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlcilcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbW91c2UuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgc2NlbmUgfSBmcm9tICcuL3NjZW5lJ1xuaW1wb3J0IHsgY29yZSB9IGZyb20gJy4vY29yZSdcbmltcG9ydCB7IGVuZ2luZSB9IGZyb20gJy4vZW5naW5lJ1xuXG4vLyBjb25zdCByZXF1ZXN0QW5pbUZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTtcbi8vXG4vLyBjb25zdCBlbmdpbmUgPSB7XG4vLyAgIHN0YXJ0KCkge1xuLy8gICAgIGVuZ2luZS5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbi8vICAgICBlbmdpbmUuY2FudmFzLndpZHRoID0gY29yZS5zdGFnZS53aWR0aDtcbi8vICAgICBlbmdpbmUuY2FudmFzLmhlaWdodCA9IGNvcmUuc3RhZ2UuaGVpZ2h0O1xuLy8gICAgIGVuZ2luZS5jdHggPSBlbmdpbmUuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4vLyAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbmdpbmUuY2FudmFzKTtcbi8vICAgICBjb3JlLnN0YWdlLmNhbnZhcyA9IGVuZ2luZS5jYW52YXM7XG4vLyAgICAgY29yZS5zdGFnZS5fcmVzaXplKCk7XG4vLyAgICAgZW5naW5lLmxvb3BGdW5jKCk7XG4vLyAgIH0sXG4vLyAgIGxhc3RUaW1lOiBEYXRlLm5vdygpLFxuLy8gICBsb29wRnVuYygpIHtcbi8vICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuLy8gICAgIGNvbnN0IGRlbHRhVGltZSA9IChub3cgLSBlbmdpbmUubGFzdFRpbWUpICogMC4wMDE7XG4vLyAgICAgZW5naW5lLnVwZGF0ZShkZWx0YVRpbWUpO1xuLy8gICAgIGVuZ2luZS5yZW5kZXIoKTtcbi8vICAgICBlbmdpbmUubGFzdFRpbWUgPSBub3c7XG4vLyAgICAgcmVxdWVzdEFuaW1GcmFtZShlbmdpbmUubG9vcEZ1bmMpO1xuLy8gICB9LFxuLy8gICB1cGRhdGUoZGVsdGFUaW1lKSB7XG4vLyAgICAgc2NlbmUuX2N1cnJlbnQudXBkYXRlLl9leGVjKGRlbHRhVGltZSk7XG4vLyAgIH0sXG4vLyAgIHJlbmRlcigpIHtcbi8vICAgICBjb3JlLnN0YWdlLnJlbmRlcihlbmdpbmUuY3R4KTtcbi8vICAgfSxcbi8vIH07XG5cbmNvbnN0IFNIT1dfRlBTID0gdHJ1ZVxuXG5leHBvcnQgY29uc3QgaWduaXRlID0gKCkgPT4ge1xuICB3aW5kb3cuY29uc29sZS5sb2coJ2ZpcmUgaXQgdXAhJylcbiAgLypcbiAgX29uQmVnaW46IE5PUCwgLy8gYmVnaW4odGltZXN0YW1wOkRPTUhpZ2hSZXNUaW1lU3RhbXAsIGRlbHRhVGltZTpmbG9hdClcbiAgX29uVXBkYXRlOiBOT1AsIC8vIHVwZGF0ZShzaW11bGF0aW9uVGltZXN0ZXA6ZmxvYXQpXG4gIF9vbkRyYXc6IE5PUCwgLy8gZHJhdyhpbnRlcnBvbGF0aW9uUGVyY2VudGFnZTpmbG9hdClcbiAgX29uRW5kOiBOT1AsIC8vIGVuZChmcHM6aW50LCBwYW5pYzpib29sZWFuKVxuICAqL1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICBjYW52YXMud2lkdGggPSBjb3JlLnN0YWdlLndpZHRoXG4gIGNhbnZhcy5oZWlnaHQgPSBjb3JlLnN0YWdlLmhlaWdodFxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcylcbiAgY29yZS5zdGFnZS5jYW52YXMgPSBjYW52YXNcbiAgY29yZS5zdGFnZS5fcmVzaXplKClcblxuICBlbmdpbmUuYmVnaW4gPSAoKSA9PiB7XG5cbiAgfVxuXG4gIGVuZ2luZS5kcmF3ID0gKGludGVycG9sYXRpb25QZXJjZW50YWdlKSA9PiB7XG4gICAgY29yZS5zdGFnZS5yZW5kZXIoY3R4LCBpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSlcbiAgfVxuXG4gIGVuZ2luZS51cGRhdGUgPSAodGltZVN0ZXApID0+IHtcbiAgICBzY2VuZS5fY3VycmVudC51cGRhdGUuX2V4ZWModGltZVN0ZXAgKiAwLjAxKVxuICB9XG5cbiAgaWYgKFNIT1dfRlBTKSB7XG4gICAgZW5naW5lLmVuZCA9IChmcHMsIHBhbmljKSA9PiB7XG4gICAgICBjdHguc2F2ZSgpXG4gICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ2JvdHRvbSdcbiAgICAgIGN0eC5mb250ID0gJzI0cHggc2Fucy1zZXJpZidcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnXG4gICAgICBjdHgubGluZVdpZHRoID0gNFxuICAgICAgY3R4LmZpbGxUZXh0KGBGUFM6ICR7ZW5naW5lLmZwcyB8IDB9YCwgMCwgY2FudmFzLmhlaWdodClcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdibGFjaydcbiAgICAgIGN0eC5zdHJva2VUZXh0KGBGUFM6ICR7ZW5naW5lLmZwcyB8IDB9YCwgMSwgY2FudmFzLmhlaWdodCAtIDEpXG4gICAgICBjdHguZmlsbFRleHQoYEZQUzogJHtlbmdpbmUuZnBzIHwgMH1gLCAwLCBjYW52YXMuaGVpZ2h0KVxuICAgICAgY3R4LnJlc3RvcmUoKVxuICAgICAgaWYgKHBhbmljKSB7XG4gICAgICAgIGNvbnN0IGRpc2NhcmRUaW1lID0gZW5naW5lLnJlc2V0RnJhbWVEZWx0YSgpIHwgMFxuICAgICAgICB3aW5kb3cuY29uc29sZS53YXJuKGBFbmdpbmUgUGFuaWMhIERpc2NhcmRpbmcgJHtkaXNjYXJkVGltZX1tc2ApXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZW5naW5lLnN0YXJ0KClcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vaWduaXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHJBRlBvbHlmaWxsID0gKCkgPT4ge1xuICBjb25zdCBkYXRhID0geyBsYXN0OiAwLCBub3c6IDAsIHRpbWVvdXQ6IDAgfVxuICByZXR1cm4gY2FsbGJhY2sgPT4ge1xuICAgIGRhdGEubm93ID0gRGF0ZS5ub3coKVxuICAgIGRhdGEudGltZW91dCA9IE1hdGgubWF4KDAsICgxMDAwIC8gNjApIC0gKGRhdGEubm93IC0gZGF0YS5sYXN0KSlcbiAgICBkYXRhLmxhc3QgPSBkYXRhLm5vdyArIGRhdGEudGltZW91dFxuICAgIGNvbnN0IG5leHQgPSBkYXRhLm5vdyArIGRhdGEudGltZW91dFxuICAgIHJldHVybiBzZXRUaW1lb3V0KCgpID0+IGNhbGxiYWNrKG5leHQpLCBkYXRhLnRpbWVvdXQpXG4gIH1cbn1cbmNvbnN0IHJlcXVlc3RBbmltRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHJBRlBvbHlmaWxsXG5jb25zdCBjYW5jZWxBbmltRnJhbWUgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgY2xlYXJUaW1lb3V0XG5cbmNvbnN0IE5PUCA9ICgpID0+IHt9XG5leHBvcnQgY29uc3QgZW5naW5lID0ge1xuICBfb25CZWdpbjogTk9QLCAvLyBiZWdpbih0aW1lc3RhbXA6RE9NSGlnaFJlc1RpbWVTdGFtcCwgZGVsdGFUaW1lOmZsb2F0KVxuICBfb25VcGRhdGU6IE5PUCwgLy8gdXBkYXRlKHNpbXVsYXRpb25UaW1lc3RlcDpmbG9hdClcbiAgX29uRHJhdzogTk9QLCAvLyBkcmF3KGludGVycG9sYXRpb25QZXJjZW50YWdlOmZsb2F0KVxuICBfb25FbmQ6IE5PUCwgLy8gZW5kKGZwczppbnQsIHBhbmljOmJvb2xlYW4pXG5cbiAgX2ZyYW1lSGFuZGxlOiBudWxsLFxuICBfc2ltdWxhdGlvblRpbWVzdGVwOiAxMDAwIC8gNjAsXG4gIF9mcmFtZURlbHRhOiAwLFxuICBfbGFzdEZyYW1lVGltZU1zOiAwLFxuICBfZnBzOiA2MCxcbiAgX2xhc3RGcHNVcGRhdGU6IDAsXG4gIF9mcmFtZXNUaGlzU2Vjb25kOiAwLFxuICBfbnVtVXBkYXRlU3RlcHM6IDAsXG4gIF9taW5GcmFtZURlbGF5OiAwLFxuICBfcnVubmluZzogZmFsc2UsXG4gIF9zdGFydGVkOiBmYWxzZSxcbiAgX3BhbmljOiBmYWxzZSxcblxuICBnZXQgZnBzICgpIHsgcmV0dXJuIGVuZ2luZS5fZnBzIH0sXG5cbiAgc2V0IGJlZ2luIChmbikgeyBlbmdpbmUuX29uQmVnaW4gPSBmbiB8fCBlbmdpbmUuX29uQmVnaW4gfSxcbiAgc2V0IHVwZGF0ZSAoZm4pIHsgZW5naW5lLl9vblVwZGF0ZSA9IGZuIHx8IGVuZ2luZS5fb25VcGRhdGUgfSxcbiAgc2V0IGRyYXcgKGZuKSB7IGVuZ2luZS5fb25EcmF3ID0gZm4gfHwgZW5naW5lLl9vbkRyYXcgfSxcbiAgc2V0IGVuZCAoZm4pIHsgZW5naW5lLl9vbkVuZCA9IGZuIHx8IGVuZ2luZS5fb25FbmQgfSxcblxuICByZXNldEZyYW1lRGVsdGEgKCkge1xuICAgIGNvbnN0IHByZXZEZWx0YSA9IGVuZ2luZS5fZnJhbWVEZWx0YVxuICAgIGVuZ2luZS5fZnJhbWVEZWx0YSA9IDBcbiAgICByZXR1cm4gcHJldkRlbHRhXG4gIH0sXG5cbiAgc3RhcnQgKCkge1xuICAgIGlmIChlbmdpbmUuX3N0YXJ0ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBlbmdpbmUuX3N0YXJ0ZWQgPSB0cnVlXG4gICAgZW5naW5lLl9mcmFtZUhhbmRsZSA9IHJlcXVlc3RBbmltRnJhbWUodHMgPT4ge1xuICAgICAgZW5naW5lLl9vbkRyYXcoMSlcbiAgICAgIGVuZ2luZS5fcnVubmluZyA9IHRydWVcbiAgICAgIGVuZ2luZS5fbGFzdEZyYW1lVGltZU1zID0gdHNcbiAgICAgIGVuZ2luZS5fbGFzdEZwc1VwZGF0ZSA9IHRzXG4gICAgICBlbmdpbmUuX2ZyYW1lc1RoaXNTZWNvbmQgPSAwXG4gICAgICBlbmdpbmUuX2ZyYW1lSGFuZGxlID0gcmVxdWVzdEFuaW1GcmFtZShlbmdpbmUuX2FuaW1hdGUuYmluZChlbmdpbmUpKVxuICAgIH0pXG4gIH0sXG5cbiAgc3RvcCAoKSB7XG4gICAgaWYgKCFlbmdpbmUuX3N0YXJ0ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBlbmdpbmUuX3J1bm5pbmcgPSBmYWxzZVxuICAgIGVuZ2luZS5fc3RhcnRlZCA9IGZhbHNlXG4gICAgY2FuY2VsQW5pbUZyYW1lKGVuZ2luZS5fZnJhbWVIYW5kbGUpXG4gIH0sXG5cbiAgX2FuaW1hdGUgKHRzKSB7XG4gICAgZW5naW5lLl9mcmFtZUhhbmRsZSA9IHJlcXVlc3RBbmltRnJhbWUoZW5naW5lLl9hbmltYXRlLmJpbmQoZW5naW5lKSlcbiAgICBpZiAodHMgPCBlbmdpbmUuX2xhc3RGcmFtZVRpbWVNcyArIGVuZ2luZS5fbWluRnJhbWVEZWxheSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGVuZ2luZS5fZnJhbWVEZWx0YSArPSB0cyAtIGVuZ2luZS5fbGFzdEZyYW1lVGltZU1zXG4gICAgZW5naW5lLl9sYXN0RnJhbWVUaW1lTXMgPSB0c1xuICAgIGVuZ2luZS5fb25CZWdpbih0cywgZW5naW5lLl9mcmFtZURlbHRhKVxuICAgIGlmICh0cyA+IHRoaXMuX2xhc3RGcHNVcGRhdGUgKyAxMDAwKSB7XG4gICAgICBlbmdpbmUuX2ZwcyA9IDAuMjUgKiBlbmdpbmUuX2ZyYW1lc1RoaXNTZWNvbmQgKyAwLjc1ICogZW5naW5lLl9mcHNcbiAgICAgIGVuZ2luZS5fbGFzdEZwc1VwZGF0ZSA9IHRzXG4gICAgICBlbmdpbmUuX2ZyYW1lc1RoaXNTZWNvbmQgPSAwXG4gICAgfVxuICAgIGVuZ2luZS5fZnJhbWVzVGhpc1NlY29uZCArPSAxXG4gICAgZW5naW5lLl9udW1VcGRhdGVTdGVwcyA9IDBcbiAgICB3aGlsZSAoZW5naW5lLl9mcmFtZURlbHRhID49IGVuZ2luZS5fc2ltdWxhdGlvblRpbWVzdGVwKSB7XG4gICAgICBlbmdpbmUuX29uVXBkYXRlKGVuZ2luZS5fc2ltdWxhdGlvblRpbWVzdGVwKVxuICAgICAgZW5naW5lLl9mcmFtZURlbHRhIC09IGVuZ2luZS5fc2ltdWxhdGlvblRpbWVzdGVwXG4gICAgICBlbmdpbmUuX251bVVwZGF0ZVN0ZXBzICs9IDFcbiAgICAgIGlmIChlbmdpbmUuX251bVVwZGF0ZVN0ZXBzID49IDI0MCkge1xuICAgICAgICBlbmdpbmUuX3BhbmljID0gdHJ1ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgICBlbmdpbmUuX29uRHJhdyhlbmdpbmUuX2ZyYW1lRGVsdGEgLyBlbmdpbmUuX3NpbXVsYXRpb25UaW1lc3RlcClcbiAgICBlbmdpbmUuX29uRW5kKGVuZ2luZS5fZnBzLCBlbmdpbmUuX3BhbmljKVxuICAgIGVuZ2luZS5fcGFuaWMgPSBmYWxzZVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2VuZ2luZS5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBzY2VuZSB9IGZyb20gJy4vc2NlbmUnXG5cbmV4cG9ydCBjb25zdCBhY3RvciA9IChpZCwgaW1hZ2UpID0+IHtcbiAgd2luZG93LmNvbnNvbGUubG9nKGBcbmNyZWF0aW5nIGFjdG9yICR7aWR9XG4gIGltYWdlOiAke2ltYWdlLnNyYy5zdWJzdHJpbmcoaW1hZ2Uuc3JjLmluZGV4T2YoJy8nKSl9XG4gIHdpZHRoOiAke2ltYWdlLndpZHRofVxuICBoZWlnaHQ6ICR7aW1hZ2UuaGVpZ2h0fVxuICBgKVxuICBjb25zdCBhY3Rvckluc3QgPSB7XG4gICAgaWQsXG4gICAgaW1hZ2UsXG4gICAgX3g6IDAsXG4gICAgX3k6IDAsXG4gICAgc2V0IHggKCR4KSB7IGFjdG9ySW5zdC5feCA9ICR4OyBhY3Rvckluc3QuX3ByZXZYID0gJHggfSxcbiAgICBnZXQgeCAoKSB7IHJldHVybiBhY3Rvckluc3QuX3ggfSxcbiAgICBzZXQgeSAoJHkpIHsgYWN0b3JJbnN0Ll95ID0gJHk7IGFjdG9ySW5zdC5fcHJldlkgPSAkeSB9LFxuICAgIGdldCB5ICgpIHsgcmV0dXJuIGFjdG9ySW5zdC5feSB9LFxuICAgIF9wcmV2WDogMCxcbiAgICBfcHJldlk6IDAsXG4gICAgd2lkdGg6IGltYWdlLndpZHRoLFxuICAgIGhlaWdodDogaW1hZ2UuaGVpZ2h0LFxuICAgIHNldCBwaHlzaWNzICgkcCkge1xuICAgICAgYWN0b3JJbnN0Ll9waHlzaWNzID0gJHBcbiAgICAgIGlmICgkcCkge1xuICAgICAgICAkcC5zZXR1cChhY3Rvckluc3QpXG4gICAgICB9XG4gICAgfSxcbiAgICBfdXBkYXRlcnM6IFtdLFxuICAgIF9yZW5kZXJlcnM6IFtdLFxuICAgIHVwZGF0ZToge1xuICAgICAgYWRkICh1cGRhdGVyKSB7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhgYWRkaW5nIHVwZGF0ZXIgdG8gYWN0b3IgJHthY3Rvckluc3QuaWR9YClcbiAgICAgICAgYWN0b3JJbnN0Ll91cGRhdGVycy5wdXNoKHVwZGF0ZXIpXG4gICAgICB9LFxuICAgICAgX2V4ZWMgKGRlbHRhVGltZSkge1xuICAgICAgICBhY3Rvckluc3QuX3VwZGF0ZXJzLmZvckVhY2godXBkYXRlciA9PiB1cGRhdGVyKGRlbHRhVGltZSkpXG4gICAgICAgIGFjdG9ySW5zdC5fcHJldlggPSBhY3Rvckluc3QueFxuICAgICAgICBhY3Rvckluc3QuX3ByZXZZID0gYWN0b3JJbnN0LnlcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlbmRlcjoge1xuICAgICAgYWRkIChyZW5kZXJlcikge1xuICAgICAgICB3aW5kb3cuY29uc29sZS5sb2coYGFkZGluZyByZW5kZXJlciB0byBhY3RvciAke2FjdG9ySW5zdC5pZH1gKVxuICAgICAgICBhY3Rvckluc3QuX3JlbmRlcmVycy5wdXNoKHJlbmRlcmVyKVxuICAgICAgfSxcbiAgICAgIF9leGVjIChjb250ZXh0LCBpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSkge1xuICAgICAgICBjb25zdCB4ID0gYWN0b3JJbnN0Ll9wcmV2WCArIChhY3Rvckluc3QuX3ggLSBhY3Rvckluc3QuX3ByZXZYKSAqIGludGVycG9sYXRpb25QZXJjZW50YWdlXG4gICAgICAgIGNvbnN0IHkgPSBhY3Rvckluc3QuX3ByZXZZICsgKGFjdG9ySW5zdC5feSAtIGFjdG9ySW5zdC5fcHJldlkpICogaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2VcbiAgICAgICAgY29udGV4dC5zYXZlKClcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoYWN0b3JJbnN0LmltYWdlLCB4LCB5KVxuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKVxuICAgICAgICBhY3Rvckluc3QuX3JlbmRlcmVycy5mb3JFYWNoKHJlbmRlcmVyID0+IHJlbmRlcmVyKGNvbnRleHQsIGludGVycG9sYXRpb25QZXJjZW50YWdlKSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc2NlbmUuX2N1cnJlbnQuX2FjdG9ycy5wdXNoKGFjdG9ySW5zdClcbiAgcmV0dXJuIGFjdG9ySW5zdFxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hY3Rvci5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgcG9pbnQgfSBmcm9tICcuL3ZtYXRoJ1xuaW1wb3J0IHsgYm9keSB9IGZyb20gJy4vcGUnXG5cbmNvbnN0IGFkZFBoeXNpY3NNb2RlbFRvQWN0b3IgPSBhY3RvciA9PiB7XG4gIGlmICghYWN0b3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGFuIGFjdG9yIGluc3RhbmNlLCBub3QgJHthY3Rvcn1gKVxuICB9XG5cbiAgLy8gcGh5c2ljcyBib2R5XG4gIGFjdG9yLmJvZHkgPSBib2R5KGFjdG9yKVxuXG4gIGFjdG9yLmJvZHkuYXBwbHlGcmljdGlvbig5LjgpXG5cbiAgLy8gYWRkIHBoeXNpY3MgbWV0aG9kc1xuICBhY3Rvci5mb3JjZSA9IHtcbiAgICBhZGQgKHgsIHkpIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhgYWRkaW5nIHBoeXNpY3MgZm9yY2UgWyR7eH0sICR7eX1dIHRvIGFjdG9yICR7YWN0b3IuaWR9YClcbiAgICAgIGFjdG9yLmJvZHkuYXBwbHlMaW5lYXJGb3JjZShwb2ludCh4LCB5KSlcbiAgICB9XG4gIH1cblxuICBhY3Rvci5ncmF2aXR5ID0ge1xuICAgIHNldCB5IChnKSB7XG4gICAgICBhY3Rvci5ib2R5LmFwcGx5R3Jhdml0eShnKVxuICAgICAgYWN0b3IuZ3Jhdml0eS5feSA9IGdcbiAgICB9LFxuICAgIGdldCB5ICgpIHsgcmV0dXJuIGFjdG9yLmdyYXZpdHkuX3kgfVxuICB9XG5cbiAgLy8gYWRkIHBoeXNpY3Mgc3RlcCB0byB1cGRhdGVzXG4gIGFjdG9yLnVwZGF0ZS5hZGQoZGVsdGFUaW1lID0+IHtcbiAgICBhY3Rvci5ib2R5LnVwZGF0ZShkZWx0YVRpbWUpXG4gICAgYWN0b3IuYm9keS5hcHBseUdyYXZpdHkoYWN0b3IuZ3Jhdml0eS55KVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgcGh5c2ljcyA9IHtcbiAga2luZXRpYzoge1xuICAgIHNldHVwIChhY3Rvcikge1xuICAgICAgd2luZG93LmNvbnNvbGUubG9nKGBlbmFibGluZyBraW5ldGljIHBoeXNpY3MgZm9yIGFjdG9yICR7YWN0b3IuaWR9YClcbiAgICAgIGFkZFBoeXNpY3NNb2RlbFRvQWN0b3IoYWN0b3IpXG4gICAgfVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3BoeXNpY3MuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7XG4gIHBvaW50LFxuICBtYWduaXR1ZGUsXG4gIG5vcm1hbGl6ZSxcbiAgZG90UHJvZHVjdCxcbiAgcGVycERvdFByb2R1Y3Rcbn0gZnJvbSAnLi92bWF0aCdcblxuZXhwb3J0IGNvbnN0IGJvZHkgPSBhY3RvciA9PiB7XG4gIGNvbnN0IGJvZHlJbnN0ID0ge1xuICAgIGNlbnRlck9mTWFzczogcG9pbnQoMCwgMCksXG4gICAgbWFzczogMTAuMCxcbiAgICBpbmVydGlhOiAwLjAsXG4gICAgc3RhdGljRnJpY3Rpb25Db2VmZmljaWVudDogMC43LFxuICAgIGtpbmV0aWNGcmljdGlvbkNvZWZmaWNpZW50OiAwLjYsXG4gICAgY29lZmZpY2llbnRPZlJlc3RpdHV0aW9uOiAwLjQsXG4gICAgbGluZWFyVmVsb2NpdHk6IHBvaW50KDAsIDApLFxuICAgIG9yaWVudGF0aW9uOiAwLjAsXG4gICAgYW5ndWxhclZlbG9jaXR5OiAwLjAsXG4gICAgdG90YWxGb3JjZTogcG9pbnQoMCwgMCksXG4gICAgdG90YWxUb3JxdWU6IDAuMCxcbiAgICBmcmljdGlvbkZvcmNlOiBwb2ludCgwLCAwKSxcbiAgICB0b3RhbEltcHVsc2U6IDAuMCxcblxuICAgIHVwZGF0ZVBvc2l0aW9uIChkZWx0YVRpbWUpIHtcbiAgICAgIGJvZHlJbnN0LmxpbmVhclZlbG9jaXR5LnggKz0gKGJvZHlJbnN0LnRvdGFsRm9yY2UueCAvIGJvZHlJbnN0Lm1hc3MpICogZGVsdGFUaW1lXG4gICAgICBib2R5SW5zdC5saW5lYXJWZWxvY2l0eS55ICs9IChib2R5SW5zdC50b3RhbEZvcmNlLnkgLyBib2R5SW5zdC5tYXNzKSAqIGRlbHRhVGltZVxuICAgICAgYWN0b3IueCArPSBib2R5SW5zdC5saW5lYXJWZWxvY2l0eS54ICogZGVsdGFUaW1lXG4gICAgICBhY3Rvci55ICs9IGJvZHlJbnN0LmxpbmVhclZlbG9jaXR5LnkgKiBkZWx0YVRpbWVcbiAgICB9LFxuXG4gICAgdXBkYXRlUm90YXRpb24gKGRlbHRhVGltZSkge1xuICAgICAgYm9keUluc3QuYW5ndWxhclZlbG9jaXR5ICs9IChib2R5SW5zdC50b3RhbFRvcnF1ZSAvIGJvZHlJbnN0LmluZXJ0aWEpICogZGVsdGFUaW1lXG4gICAgICBib2R5SW5zdC5vcmllbnRhdGlvbiArPSBib2R5SW5zdC5hbmd1bGFyVmVsb2NpdHkgKiBkZWx0YVRpbWVcbiAgICB9LFxuXG4gICAgdXBkYXRlRnJpY3Rpb24gKGRlbHRhVGltZSkge1xuICAgICAgY29uc3QgZnJpY3Rpb24gPSBwb2ludChcbiAgICAgICAgKGJvZHlJbnN0LmZyaWN0aW9uRm9yY2UueCAvIGJvZHlJbnN0Lm1hc3MpICogZGVsdGFUaW1lLFxuICAgICAgICAoYm9keUluc3QuZnJpY3Rpb25Gb3JjZS55IC8gYm9keUluc3QubWFzcykgKiBkZWx0YVRpbWUpXG5cbiAgICAgIC8vIGFwcGxpZXMgZnJpY3Rpb24gdG8gbGluZWFyIHZlbG9jaXR5XG4gICAgICAvLyBvbmx5IGlmIHRoZSBib2R5IHdpbGwgbm90IG1vdmUgYnkgdGhlIGludGVncmF0aW9uXG4gICAgICBpZiAoTWF0aC5hYnMoYm9keUluc3QubGluZWFyVmVsb2NpdHkueCkgPj0gTWF0aC5hYnMoZnJpY3Rpb24ueCkpIHtcbiAgICAgICAgYm9keUluc3QubGluZWFyVmVsb2NpdHkueCArPSBmcmljdGlvbi54XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2R5SW5zdC5saW5lYXJWZWxvY2l0eS54ID0gMFxuICAgICAgfVxuXG4gICAgICBpZiAoTWF0aC5hYnMoYm9keUluc3QubGluZWFyVmVsb2NpdHkueSkgPj0gTWF0aC5hYnMoZnJpY3Rpb24ueSkpIHtcbiAgICAgICAgYm9keUluc3QubGluZWFyVmVsb2NpdHkueSArPSBmcmljdGlvbi55XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBib2R5SW5zdC5saW5lYXJWZWxvY2l0eS55ID0gMFxuICAgICAgfVxuXG4gICAgICAvLyBhcHBseSBkYW1waW5nXG4gICAgICBpZiAoTWF0aC5hYnMoYm9keUluc3QubGluZWFyVmVsb2NpdHkueCkgPD0gMC4xKSB7XG4gICAgICAgIGJvZHlJbnN0LmxpbmVhclZlbG9jaXR5LnggPSAwXG4gICAgICB9XG5cbiAgICAgIGlmIChNYXRoLmFicyhib2R5SW5zdC5saW5lYXJWZWxvY2l0eS55KSA8PSAwLjEpIHtcbiAgICAgICAgYm9keUluc3QubGluZWFyVmVsb2NpdHkueSA9IDBcbiAgICAgIH1cblxuICAgICAgLy8gZGFtcGluZyBmb3Igcm90YXRpb24gc2luY2UgZnJpY3Rpb24gZG9lcyBub3QgYWZmZWN0IHJvdGF0aW9uXG4gICAgICBib2R5SW5zdC5hbmd1bGFyVmVsb2NpdHkgKj0gMC45OTVcbiAgICB9LFxuXG4gICAgdXBkYXRlIChkZWx0YVRpbWUpIHtcbiAgICAgIGJvZHlJbnN0LnVwZGF0ZVBvc2l0aW9uKGRlbHRhVGltZSlcbiAgICAgIGJvZHlJbnN0LnVwZGF0ZVJvdGF0aW9uKGRlbHRhVGltZSlcbiAgICAgIGJvZHlJbnN0LnVwZGF0ZUZyaWN0aW9uKGRlbHRhVGltZSlcbiAgICAgIGJvZHlJbnN0LnJlc2V0Rm9yY2VzKClcbiAgICB9LFxuXG4gICAgcmVzZXRGb3JjZXMgKCkge1xuICAgICAgYm9keUluc3QudG90YWxUb3JxdWUgPSAwLjBcbiAgICAgIGJvZHlJbnN0LnRvdGFsSW1wdWxzZSA9IDAuMFxuICAgICAgYm9keUluc3QudG90YWxGb3JjZS54ID0gMC4wXG4gICAgICBib2R5SW5zdC50b3RhbEZvcmNlLnkgPSAwLjBcbiAgICAgIGJvZHlJbnN0LmZyaWN0aW9uRm9yY2UueCA9IDAuMFxuICAgICAgYm9keUluc3QuZnJpY3Rpb25Gb3JjZS55ID0gMC4wXG4gICAgfSxcblxuICAgIGFwcGx5TGluZWFyRm9yY2UgKGZvcmNlKSB7XG4gICAgICBib2R5SW5zdC50b3RhbEZvcmNlLnggKz0gZm9yY2UueFxuICAgICAgYm9keUluc3QudG90YWxGb3JjZS55ICs9IGZvcmNlLnlcbiAgICB9LFxuXG4gICAgYXBwbHlUb3JxdWUgKHRvcnF1ZSkge1xuICAgICAgYm9keUluc3QudG90YWxUb3JxdWUgKz0gdG9ycXVlXG4gICAgfSxcblxuICAgIGFwcGx5Rm9yY2UgKGZvcmNlLCBwb2ludE9mQ29udGFjdCkge1xuICAgICAgYm9keUluc3QudG90YWxGb3JjZS54ICs9IGZvcmNlLnhcbiAgICAgIGJvZHlJbnN0LnRvdGFsRm9yY2UueSArPSBmb3JjZS55XG4gICAgICBjb25zdCBhcm0gPSBwb2ludCgwLCAwKVxuICAgICAgYXJtLnggPSBwb2ludE9mQ29udGFjdC54IC0gYm9keUluc3QuY2VudGVyT2ZNYXNzLnhcbiAgICAgIGFybS55ID0gcG9pbnRPZkNvbnRhY3QueSAtIGJvZHlJbnN0LmNlbnRlck9mTWFzcy55XG4gICAgICBib2R5SW5zdC50b3RhbFRvcnF1ZSArPSBwZXJwRG90UHJvZHVjdChhcm0sIGZvcmNlKVxuICAgIH0sXG5cbiAgICBhcHBseUdyYXZpdHkgKGdyYXZpdHkgPSA5LjgpIHtcbiAgICAgIGJvZHlJbnN0LmFwcGx5TGluZWFyRm9yY2UocG9pbnQoMCwgZ3Jhdml0eSAqIGJvZHlJbnN0Lm1hc3MpKVxuICAgIH0sXG5cbiAgICBhcHBseUZyaWN0aW9uIChncmF2aXR5KSB7XG4gICAgICBsZXQgZnJpY3Rpb24gPSBudWxsXG4gICAgICBpZiAobWFnbml0dWRlKGJvZHlJbnN0LmxpbmVhclZlbG9jaXR5KSA8IDEuMCkge1xuICAgICAgICBmcmljdGlvbiA9IHBvaW50KGJvZHlJbnN0LnRvdGFsRm9yY2UueCwgYm9keUluc3QudG90YWxGb3JjZS55KVxuICAgICAgICBub3JtYWxpemUoZnJpY3Rpb24pXG4gICAgICAgIGNvbnN0IGZhY3RvciA9IC0oYm9keUluc3QubWFzcyAqIGdyYXZpdHkpICogYm9keUluc3Quc3RhdGljRnJpY3Rpb25Db2VmZmljaWVudFxuICAgICAgICBmcmljdGlvbi54ICo9IGZhY3RvclxuICAgICAgICBmcmljdGlvbi55ICo9IGZhY3RvclxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnJpY3Rpb24gPSBwb2ludChib2R5SW5zdC5saW5lYXJWZWxvY2l0eS54LCBib2R5SW5zdC5saW5lYXJWZWxvY2l0eS55KVxuICAgICAgICBub3JtYWxpemUoZnJpY3Rpb24pXG4gICAgICAgIGNvbnN0IGZhY3RvciA9IC0oYm9keUluc3QubWFzcyAqIGdyYXZpdHkpICogYm9keUluc3Qua2luZXRpY0ZyaWN0aW9uQ29lZmZpY2llbnRcbiAgICAgICAgZnJpY3Rpb24ueCAqPSBmYWN0b3JcbiAgICAgICAgZnJpY3Rpb24ueSAqPSBmYWN0b3JcbiAgICAgIH1cbiAgICAgIGJvZHlJbnN0LmZyaWN0aW9uRm9yY2UueCArPSBmcmljdGlvbi54XG4gICAgICBib2R5SW5zdC5mcmljdGlvbkZvcmNlLnkgKz0gZnJpY3Rpb24ueVxuICAgIH0sXG5cbiAgICBoYW5kbGVDb2xsaXNpb24gKG90aGVyQm9keSwgY29sbGlzaW9uTm9ybWFsKSB7XG4gICAgICBub3JtYWxpemUoY29sbGlzaW9uTm9ybWFsKVxuICAgICAgY29uc3QgcmVsYXRpdmVWZWxvY2l0eSA9IHBvaW50KFxuICAgICAgICBib2R5SW5zdC5saW5lYXJWZWxvY2l0eS54IC0gb3RoZXJCb2R5LmxpbmVhclZlbG9jaXR5LngsXG4gICAgICAgIGJvZHlJbnN0LmxpbmVhclZlbG9jaXR5LnkgLSBvdGhlckJvZHkubGluZWFyVmVsb2NpdHkueSlcbiAgICAgIHJlbGF0aXZlVmVsb2NpdHkueCAqPSAtKDEgKyBib2R5SW5zdC5jb2VmZmljaWVudE9mUmVzdGl0dXRpb24pXG4gICAgICByZWxhdGl2ZVZlbG9jaXR5LnkgKj0gLSgxICsgYm9keUluc3QuY29lZmZpY2llbnRPZlJlc3RpdHV0aW9uKVxuICAgICAgY29uc3QgaW52U3VtT2ZNYXNzID0gKDEgLyBib2R5SW5zdC5tYXNzKSArICgxIC8gb3RoZXJCb2R5Lm1hc3MpXG4gICAgICBjb25zdCBpbXB1bHNlQSA9IGRvdFByb2R1Y3QocmVsYXRpdmVWZWxvY2l0eSwgY29sbGlzaW9uTm9ybWFsKVxuICAgICAgY29uc3QgaW1wdWxzZVYgPSBwb2ludChcbiAgICAgICAgY29sbGlzaW9uTm9ybWFsLnggKiBpbnZTdW1PZk1hc3MsXG4gICAgICAgIGNvbGxpc2lvbk5vcm1hbC55ICogaW52U3VtT2ZNYXNzKVxuICAgICAgY29uc3QgaW1wdWxzZUIgPSBkb3RQcm9kdWN0KGNvbGxpc2lvbk5vcm1hbCwgaW1wdWxzZVYpXG4gICAgICBjb25zdCBpbXB1bHNlID0gaW1wdWxzZUEgLyBpbXB1bHNlQlxuICAgICAgY29uc3QgbGluZWFyVmVsb2NpdHlGYWN0b3IgPSBpbXB1bHNlIC8gYm9keUluc3QubWFzc1xuICAgICAgY29uc3Qgb3RoZXJMaW5lYXJWZWxvY2l0eUZhY3RvciA9IGltcHVsc2UgLyBvdGhlckJvZHkubWFzc1xuICAgICAgYm9keUluc3QubGluZWFyVmVsb2NpdHkueCArPSBjb2xsaXNpb25Ob3JtYWwueCAqIGxpbmVhclZlbG9jaXR5RmFjdG9yXG4gICAgICBib2R5SW5zdC5saW5lYXJWZWxvY2l0eS55ICs9IGNvbGxpc2lvbk5vcm1hbC55ICogbGluZWFyVmVsb2NpdHlGYWN0b3JcbiAgICAgIG90aGVyQm9keS5saW5lYXJWZWxvY2l0eS54ICs9IGNvbGxpc2lvbk5vcm1hbC54ICogb3RoZXJMaW5lYXJWZWxvY2l0eUZhY3RvclxuICAgICAgb3RoZXJCb2R5LmxpbmVhclZlbG9jaXR5LnkgKz0gY29sbGlzaW9uTm9ybWFsLnkgKiBvdGhlckxpbmVhclZlbG9jaXR5RmFjdG9yXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJvZHlJbnN0XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3BlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9