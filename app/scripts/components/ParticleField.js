import * as THREE from 'three'

export default class ParticleField {
  constructor(particleNum, texture, size, opacity) {
    this.particleCount = particleNum
    this.particles = new THREE.Geometry()

    this.particleMaterial = new THREE.PointsMaterial({
      size : size,
      map : texture,
      blending : THREE.AdditiveBlending,
      transparent : true,
      opacity : opacity,
      depthWrite : false
    })

    for (let p = 0; p < this.particleCount; p++) {
      let pX = Math.random() * 1024 - 512,
          pY = Math.random() * 1024 - 512,
          pZ = Math.random() * 1024 - 512,
          particle = new THREE.Vector3(pX, pY, pZ)

      this.particles.vertices.push(particle)
    }

    this.particleSystem = new THREE.Points(this.particles, this.particleMaterial)
    this.particleSystem.sortParticles = true
  }
}
