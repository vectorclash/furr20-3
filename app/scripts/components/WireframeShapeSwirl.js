import * as THREE from 'three'
import tinycolor from 'tinycolor2'

export default class WireframeShapeSwirl {
  constructor(shapeNum) {
    this.rX = 0
    this.rY = 0
    this.rZ = 0

    this.geometry = new THREE.IcosahedronGeometry(1)
    this.container = new THREE.Object3D()

    let color = 200
    let colorIncrease = 255 / shapeNum

    for(let i = 0; i < shapeNum; i++) {
      this.material = new THREE.MeshBasicMaterial({
        wireframe : true,
        color : tinycolor({h : color, s : 100, l : 50}).toHexString(),
        transparent: true,
        opacity: 0.5
      })

      color += colorIncrease
      if(color > 255) {
        color = 0
      }

      let mesh = new THREE.Mesh(this.geometry, this.material)
      let newScale = 1 + (i * 1.01)
      mesh.scale.set(newScale, newScale, newScale)
      let newRotation = i * 0.08
      mesh.rotation.set(newRotation, newRotation, newRotation)

      this.container.add(mesh)
    }

    this.changeRotation()
  }

  changeRotation() {
    let ranTime = 2 + Math.random() * 10
    TweenMax.to(this, ranTime, {
      rX : -10 + Math.random() * 20,
      rY : -10 + Math.random() * 20,
      rZ : -10 + Math.random() * 20,
      onUpdate : this.update.bind(this),
      onComplete : this.changeRotation.bind(this)
    })
  }

  update() {
    for(let i = 0; i < this.container.children.length; i++) {
      let mesh = this.container.children[i]
      let soundTotal = 0
      if(window.total) {
        soundTotal = (window.total * i) * 0.000003
      }

      let newRX = this.rX * (i * 0.02) + soundTotal
      let newRY = this.rY * (i * 0.02) + soundTotal
      let newRZ = this.rZ * (i * 0.02) + soundTotal

      mesh.rotation.set(newRX, newRY, newRZ)
    }
  }
}
