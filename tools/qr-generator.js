function generateQR() {
    const text = document.getElementById("qrText").value.trim();
    const qr = document.getElementById("qrcode");

    qr.innerHTML = "";

    if (!text) {
        alert("Please enter text or a website link.");
        return;
    }

    new QRCode(qr, {
        text: text,
        width: 220,
        height: 220
    });

    document.getElementById("downloadBtn").style.display = "block";
}

document.getElementById("downloadBtn").onclick = function () {
    const canvas = document.querySelector("#qrcode canvas");

    if (!canvas) {
        alert("Please generate a QR Code first.");
        return;
    }

    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "azhar-labs-qr.png";
    a.click();
};
