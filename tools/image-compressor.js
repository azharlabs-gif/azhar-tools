const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const fileName = document.getElementById("fileName");
const downloadBtn = document.getElementById("downloadBtn");

let compressedImage = "";

imageInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    fileName.textContent = "Selected: " + file.name;

    const reader = new FileReader();

    reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
    };

    reader.readAsDataURL(file);
});

function compressImage() {
    const file = imageInput.files[0];

    if (!file) {
        alert("Please select an image first.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();

        img.onload = function () {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            compressedImage = canvas.toDataURL("image/jpeg", 0.6);

            preview.src = compressedImage;

            downloadBtn.href = compressedImage;
            downloadBtn.download = "compressed-image.jpg";
            downloadBtn.style.display = "inline-block";
        };

        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
}
