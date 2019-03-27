import { network } from './setupWebsite';
import { setInput } from './scripts';

var recognition;
export var isSpeaking = false;


function startRecognition(comletionHandler) {
    recognition = new webkitSpeechRecognition();
    recognition.onstart = function(event) {
        isSpeaking = true
        comletionHandler()
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
        comletionHandler();
    };
    recognition.lang = "en-US";
    recognition.start();
}

function stopRecognition(comletionHandler) {
    if (recognition) {
        recognition.stop();
        recognition = null;
        isSpeaking = false 
    }
}

export function switchRecognition(comletionHandler) {
    if (recognition) {
        stopRecognition(comletionHandler);
    } else {
        startRecognition(comletionHandler);
    }
}