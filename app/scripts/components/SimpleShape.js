import * as THREE from 'three'

export default class SimpleShape {
  constructor(size, color, opacity) {
    this.container = new THREE.Object3D()

    let geometry = new THREE.DodecahedronGeometry(size, 1)
    let material = new THREE.MeshBasicMaterial({
      wireframe : true,
      color : color,
      transparent: true,
      needsUpdate: true,
      opacity: opacity
    })
    let mesh = new THREE.Mesh(geometry, material)

    this.container.add(mesh)

    this.container.baseVertices = []
    for(let i = 0; i < geometry.vertices.length; i++) {
      this.container.baseVertices.push(geometry.vertices[i])
    }

    return this.container
  }
}
