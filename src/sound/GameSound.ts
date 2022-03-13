import {
  Scene,
  Sound
} from 'babylonjs'

export class GameSound {
  private scene: Scene;
  constructor(scene: Scene) {
    this.scene = scene
  }
  mainSound(status: boolean, options: {
    loop: boolean,
    autoplay?: boolean
  }) {
    if (status) {
      const mainBGM = new Sound('mainBGM', '/src/assets/sounds/mainSound.mp3', this.scene, null, options)
      mainBGM.play()
    }
  }
}
