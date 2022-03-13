import {
  Scene
} from 'babylonjs'
import {
  Button
} from 'babylonjs-gui'

export class GameGUI {
  private scene: Scene;
  constructor(scene: Scene) {
    this.scene = scene
  }
  mainMenu() {
    const startButton = Button.CreateImageButton('startButton', '开始游戏', '')
    const continueButton = Button.CreateImageButton('continueButton', '继续游戏', '')
  }
}
