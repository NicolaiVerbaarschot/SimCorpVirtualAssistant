function SpeechRecognition(updateHandler, resultHandler, queryHandler) {
    this.recognition = new webkitSpeechRecognition();
    this.isSpeaking = false;
    var self = this; // The most hacky solution ever

    this.recognition.onstart = function(_) {
        console.log("on start: " + self.isSpeaking);
        updateHandler("<i class=\"fas fa-microphone-slash\"></i>");
    }
    this.recognition.onresult = function(event) {
        var text = "";
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
        }
        resultHandler(text);
        queryHandler.send(text);
        console.log("on result: " + self.isSpeaking);
    };

    this.recognition.onend = function(_) {
        updateHandler("<i class=\"fas fa-microphone\"></i>");
        self.isSpeaking = false; 
        console.log("on end: " + self.isSpeaking);
    }
    this.recognition.lang = "en-US";
}

SpeechRecognition.prototype.switch = function() {
    console.log("switching: " + this.isSpeaking);
    if(this.isSpeaking) {
        this.isSpeaking = false;
        this.recognition.stop();
    } else {
        this.isSpeaking = true; 
        this.recognition.start();
    }
}