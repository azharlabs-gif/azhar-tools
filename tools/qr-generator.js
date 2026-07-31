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

downloadBtn.addEventListener("click", () => {

    const canvas = qrBox.querySelector("canvas");

    if (!canvas) {
        alert("Generate a QR Code first.");
        return;
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "azhar-labs-qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

});
