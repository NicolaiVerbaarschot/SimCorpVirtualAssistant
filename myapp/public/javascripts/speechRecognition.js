export function SpeechRecognition(updateHandler, resultHandler, queryHandler) {
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
        resultHandler(text);
        queryHandler.send(text);
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