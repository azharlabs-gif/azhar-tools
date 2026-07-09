const imageInput = document.getElementById("imageInput");
const fileInfo = document.getElementById("fileInfo");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const ratio = document.getElementById("ratio");
const preview = document.getElementById("preview");
const downloadBtn = document.getElementById("downloadBtn");
const status = document.getElementById("status");

let img = new Image();
let aspectRatio = 1;

imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    fileInfo.textContent = "🖼️ " + file.name;

    const reader = new FileReader();

    reader.onload = function (e) {
        img.src = e.target.result;
        preview.src = e.target.result;
        preview.style.display = "block";
        downloadBtn.style.display = "none";
        status.textContent = "";
    };

    reader.readAsDataURL(file);
});

img.onload = function () {
    widthInput.value = img.width;
    heightInput.value = img.height;
    aspectRatio = img.width / img.height;
};

widthInput.addEventListener("input", function () {
    if (ratio.checked && widthInput.value) {
        heightInput.value = Math.round(widthInput.value / aspectRatio);
    }
});

heightInput.addEventListener("input", function () {
    if (ratio.checked && heightInput.value) {
        widthInput.value = Math.round(heightInput.value * aspectRatio);
    }
});

function resizeImage() {
    if (!img.src) {
        alert("Please select an image first.");
        return;
    }

    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);

    if (isNaN(width) || isNaN(height)) {
        alert("Please enter valid width and height.");
        return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img, 0, 0, width, height);

    const resized = canvas.toDataURL("image/jpeg", 0.9);

    preview.src = resized;

    downloadBtn.href = resized;
    downloadBtn.download = "resized-image.jpg";
    downloadBtn.style.display = "inline-block";

    status.textContent = "✅ Image resized successfully!";
}




