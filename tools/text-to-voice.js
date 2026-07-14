let voices = [];

function loadVoices(){
    voices = speechSynthesis.getVoices();

    let select = document.getElementById("voiceSelect");
    select.innerHTML="";

    voices.forEach((voice,index)=>{
        let option=document.createElement("option");
        option.value=index;
        option.textContent=voice.name + " ("+voice.lang+")";
        select.appendChild(option);
    });
}

speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();


function speak(){

    let text=document.getElementById("text").value;

    if(text===""){
        alert("Please enter some text");
        return;
    }

    let speech=new SpeechSynthesisUtterance(text);

    let selectedVoice=document.getElementById("voiceSelect").value;

    speech.voice=voices[selectedVoice];

    speech.rate=document.getElementById("speed").value;

    speechSynthesis.speak(speech);
}


function stopSpeech(){
    speechSynthesis.cancel();
}
