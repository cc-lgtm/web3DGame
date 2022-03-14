import {
  Scene
} from 'babylonjs'
import {
  Button,
  AdvancedDynamicTexture,
  StackPanel,
  Control,
  Image
} from 'babylonjs-gui'

export class GameGUI {
  private scene: Scene;
  constructor(scene: Scene) {
    this.scene = scene
  }
  private createButton(
    btnName: string,
    btnText: string,
    callback: () => void
  ): Button {
    const button = Button.CreateSimpleButton(btnName, btnText)
    button.paddingTop = "10px"
    button.width = "100px"
    button.height = "50px"
    button.color = '#34495e'
    button.background = '#7f8c8d'
    button.onPointerDownObservable.add(callback)
    return button
  }
  mainMenu() {
    const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI")
    const UiPanel = new StackPanel()
    UiPanel.width = "100%"
    UiPanel.fontSize = "14px"
    UiPanel.top = '200px'
    UiPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    UiPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
    advancedTexture.addControl(UiPanel)
    const startButton = this.createButton('startButton', '开始游戏', () => {
    })
    const continueButton = this.createButton('continueButton', '继续游戏', () => {
    })
    const settingButton = this.createButton('settingButton', '设置', () => {
    })
    const aboutButton = this.createButton('aboutButton', '关于', () => {
    })

    UiPanel.addControl(startButton)
    UiPanel.addControl(continueButton)
    UiPanel.addControl(settingButton)
    UiPanel.addControl(aboutButton)
  }
}
