// =====================================
// AZHAR LABS - QR CODE GENERATOR
// =====================================

const qrText = document.getElementById("qrText");
const qrBox = document.getElementById("qrcode");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

function generateQR() {

    const text = qrText.value.trim();

    if (text === "") {
        alert("Please enter a URL or text.");
        qrText.focus();
        return;
    }

    // Remove old QR
    qrBox.innerHTML = "";

    // Hide download button while generating
    downloadBtn.style.display = "none";

    // Generate QR
    new QRCode(qrBox, {
        text: text,
        width: 260,
        height: 260,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Show download button after QR is created
    setTimeout(() => {
        downloadBtn.style.display = "flex";
    }, 300);

}

// Generate Button
generateBtn.addEventListener("click", generateQR);

// Enter Key
qrText.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        generateQR();
    }

});

// Download QR
downloadBtn.addEventListener("click", function(){

    const canvas = qrBox.querySelector("canvas");
    const img = qrBox.querySelector("img");

    if(canvas){

        const link = document.createElement("a");
        link.download = "azhar-labs-qr-code.png";
        link.href = canvas.toDataURL("image/png");
        link.click();

    }

    else if(img){

        fetch(img.src)
        .then(res => res.blob())
        .then(blob => {

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "azhar-labs-qr-code.png";
            link.click();

            URL.revokeObjectURL(url);

        });

    }

});
