import {
  Vector3,
  MeshBuilder,
  Mesh,
  Scene,
  Vector4,
  StandardMaterial,
  Texture
} from "babylonjs"

export function buildCar(scene: Scene): Mesh {
  const outline: Vector3[] = [
    new Vector3(-0.3, 0, -0.1),
    new Vector3(0.2, 0, -0.1)
  ]

  for (let i = 0; i < 20; i++) {
    outline.push(new Vector3(0.2 * Math.cos(i * Math.PI / 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1))
  }

  outline.push(new Vector3(0, 0, 0.1))
  outline.push(new Vector3(-0.3, 0, 0.1))

  const faceUV: Vector4[] = []
  faceUV[0] = new Vector4(0, 0.5, 0.38, 1)
  faceUV[1] = new Vector4(0, 0, 1, 0.5)
  faceUV[2] = new Vector4(0.38, 1, 0, 0.5)

  const carMat = new StandardMaterial("carMat", scene)
  carMat.diffuseTexture = new Texture('src/material/car.png', scene)

  const car = MeshBuilder.ExtrudePolygon("car", {shape: outline, depth: 0.2, faceUV: faceUV, wrap: true}, scene)
  car.material = carMat

  const wheelUV: Vector4[] = []
  wheelUV[0] = new Vector4(0, 0, 1, 1)
  wheelUV[1] = new Vector4(0, 0.5, 0, 0.5)
  wheelUV[2] = new Vector4(0, 0, 1, 1)

  const wheelMat = new StandardMaterial("wheelMat", scene)
  wheelMat.diffuseTexture = new Texture('src/material/wheel.png', scene)

  const wheelRB = MeshBuilder.CreateCylinder("wheelRB", {diameter: 0.125, height: 0.05, faceUV: wheelUV})
  wheelRB.material = wheelMat
  wheelRB.parent = car
  wheelRB.position.z = -0.1
  wheelRB.position.x = -0.2
  wheelRB.position.y = 0.035

  const wheelRF = wheelRB.clone("wheelRF")
  wheelRF.position.x = 0.1

  const wheelLB = wheelRB.clone("wheelLB")
  wheelLB.position.y = -0.2 - 0.035

  const wheelLF = wheelRF.clone("wheelLF")
  wheelLF.position.y = -0.2 - 0.035

  return car
}
