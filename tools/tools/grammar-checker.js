const textInput = document.getElementById("textInput");
const output = document.getElementById("output");


function checkGrammar(){

    let text = textInput.value.trim();


    if(text === ""){

        alert("Please enter some text first.");

        return;

    }


    // Basic Grammar Corrections

    let corrected = text;


    const corrections = {

        " i ": " I ",
        " i am ": " I am ",
        " he go ": " he goes ",
        " she go ": " she goes ",
        " they is ": " they are ",
        " we is ": " we are ",
        " you is ": " you are ",
        " dont ": " don't ",
        " doesnt ": " doesn't ",
        " cant ": " can't ",
        " wont ": " won't ",
        " im ": " I'm ",
        " alot ": " a lot ",
        " everyday ": " every day "

    };


    for(let mistake in corrections){

        corrected = corrected.replaceAll(
            mistake,
            corrections[mistake]
        );

    }



    // First letter capital

    corrected =
    corrected.charAt(0).toUpperCase()
    +
    corrected.slice(1);



    // Add full stop if missing

    if(
        !corrected.endsWith(".") &&
        !corrected.endsWith("?") &&
        !corrected.endsWith("!")
    ){

        corrected += ".";

    }



    output.innerText = corrected;

}




function copyText(){

    let result =
    output.innerText;


    navigator.clipboard.writeText(result);


    alert("✅ Corrected text copied!");

}
