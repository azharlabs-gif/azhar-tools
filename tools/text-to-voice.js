// DOM Elements ko select karna
const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const speedRate = document.getElementById('speed-rate');
const speedLabel = document.getElementById('speed-label');
const pitchRate = document.getElementById('pitch-rate');
const pitchLabel = document.getElementById('pitch-label');
const speakBtn = document.getElementById('speak-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');

// Speech Synthesis Object initiate karna
const synth = window.speechSynthesis;
let voices = [];
let isPaused = false;

// Voice list load karne ka function
function populateVoiceList() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = ''; // Pehle wala reset karna

    voices.forEach((voice, i) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        
        // English (US) ko default select rakhna
        if (voice.lang === 'en-US' && i === 0) {
            option.selected = true;
        }
        
        voiceSelect.appendChild(option);
    });
}

// Chrome aur baqi browsers voice thodi der baad load karte hain
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
} else {
    populateVoiceList();
}

// UI controls ke numeric label update karna
speedRate.addEventListener('input', () => {
    speedLabel.textContent = `${speedRate.value}x`;
});

pitchRate.addEventListener('input', () => {
    pitchLabel.textContent = pitchRate.value;
});

// Speak function
speakBtn.addEventListener('click', () => {
    // Agar pehle se pause tha, toh resume karo
    if (synth.paused && isPaused) {
        synth.resume();
        isPaused = false;
        speakBtn.innerHTML = "🔊 Speak";
        return;
    }

    if (textInput.value.trim() === '') {
        alert("Pehle input area mein kuch likhein!");
        return;
    }

    // Nayi speech request banana
    const utterThis = new SpeechSynthesisUtterance(textInput.value);

    // Selected Voice lagana
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    voices.forEach((voice) => {
        if (voice.name === selectedOption) {
            utterThis.voice = voice;
        }
    });

    // Speed aur Pitch apply karna
    utterThis.rate = parseFloat(speedRate.value);
    utterThis.pitch = parseFloat(pitchRate.value);

    // Bolna shuru karna (bina lag ke)
    synth.cancel(); // Pehle wali processing cancel karne ke liye
    synth.speak(utterThis);
});

// Pause function
pauseBtn.addEventListener('click', () => {
    if (synth.speaking && !synth.paused) {
        synth.pause();
        isPaused = true;
        speakBtn.innerHTML = "▶ Resume";
    }
});

// Stop function
stopBtn.addEventListener('click', () => {
    if (synth.speaking) {
        synth.cancel();
        isPaused = false;
        speakBtn.innerHTML = "🔊 Speak";
    }
});
      
