// external imports
import * as THREE from 'three'
import TweenMax from 'gsap'

// custom component imports
import Renderer from './components/Renderer'
import SoundReactivityController from './components/SoundReactivityController'
import ParticleField from './components/ParticleField'

let renderer
let scene, camera
let mainContainer, particlesOne, particlesTwo

function init() {
  renderer = new Renderer(0x000000)
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

  let soundReactivityController = new SoundReactivityController()

  TweenMax.ticker.addEventListener('tick', loop)
}

function loop() {
  renderer.render()

  let soundTotal = 0
  let soundScaleOne = 0
  let soundScaleTwo = 0

  if(window.total) {
    soundTotal = window.total * 0.000003
    soundScaleOne = 0.9 + window.total * 0.00003
    soundScaleTwo = 0.8 + window.total * 0.00009

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
  }
}

window.addEventListener('load', init)
