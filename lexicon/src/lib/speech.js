export function speak(text, rate = 0.9) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = rate
  utterance.pitch = 1
  const voices = window.speechSynthesis.getVoices()
  const preferred = voices.find(v =>
    v.lang === 'en-US' && (v.name.includes('Samantha') || v.name.includes('Alex') || v.name.includes('Google'))
  )
  if (preferred) utterance.voice = preferred
  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking() {
  window.speechSynthesis?.cancel()
}
