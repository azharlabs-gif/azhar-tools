const prompt = document.getElementById("prompt");
const charCount = document.getElementById("charCount");

const generateBtn = document.getElementById("generateBtn");
const loader = document.getElementById("loader");

const resultImage = document.getElementById("resultImage");
const placeholder = document.getElementById("placeholder");

const downloadBtn = document.getElementById("downloadBtn");
const newBtn = document.getElementById("newBtn");

const size = document.getElementById("size");

const exampleButtons = document.querySelectorAll(".example");

// Character Counter

prompt.addEventListener("input", () => {

charCount.textContent = `${prompt.value.length} Characters`;

});

// Example Prompts

const prompts = [

"A futuristic cyberpunk city at sunset, ultra realistic, cinematic lighting, 8K",

"A realistic white lion walking in snow, ultra detailed, 8K",

"A beautiful Japanese temple surrounded by cherry blossom trees",

"A futuristic AI robot standing in neon lights",

"A fantasy dragon flying over mountains at sunset",

"A tropical island with crystal clear water and palm trees"

];

exampleButtons.forEach((button,index)=>{

button.addEventListener("click",()=>{

prompt.value = prompts[index];

charCount.textContent = `${prompt.value.length} Characters`;

});

});
generateBtn.addEventListener("click", async () => {

const text = prompt.value.trim();

if(text === ""){
alert("Please enter a prompt.");
return;
}

generateBtn.disabled = true;
generateBtn.innerHTML =
'<i class="fa-solid fa-spinner fa-spin"></i> Generating...';

loader.style.display = "flex";

placeholder.style.display = "none";

resultImage.style.display = "none";

downloadBtn.style.display = "none";

try{

const response = await fetch("/api/image",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

prompt:text,

size:size.value

})

});

if(!response.ok){

throw new Error("Failed to generate image");

}

const blob = await response.blob();

const imageURL = URL.createObjectURL(blob);

resultImage.src = imageURL;

resultImage.onload = ()=>{

loader.style.display="none";

resultImage.style.display="block";

downloadBtn.style.display="flex";

downloadBtn.href=imageURL;

generateBtn.disabled=false;

generateBtn.innerHTML=
'<i class="fa-solid fa-wand-magic-sparkles"></i> <span>Generate Image</span>';

};

}catch(error){

loader.style.display="none";

placeholder.style.display="flex";

alert(error.message);

generateBtn.disabled=false;

generateBtn.innerHTML=
'<i class="fa-solid fa-wand-magic-sparkles"></i> <span>Generate Image</span>';

}

});
// Generate Another Button

newBtn.addEventListener("click", () => {

prompt.value = "";

charCount.textContent = "0 Characters";

resultImage.src = "";

resultImage.style.display = "none";

placeholder.style.display = "flex";

downloadBtn.style.display = "none";

loader.style.display = "none";

generateBtn.disabled = false;

generateBtn.innerHTML =
'<i class="fa-solid fa-wand-magic-sparkles"></i> <span>Generate Image</span>';

prompt.focus();

});

// Ctrl + Enter to Generate

prompt.addEventListener("keydown", (e) => {

if (e.ctrlKey && e.key === "Enter") {

generateBtn.click();

}

});

// Prevent Download Before Image Exists

downloadBtn.addEventListener("click", (e) => {

if (!resultImage.src) {

e.preventDefault();

alert("Please generate an image first.");

}

});

// Image Load Animation

resultImage.onload = () => {

resultImage.style.opacity = "0";

resultImage.style.display = "block";

setTimeout(() => {

resultImage.style.transition = "opacity .4s ease";

resultImage.style.opacity = "1";

}, 50);

};

// Auto Focus

window.addEventListener("load", () => {

prompt.focus();

});

console.log("✅ Azhar Labs AI Image Generator Loaded Successfully");
