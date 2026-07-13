const textInput = document.getElementById("textInput");
const output = document.getElementById("output");


async function checkGrammar() {

    const text = textInput.value.trim();

    if (text === "") {
        alert("Please enter some text first.");
        return;
    }


    output.innerHTML = "⏳ Checking grammar...";


    try {

        const response = await fetch(
            "https://azhar-grammar-api.vercel.app/api/grammar",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    text: text
                })
            }
        );


        const data = await response.json();


        let corrected = text;


        if (data.matches && data.matches.length > 0) {


            data.matches
            .sort((a,b)=> b.offset - a.offset)
            .forEach(match => {


                if(match.replacements.length > 0){

                    corrected =
                    corrected.substring(
                        0,
                        match.offset
                    )
                    +
                    match.replacements[0].value
                    +
                    corrected.substring(
                        match.offset + match.length
                    );

                }

            });


            output.innerHTML =
            "❌ Original:<br>" +
            text +
            "<br><br>" +
            "✅ Corrected:<br>" +
            corrected;


        } else {


            output.innerHTML =
            "✅ No grammar mistakes found!<br><br>" +
            text;

        }


    } catch(error){

        console.log(error);

        output.innerHTML =
        "❌ Connection error.";

    }

}



function copyText(){

    navigator.clipboard.writeText(
        output.innerText
    );

    alert("✅ Copied!");

}
