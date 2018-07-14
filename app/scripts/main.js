// external imports
import * as THREE from 'three'
import TweenMax from 'gsap'

// custom component imports
import Renderer from './components/Renderer'
import SoundReactivityController from './components/SoundReactivityController'
import ParticleField from './components/ParticleField'
import WireframeShapeSwirl from './components/WireframeShapeSwirl'
import SimpleShape from './components/SimpleShape'

let renderer
let scene, camera
let mainContainer, particlesOne, particlesTwo, shapeSwirl, containmentShape
let clock = new THREE.Clock()
let deformationRange = 0.00001

function init() {
  renderer = new Renderer(0x230133)
  document.body.appendChild(renderer.rendererElement)

  scene = renderer.scene
  camera = renderer.camera

  mainContainer = new THREE.Object3D()
  scene.add(mainContainer)

  let leafLoaderOne = new THREE.TextureLoader()
  leafLoaderOne.load(
    'images/cannabis-leaf-one.png',
    (texture) => {
      particlesOne = new ParticleField(420, texture, 20, 0.5)
      mainContainer.add(particlesOne.particleSystem)
    }
  )

  let leafLoaderTwo = new THREE.TextureLoader()
  leafLoaderTwo.load(
    'images/cannabis-leaf-two.png',
    (texture) => {
      particlesTwo = new ParticleField(420, texture, 30, 0.6)
      mainContainer.add(particlesTwo.particleSystem)
    }
  )

  shapeSwirl = new WireframeShapeSwirl(42)
  mainContainer.add(shapeSwirl.container)

  containmentShape = new SimpleShape(50, 0xff185d, 0.5)
  mainContainer.add(containmentShape)

  let soundReactivityController = new SoundReactivityController()

  TweenMax.ticker.addEventListener('tick', loop)
}

function loop() {
  let delta1 = clock.getDelta(), time1 = clock.getElapsedTime() * 0.0005;
  let delta2 = clock.getDelta(), time2 = clock.getElapsedTime() * 0.00045;
  let delta3 = clock.getDelta(), time3 = clock.getElapsedTime() * 0.0006;

  renderer.render()

  let soundTotal = 0
  let soundScaleOne = 0
  let soundScaleTwo = 0

  if(window.total) {
    soundTotal = window.total * 0.000001
    soundScaleOne = 0.7 + window.total * 0.00001
    soundScaleTwo = 0.6 + window.total * 0.00005

    particlesOne.particleSystem.scale.set(
      soundScaleOne,
      soundScaleOne,
      soundScaleOne
    )

    particlesOne.particleSystem.rotation.x += 0.0021 + soundTotal
    particlesOne.particleSystem.rotation.y -= 0.00191 + soundTotal
    particlesOne.particleSystem.rotation.z += 0.002 + soundTotal

    particlesTwo.particleSystem.scale.set(
      soundScaleTwo,
      soundScaleTwo,
      soundScaleTwo
    )

    particlesTwo.particleSystem.rotation.x -= 0.0021 + soundTotal
    particlesTwo.particleSystem.rotation.y += 0.00191 + soundTotal
    particlesTwo.particleSystem.rotation.z -= 0.002 + soundTotal

    containmentShape.rotation.x += 0.001 + soundTotal
    containmentShape.rotation.y -= 0.001 + soundTotal
    containmentShape.rotation.z -= 0.001 + soundTotal

    for (var i = 0; i < containmentShape.children[0].geometry.vertices.length; i++) {
      let soundModifier = 1
      if(window.byteArray[i]) {
        soundModifier = window.byteArray[i] * 0.03
      }

      containmentShape.children[0].geometry.vertices[i].x = containmentShape.baseVertices[i].x * (1-deformationRange) + noise.perlin3(i, soundModifier, containmentShape.baseVertices[i].x)

      containmentShape.children[0].geometry.vertices[i].y = containmentShape.baseVertices[i].y * (1-deformationRange) + noise.perlin3(i, soundModifier, containmentShape.baseVertices[i].y)

      containmentShape.children[0].geometry.vertices[i].z = containmentShape.baseVertices[i].z * (1-deformationRange) + noise.perlin3(i, soundModifier, containmentShape.baseVertices[i].z)
    }

    containmentShape.children[0].geometry.verticesNeedUpdate = true
  }
}

window.addEventListener('load', init)
