import {
  Scene
} from 'babylonjs'

export class MainScene {
  private scene;
  constructor(scene: Scene) {
    this.scene = scene
  }
  loadScene(cb: () => void | null, status: boolean) {
    status && cb()
  }
}
