// Init SpeechSynth API
const synth = window.speechSynthesis;

// Grabbing DOM Element
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

// Init voices array
let voices = [];
const getVoices = () => {
    voices = synth.getVoices();

    // looping throught the voices and create an option for each ome

    voices.forEach(voice => {
        // creare option element
        const option = document.createElement('option');
        // Fill option with voice and language
        option.textContent = voice.name + '(' + voice.lang + ')';


        // Set the needed option
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option)
    });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// Speek
const speak = () => {


    if (synth.speaking) {
        console.error('Already speaking...');
        return;
    }
    if (textInput.value !== '') {
    // adding background animation
            body.style.background = '#141414 url(../img/wave.gif)';
            body.style.backgroundRepeat = 'repeat-x';
            body.style.backgroundSize = '100% 100%';
    // check if speaking
        // Get speech text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        // speak end
        speakText.onend = e => {
            console.log('Done Speaking...');
            body.style.background = '#141414';
        };
        // Speak error
        speakText.onerror = e => {
            console.error('Something went wrong');

        };

        // These are selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Looping through voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        // Stting the voice pitch
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // Speak
        synth.speak(speakText);
    }
};

// Event listeners


// Text form Submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});


// Rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));
// Pitch Value Change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));


// Voice Selector Change
voiceSelect.addEventListener('change', e => speak());
