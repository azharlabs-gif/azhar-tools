const pdfInput = document.getElementById("pdfInput");
const fileInfo = document.getElementById("fileInfo");
const status = document.getElementById("status");
const preview = document.getElementById("preview");
const downloadBtn = document.getElementById("downloadBtn");

let pdfFile = null;
let pdfDoc = null;
let totalPages = 0;

pdfInput.addEventListener("change", async function () {

    const file = this.files[0];

    if (!file) return;

    pdfFile = file;

    fileInfo.innerHTML =
        "📄 <b>" + file.name + "</b><br>" +
        "📦 Size: " + (file.size / 1024).toFixed(1) + " KB";

    preview.innerHTML = "";
    downloadBtn.style.display = "none";
    status.innerHTML = "⏳ Loading PDF...";

    try {

        const buffer = await file.arrayBuffer();

        pdfDoc = await pdfjsLib.getDocument({
            data: buffer
        }).promise;

        totalPages = pdfDoc.numPages;

        status.innerHTML =
            "✅ PDF Loaded Successfully<br>" +
            "📄 Total Pages: <b>" + totalPages + "</b>";

    } catch (error) {

        console.error(error);

        status.innerHTML =
            "❌ Failed to load PDF.";

    }

});
