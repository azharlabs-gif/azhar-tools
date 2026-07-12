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


        if (data.error) {

            output.innerHTML =
            "❌ " + data.error;

            return;
        }


        let correctedText = text;


        if (data.matches && data.matches.length > 0) {


            data.matches.reverse().forEach((item)=>{


                if(item.replacements.length > 0){

                    const replacement =
                    item.replacements[0].value;


                    correctedText =
                    correctedText.substring(
                        0,
                        item.offset
                    )
                    +
                    replacement
                    +
                    correctedText.substring(
                        item.offset + item.length
                    );

                }


            });


            output.innerText = correctedText;


        } else {


            output.innerText =
            "✅ No grammar mistakes found.\n\n" + text;


        }


    } catch(error) {


        console.log(error);


        output.innerHTML =
        "❌ Server connection error.";


    }

}




function copyText(){


    const text =
    output.innerText;


    navigator.clipboard.writeText(text);


    alert("✅ Result copied!");

}
