const pdfInput = document.getElementById("pdfInput");
const fileInfo = document.getElementById("fileInfo");
const status = document.getElementById("status");
const preview = document.getElementById("preview");
const downloadBtn = document.getElementById("downloadBtn");

let imageURL = "";

pdfInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    fileInfo.innerHTML =
        "📄 <b>" + file.name + "</b><br>" +
        "📦 Size: " + (file.size / 1024).toFixed(1) + " KB";

    status.innerHTML = "";
    preview.innerHTML = "";
    downloadBtn.style.display = "none";

});

async function convertPDF() {

    const file = pdfInput.files[0];

    if (!file) {
        alert("Please select a PDF first.");
        return;
    }

    status.innerHTML = "⏳ Converting...";

    const fileReader = new FileReader();

    fileReader.onload = async function () {

        const typedArray = new Uint8Array(this.result);

        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

        const page = await pdf.getPage(1);

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

        preview.innerHTML =
            "<img src='" + imageData + "' style='max-width:100%;border-radius:12px;'>";

        if (imageURL) {
            URL.revokeObjectURL(imageURL);
        }

        const blob = await (await fetch(imageData)).blob();

        imageURL = URL.createObjectURL(blob);

        downloadBtn.href = imageURL;
        downloadBtn.download = "page-1.jpg";
        downloadBtn.style.display = "inline-block";

        status.innerHTML = "✅ First page converted successfully!";

    };

    fileReader.readAsArrayBuffer(file);

                            }
