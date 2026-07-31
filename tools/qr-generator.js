// ===============================
// AZHAR LABS - QR GENERATOR
// ===============================

const qrText = document.getElementById("qrText");
const qrBox = document.getElementById("qrcode");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

// Generate QR
function generateQR() {

    const text = qrText.value.trim();

    if (text === "") {
        alert("Please enter a URL or text.");
        qrText.focus();
        return;
    }

    // Check QR Library
    if (typeof QRCode === "undefined") {
        alert("QRCode library failed to load.");
        return;
    }

    // Clear old QR
    qrBox.innerHTML = "";

    // Create QR
    new QRCode(qrBox, {
        text: text,
        width: 220,
        height: 220,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Show Download Button
    downloadBtn.style.display = "block";
}

// Generate Button
generateBtn.addEventListener("click", generateQR);

// Enter Key Support
qrText.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        generateQR();
    }
});

// Download QR
downloadBtn.addEventListener("click", function () {

    const img = qrBox.querySelector("img");
    const canvas = qrBox.querySelector("canvas");

    let imageURL = "";

    if (img) {
        imageURL = img.src;
    } else if (canvas) {
        imageURL = canvas.toDataURL("image/png");
    } else {
        alert("Generate a QR Code first.");
        return;
    }

    const a = document.createElement("a");
    a.href = imageURL;
    a.download = "azhar-labs-qr-code.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

});
