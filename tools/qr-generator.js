function generateQR() {
    const text = document.getElementById("qrText").value.trim();
    const qr = document.getElementById("qrcode");

    qr.innerHTML = "";

    if (text === "") {
        alert("Please enter text or a website link.");
        return;
    }

    new QRCode(qr, {
        text: text,
        width: 220,
        height: 220
    });
}
