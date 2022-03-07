import {
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Engine,
  Sound,
  Tools,
  Color3,
  Vector4,
  StandardMaterial,
  Texture,
  Mesh,
  SceneLoader,
} from 'babylonjs'

import * as earcut from "earcut";
(window as any).earcut = earcut;
import { buildCar } from './build/buildCar'

const createScene = (engine: Engine): Scene => {
  // 场景
  const scene = new Scene(engine)
  // 相机
  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new Vector3(0, 0, 0), scene)
  camera.attachControl(canvas, true)

  // 面
  const faceUV: Vector4[] = []
  faceUV[0] = new Vector4(0.5, 0.0, 0.75, 1.0) //rear face
  faceUV[1] = new Vector4(0.0, 0.0, 0.25, 1.0) //front face
  faceUV[2] = new Vector4(0.25, 0, 0.5, 1.0) //right side
  faceUV[3] = new Vector4(0.75, 0, 1.0, 1.0) //left side

  // 几何体
  const box = MeshBuilder.CreateBox("box", {faceUV: faceUV, wrap: true}, scene)
  // box.scaling = new Vector3(2, 1.5, 3) // 缩放比例
  // box.position = new Vector3(-2, 4.2, 0.1) // 位置

  // box.rotation.y = Math.PI / 4 // 旋转
  // box.rotation.y = Tools.ToRadians(45)

  // 地面材质
  const ground = MeshBuilder.CreateGround("ground", {width:10, height:10})
  box.position.y = 0.5

  // 屋顶
  const roof = MeshBuilder.CreateCylinder('roof', {diameter: 1.3, height: 1.2, tessellation: 3})
  roof.scaling.x = 0.75
  roof.rotation.z = Math.PI / 2
  roof.position.y = 1.22

  // 灯光
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene)
  // 声音
  // const home_bg_sound = new Sound("sound", '/src/sound/home_bg.wav', scene, null, {loop: true, autoplay: true})
  // home_bg_sound.play()

  // 材质纹理
  const groundMat = new StandardMaterial("groundMat", scene)
  groundMat.diffuseColor = new Color3(0, 1, 0)
  ground.material = groundMat

  const roofMat = new StandardMaterial("roofMat", scene)
  roofMat.diffuseTexture = new Texture('https://assets.babylonjs.com/environments/roof.jpg', scene)
  const boxMat = new StandardMaterial("boxMat", scene)
  boxMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/cubehouse.png", scene)

  const houseMat = new StandardMaterial("houseMat", scene)
  houseMat.diffuseTexture = new Texture('https://assets.babylonjs.com/environments/cubehouse.png', scene)

  // 组合材质
  const house = Mesh.MergeMeshes([box, roof], false, false, undefined, undefined, undefined)
  house!.position.x = 3

  roof.material = roofMat
  box.material = boxMat
  house!.material = houseMat

  // 复制网格
  // const places = [
  //   [1, 2, 3],
  //   [4, 5, 6],
  //   [7, 8, 9]
  // ]
  // let house;
  // for (let i = 0; i < places.length - 1; i++) {
    const houseClone = house!.clone("house")
    houseClone.rotation.y = 1
    houseClone.position.x = 2
    houseClone.position.z = 3

    scene.addMesh(houseClone)
  // }

  SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon").then(res => {
    console.log(res.meshes)
    res.meshes.map((meshe, index) => {
      if (index === 2) {
        meshe.position.x = 3
        meshe.position.z = -3
        return
      }
      meshe.position.x = -index - 2
    })
  })

  // buildCar
  const car = buildCar(scene)
  car.position.x = 4
  car.position.y = 0.25
  car.rotation.x = -10

  SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "car.babylon").then((res) =>  {
    const wheelRB = scene.getMeshByName("wheelRB");
    const wheelRF = scene.getMeshByName("wheelRF");
    const wheelLB = scene.getMeshByName("wheelLB");
    const wheelLF = scene.getMeshByName("wheelLF");
    scene.beginAnimation(wheelRB, 0, 30, true);
    scene.beginAnimation(wheelRF, 0, 30, true);
    scene.beginAnimation(wheelLB, 0, 30, true);
    scene.beginAnimation(wheelLF, 0, 30, true);
  });

  scene.addMesh(box)
  scene.addLight(light)
  scene.addMesh(ground)

//   BabylonViewer.viewerManager.getViewerPromiseById('myViewer').then((viewer) => {
//     viewer.onSceneInitObservable.add(() => {
//         viewer.sceneManager.camera.radius = 15; //set camera radius
//         viewer.sceneManager.camera.beta = Math.PI / 2.2; //angle of depression
//     });
//     viewer.onEngineInitObservable.add((scene) => {
//         viewer.loadModel({
//             url: "path to model file"
//         });
//     });
// });

  // const outline = [
  //   new Vector3(-0.3, 0, -0.1),
  //   new Vector3(0.2, 0, -0.1),
  // ]

  // //curved front
  // for (let i = 0; i < 20; i++) {
  //   outline.push(new Vector3(0.2 * Math.cos(i * Math.PI / 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1));
  // }

  // //top
  // outline.push(new Vector3(0, 0, 0.1));
  // outline.push(new Vector3(-0.3, 0, 0.1));
  // const car = MeshBuilder.ExtrudePolygon("car", {shape: outline, depth: 0.2})

  // const wheelRB = MeshBuilder.CreateCylinder("wheelRB", {diameter: 0.125, height: 0.05})
  // wheelRB.parent = car;
  // wheelRB.position.z = -0.1;
  // wheelRB.position.x = -0.2;
  // wheelRB.position.y = 0.035;

  // const wheelRF = wheelRB.clone("wheelRF");
  // wheelRF.position.x = 0.1;

  // const wheelLB = wheelRB.clone("wheelLB");
  // wheelLB.position.y = -0.2 - 0.035;

  // const wheelLF = wheelRF.clone("wheelLF");
  // wheelLF.position.y = -0.2 - 0.035;

  return scene
}

const canvas = document.querySelector<HTMLCanvasElement>('#container')
// 创建渲染器
const engine = new Engine(canvas)
const scene = createScene(engine)

// 渲染
engine.runRenderLoop(() => {
  scene.render()
})
