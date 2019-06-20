
// Usage example of speech recognition function from google, tweaked to need
function SpeechRecognition(updateHandler, resultHandler) {
    this.recognition = new webkitSpeechRecognition();
    this.isSpeaking = false;
    let self = this; // The most hacky solution ever

    this.recognition.onstart = function(_) {
        updateHandler("<i class=\"fas fa-microphone-slash\"></i>");
    };

    this.recognition.onresult = function(event) {
        var text = "";
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
        }
        resultHandler(text);
    };

    this.recognition.onend = function(_) {
        updateHandler("<i class=\"fas fa-microphone\"></i>");
        self.isSpeaking = false; 
    };

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
};