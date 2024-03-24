export function speak(text: string, voice: SpeechSynthesisVoice[]) {
    let speak = new SpeechSynthesisUtterance(text)
    speak.voice = voice[0]
    speak.rate = 0.8
    window.speechSynthesis.speak(speak)
}
