// =====================================
// AZHAR LABS - QR CODE GENERATOR
// =====================================

const qrText = document.getElementById("qrText");
const qrBox = document.getElementById("qrcode");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

// Generate QR Code
function generateQR() {

    const text = qrText.value.trim();

    if (text === "") {

        alert("Please enter text or URL.");

        qrText.focus();

        return;

    }

    // Remove old QR
    qrBox.innerHTML = "";

    // Create new QR
    new QRCode(qrBox, {

        text: text,

        width: 220,

        height: 220,

        colorDark: "#000000",

        colorLight: "#ffffff",

        correctLevel: QRCode.CorrectLevel.H

    });

    // Show Download Button
    downloadBtn.style.display = "flex";

}

// Generate Button
generateBtn.addEventListener("click", generateQR);

// Press Enter
qrText.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        generateQR();

    }

});

// Download QR
downloadBtn.addEventListener("click", () => {

    const img = qrBox.querySelector("img");
    const canvas = qrBox.querySelector("canvas");

    let url = "";

    if(img){

        url = img.src;

    }else if(canvas){

        url = canvas.toDataURL("image/png");

    }

    if(url){

        const link = document.createElement("a");

        link.href = url;

        link.download = "azhar-labs-qr-code.png";

        link.click();

    }

});
