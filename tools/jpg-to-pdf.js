const imageInput = document.getElementById("imageInput");
const fileInfo = document.getElementById("fileInfo");
const downloadBtn = document.getElementById("downloadBtn");

let pdfBlobURL = "";

imageInput.addEventListener("change", function () {

    const files = this.files;

    if (files.length === 0) {
        fileInfo.textContent = "No images selected";
        return;
    }

    fileInfo.innerHTML =
        "🖼️ " + files.length + " image(s) selected";

    downloadBtn.style.display = "none";
});

async function convertToPDF() {

    const files = imageInput.files;

    if (files.length === 0) {
        alert("Please select image(s) first.");
        return;
    }

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    for (let i = 0; i < files.length; i++) {

        const file = files[i];

        const imageData = await new Promise((resolve) => {

            const reader = new FileReader();

            reader.onload = function (e) {
                resolve(e.target.result);
            };

            reader.readAsDataURL(file);

        });

        if (i > 0) {
            pdf.addPage();
        }

        pdf.addImage(imageData, "JPEG", 10, 10, 190, 270);

    }

    const blob = pdf.output("blob");

    if (pdfBlobURL) {
        URL.revokeObjectURL(pdfBlobURL);
    }

    pdfBlobURL = URL.createObjectURL(blob);

    downloadBtn.href = pdfBlobURL;
    downloadBtn.download = "AzharLabs-Images.pdf";
    downloadBtn.style.display = "inline-block";

    fileInfo.innerHTML += "<br><br>✅ PDF Created Successfully!";
}
