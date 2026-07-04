const pdfInput = document.getElementById("pdfInput");
const fileInfo = document.getElementById("fileInfo");
const downloadBtn = document.getElementById("downloadBtn");

let mergedPdfBytes = null;

pdfInput.addEventListener("change", () => {
    const files = pdfInput.files;

    if (files.length === 0) {
        fileInfo.textContent = "";
        return;
    }

    fileInfo.innerHTML = `📄 ${files.length} PDF file(s) selected`;
    downloadBtn.style.display = "none";
});

async function mergePDFs() {

    const files = pdfInput.files;

    if (files.length < 2) {
        alert("Please select at least 2 PDF files.");
        return;
    }

    const mergedPdf = await PDFLib.PDFDocument.create();

    for (const file of files) {

        const bytes = await file.arrayBuffer();

        const pdf = await PDFLib.PDFDocument.load(bytes);

        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

        pages.forEach(page => mergedPdf.addPage(page));
    }

    mergedPdfBytes = await mergedPdf.save();

    const blob = new Blob([mergedPdfBytes], {
        type: "application/pdf"
    });

    const url = URL.createObjectURL(blob);

    downloadBtn.href = url;
    downloadBtn.download = "merged.pdf";
    downloadBtn.style.display = "inline-block";

    fileInfo.innerHTML += "<br><br>✅ PDFs merged successfully!";
      }
