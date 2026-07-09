const imageInput = document.getElementById("imageInput");
const fileInfo = document.getElementById("fileInfo");

const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");

const ratioCheck = document.getElementById("ratio");

const preview = document.getElementById("preview");
const downloadBtn = document.getElementById("downloadBtn");
const status = document.getElementById("status");


let originalImage = new Image();
let originalRatio = 1;
let resizedImage = "";



// Select Image

imageInput.addEventListener("change", function(){

    const file = this.files[0];

    if(!file) return;


    fileInfo.innerHTML =
    "🖼️ " + file.name;


    const reader = new FileReader();


    reader.onload = function(e){

        originalImage.src = e.target.result;

        preview.src = e.target.result;
        preview.style.display = "block";


    };


    reader.readAsDataURL(file);

});



// Load Image

originalImage.onload = function(){

    widthInput.value = originalImage.width;
    heightInput.value = originalImage.height;


    originalRatio =
    originalImage.width / originalImage.height;

};



// Maintain Ratio

widthInput.addEventListener("input", function(){

    if(ratioCheck.checked){

        heightInput.value =
        Math.round(widthInput.value / originalRatio);

    }

});



heightInput.addEventListener("input", function(){

    if(ratioCheck.checked){

        widthInput.value =
        Math.round(heightInput.value * originalRatio);

    }

});




// Resize Function

function resizeImage(){


    if(!originalImage.src){

        alert("Please select an image first.");

        return;

    }


    const width = parseInt(widthInput.value);

    const height = parseInt(heightInput.value);



    if(!width || !height){

        alert("Please enter valid dimensions.");

        return;

    }



    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");



    canvas.width = width;

    canvas.height = height;



    ctx.drawImage(
        originalImage,
        0,
        0,
        width,
        height
    );



    resizedImage =
    canvas.toDataURL(
        "image/jpeg",
        0.9
    );



    preview.src = resizedImage;



    downloadBtn.href = resizedImage;

    downloadBtn.download =
    "resized-image.jpg";


    downloadBtn.style.display =
    "inline-block";



    status.innerHTML =
    "✅ Image resized successfully!";


       }
