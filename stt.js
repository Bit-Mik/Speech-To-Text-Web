const click_to_record = document.getElementById('click_to_record');
const convert_text = document.getElementById('convert_text');
const is_recording = document.getElementById('is_recording');
const confidence_id = document.getElementById('confidence_id');
const language_select = document.getElementById('language_select');

click_to_record.addEventListener('click',function(){
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;
    
    if (!window.SpeechRecognition) {
        alert("Your browser does not support Speech Recognition.");
        return;
    }   

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = language_select.value; 

    recognition.addEventListener('start', () => {
        is_recording.innerHTML = "Recording: True";
    });

    recognition.addEventListener('end', () => {
        is_recording.innerHTML = "Recording: False";
    });

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        convert_text.innerHTML = transcript;
        console.log(transcript);

        const confidence = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.confidence)
        .join('');
        confidence_id.innerHTML = `Confidence: ${confidence}`;
        console.log(confidence);
    });

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        alert(`Error occurred: ${event.error}`)
        // is_recording.innerHTML = `Error occurred: ${event.error}`;
    };

    if (speech == true) {
        recognition.start();
    }
})