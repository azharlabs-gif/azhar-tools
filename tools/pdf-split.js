const pdfInput = document.getElementById("pdfInput");
const fileInfo = document.getElementById("fileInfo");
const pageNumber = document.getElementById("pageNumber");
const status = document.getElementById("status");
const downloadBtn = document.getElementById("downloadBtn");

let splitPdfUrl = "";

pdfInput.addEventListener("change", () => {

    const file = pdfInput.files[0];

    if (!file) {
        fileInfo.textContent = "No PDF Selected";
        return;
    }

    fileInfo.innerHTML = "📄 " + file.name + "<br>Size: " + (file.size / 1024).toFixed(1) + " KB";
    status.textContent = "";
    downloadBtn.style.display = "none";

});

async function splitPDF() {

    const file = pdfInput.files[0];

    if (!file) {
        alert("Please select a PDF first.");
        return;
    }

    if (!pageNumber.value) {
        alert("Please enter a page number.");
        return;
    }

    status.textContent = "⏳ Splitting PDF...";

    const bytes = await file.arrayBuffer();

    const pdfDoc = await PDFLib.PDFDocument.load(bytes);

    const totalPages = pdfDoc.getPageCount();

    const page = parseInt(pageNumber.value);

    if (page < 1 || page > totalPages) {
        alert("Page number must be between 1 and " + totalPages);
        status.textContent = "";
        return;
    }

    const newPdf = await PDFLib.PDFDocument.create();

    const [copiedPage] = await newPdf.copyPages(pdfDoc, [page - 1]);

    newPdf.addPage(copiedPage);

    const newBytes = await newPdf.save();

    if (splitPdfUrl) {
        URL.revokeObjectURL(splitPdfUrl);
    }

    splitPdfUrl = URL.createObjectURL(
        new Blob([newBytes], { type: "application/pdf" })
    );

    downloadBtn.href = splitPdfUrl;
    downloadBtn.download = "split-page-" + page + ".pdf";
    downloadBtn.style.display = "inline-block";

    status.innerHTML = "✅ PDF Split Successfully!";
      }
