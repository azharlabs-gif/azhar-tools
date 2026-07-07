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
async function convertPDF() {

    if (!pdfDoc) {
        alert("Please select a PDF first.");
        return;
    }

    preview.innerHTML = "";
    downloadBtn.style.display = "none";

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {

        status.innerHTML =
            "⏳ Converting Page " + pageNum + " of " + totalPages;

        const page = await pdfDoc.getPage(pageNum);

        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;

        const imageData = canvas.toDataURL("image/jpeg", 0.95);

        const card = document.createElement("div");
        card.className = "image-card";

        const img = document.createElement("img");
        img.src = imageData;
        img.style.width = "100%";
        img.style.borderRadius = "12px";

        const link = document.createElement("a");
        link.href = imageData;
        link.download = "page-" + pageNum + ".jpg";
        link.innerHTML = "📥 Download Page " + pageNum;

        card.appendChild(img);
        card.appendChild(document.createElement("br"));
        card.appendChild(link);

        preview.appendChild(card);
    }

    status.innerHTML =
        "✅ Successfully converted " + totalPages + " page(s).";
            }
