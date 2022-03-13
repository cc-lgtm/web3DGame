import {
  Engine,
  Scene,
  FollowCamera,
  Vector3
} from 'babylonjs'
import { GameSound } from './sound/GameSound'

export async function createScene(engine: Engine, canvas: HTMLCanvasElement): Promise<Scene> {
  const scene = new Scene(engine)
  const camera = new FollowCamera('mainCamera', new Vector3(1, 1, 1), scene)
  camera.attachControl(true)

  const sound = new GameSound(scene)
  sound.mainSound(false, {
    loop: true,
    autoplay: true
  })

  return scene
}
