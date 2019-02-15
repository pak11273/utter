/* eslint no-plusplus: 0 */

export default () => {
  /* const Speech = new webkitSpeechRecognition() || speechRecognition() */
	// TODO: the Speech object below is temporary.  uncomment the Speech constant above and remove below line.  Then fix the problems.
  const Speech = {}
  Speech.lang = "ko-KR"
  // Speech.lang = 'en-US'
  // Speech.lang = 'fr-FR';
  // Speech.lang = 'es-MX';
  Speech.continuous = true
  Speech.start()
  Speech.onresult = event => {
    var interim_transcript = ""
    var final_transcript = ""

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript
      } else {
        interim_transcript += event.results[i][0].transcript
      }
    }

    interim_transcript = interim_transcript.toLowerCase()
    final_transcript = final_transcript.toLowerCase()

    this.props.actions.setInterimScript(interim_transcript)
    this.props.actions.setFinalTranscript(final_transcript)

    // final_span.innerHTML = linebreak(final_transcript)
    // interim_span.innerHTML = linebreak(interim_transcript)
  }
}
// speech synth for yandex api
// superagent
//   .get('https://translate.yandex.net/api/v1.5/tr.json/translate')
//   .query({
//     key: secrets.yandex,
//     text: query,
//     lang: 'en-ko'
//   })
//   .set('Accept', 'application/json')
//   .then(res => {
//     const translated = res.body.text[0]
//     this.props.actions.sendTranslated(translated)

//     var msg = new SpeechSynthesisUtterance()
//     var voices = window.speechSynthesis.getVoices()

//     msg.voice = voices[1] // Note: some voices don't support altering params
//     // msg.voiceURI = 'native'
//     msg.volume = 1 // 0 to 1
//     msg.rate = 0.5 // 0.1 to 10
//     msg.pitch = 1 //0 to 2
//     msg.text = translated
//     msg.lang = 'ko-KR'
//     // msg.lang = 'en-US'

//     // msg.onend = function(e) {
//     //   console.log('Finished in ' + event.elapsedTime + ' seconds.')
//     // }

//     speechSynthesis.speak(msg)
//   })
