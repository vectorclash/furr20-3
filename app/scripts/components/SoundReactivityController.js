export default class SoundReactivityController {
  constructor() {
    let fftSize = 128
    let context
    let source, sourceJs
    let microphone
    let analyser
    let buffer
    let total

    this.byteArray = new Array()

    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
    if(navigator.getUserMedia) {
      navigator.getUserMedia({
          audio: true,
          video: false
        },
        function(mediaStream) {
          context = new AudioContext()
          microphone = context.createMediaStreamSource(mediaStream)

          sourceJs = context.createScriptProcessor(2048, 1, 1)
          sourceJs.connect(context.destination)
          analyser = context.createAnalyser()
          analyser.smoothingTimeConstant = 0.5
          analyser.fftSize = fftSize

          microphone.connect(analyser)
          analyser.connect(sourceJs)
          sourceJs.connect(context.destination)

          sourceJs.onaudioprocess = function(e) {
              this.byteArray = new Uint8Array(analyser.frequencyBinCount)
              window.byteArray = this.byteArray
              analyser.getByteFrequencyData(this.byteArray)
              total = 0
              for (var i = 0; i < this.byteArray.length; i++) {
                total += this.byteArray[i]
              }
              window.total = total
          }
        },
        function(error) {
          console.log("There was an error when getting microphone input: " + error)
        }
      )
    }
  }
}
