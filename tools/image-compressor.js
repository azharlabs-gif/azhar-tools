const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const fileName = document.getElementById("fileName");
const sizeInfo = document.getElementById("sizeInfo");
const downloadBtn = document.getElementById("downloadBtn");

const quality = document.getElementById("quality");

let compressedImage = "";

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    fileName.textContent = "📄 " + file.name;

    const reader = new FileReader();

    reader.onload = function(e){
        preview.src = e.target.result;
        preview.style.display = "block";

        sizeInfo.innerHTML =
        "Original Size: <b>" + (file.size/1024).toFixed(1) + " KB</b>";

        downloadBtn.style.display = "none";
    }

    reader.readAsDataURL(file);

});

function compressImage(){

    const file = imageInput.files[0];

    if(!file){
        alert("Please select an image first.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e){

        const img = new Image();

        img.onload = function(){

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            let width = img.width;
            let height = img.height;

            const maxWidth = 1000;

            if(width > maxWidth){
                height = height * (maxWidth / width);
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img,0,0,width,height);

            compressedImage = canvas.toDataURL(
    "image/jpeg",
    parseFloat(quality.value)
);

            preview.src = compressedImage;

            const compressedBytes = Math.round((compressedImage.length - compressedImage.indexOf(",") - 1) * 3 / 4);

            const originalKB = (file.size/1024).toFixed(1);
            const compressedKB = (compressedBytes/1024).toFixed(1);

            const saved = (((file.size - compressedBytes)/file.size)*100).toFixed(1);

            sizeInfo.innerHTML =
            "Original: <b>"+originalKB+" KB</b><br>" +
            "Compressed: <b>"+compressedKB+" KB</b><br>" +
            "Saved: <b>"+saved+"%</b>";

            downloadBtn.href = compressedImage;
            downloadBtn.download = "compressed-image.jpg";
            downloadBtn.style.display = "inline-block";

        }

        img.src = e.target.result;

    }

    reader.readAsDataURL(file);

}
