import { network } from './setupWebsite';
import { setInput } from './scripts';
import { runInThisContext } from 'vm';


export function SpeechRecognition(updateHandler) {
    this.recognition = new webkitSpeechRecognition();
    this.isSpeaking = false;

    this.recognition.onstart = function(_) {
        updateHandler("Stop");
    }
    this.recognition.onresult = function(event) {
        var text = "";
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
        }
        setInput(text);
        network.send(text);
        this.isSpeaking = false;
    };

    this.recognition.onend = function(_) {
        updateHandler("Speak");
        this.isSpeaking = false; 
    }
    this.recognition.lang = "en-US";
}

SpeechRecognition.prototype.switch = function() {
    if(this.isSpeaking) {
        this.isSpeaking = false;
        this.recognition.stop();
    } else {
        this.isSpeaking = true; 
        this.recognition.start();
    }
}
/*
function startRecognition() {
    recognition = new webkitSpeechRecognition();
    recognition.onstart = function(event) {
        updateRec();
    };
    recognition.onresult = function(event) {
        var text = "";
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
        }
        setInput(text);
        network.send(text);
        stopRecognition();
    };
    recognition.onend = function() {
        stopRecognition();
    };
    recognition.lang = "en-US";
    recognition.start();
}

function stopRecognition() {
    if (recognition) {
        recognition.stop();
        recognition = null;
    }
    updateRec();
}

export function switchRecognition() {
    if (recognition) {
        stopRecognition();
    } else {
        startRecognition();
    }
}
*/