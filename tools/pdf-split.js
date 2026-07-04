 const pdfInput = document.getElementById("pdfInput");
const fileInfo = document.getElementById("fileInfo");
const pageNumber = document.getElementById("pageNumber");
const status = document.getElementById("status");
const downloadBtn = document.getElementById("downloadBtn");

let downloadURL = "";

pdfInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    fileInfo.innerHTML =
        "📄 <b>" + file.name + "</b><br>" +
        "📦 Size: " + (file.size / 1024).toFixed(1) + " KB";

    status.innerHTML = "";
    downloadBtn.style.display = "none";

});

async function splitPDF() {

    const file = pdfInput.files[0];

    if (!file) {
        alert("Please select a PDF file.");
        return;
    }

    const page = parseInt(pageNumber.value);

    if (isNaN(page) || page < 1) {
        alert("Enter a valid page number.");
        return;
    }

    status.innerHTML = "⏳ Processing...";

    const bytes = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(bytes);

    const totalPages = pdfDoc.getPageCount();

    if (page > totalPages) {
        alert("This PDF has only " + totalPages + " pages.");
        status.innerHTML = "";
        return;
    }

    const newPdf = await PDFLib.PDFDocument.create();

    const copiedPages = await newPdf.copyPages(pdfDoc, [page - 1]);
    newPdf.addPage(copiedPages[0]);

    const pdfBytes = await newPdf.save();

    if (downloadURL) {
        URL.revokeObjectURL(downloadURL);
    }

    downloadURL = URL.createObjectURL(
        new Blob([pdfBytes], { type: "application/pdf" })
    );

    downloadBtn.href = downloadURL;
    downloadBtn.download = "AzharLabs-Split-Page-" + page + ".pdf";
    downloadBtn.style.display = "inline-block";

    status.innerHTML = "✅ PDF Split Successfully!";
}   
