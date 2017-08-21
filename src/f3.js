import { common } from './common'
import { asset, resources } from './resources'
import { scene } from './scene'
import { cursor } from './cursor'
import { mouse } from './mouse'
import { ignite } from './ignite'
import { actor } from './actor'
import { physics } from './physics'

const scenes = scene._scenes

const api = {
  NAME: '~ F I R E S T A R T E R III ~',
  VERSION: '1.0.0',
  AUTHOR: 'Richard Marks <ccpsceo@gmail.com>',
  COPYRIGHT: '2017, Richard Marks',
  LICENSE: 'MIT',
  common,
  resources,
  asset,
  scene,
  cursor,
  mouse,
  actor,
  physics,
  ignite,
  scenes
}

export {
  common,
  resources,
  asset,
  scene,
  cursor,
  mouse,
  actor,
  physics,
  ignite,
  scenes
}

export default api
