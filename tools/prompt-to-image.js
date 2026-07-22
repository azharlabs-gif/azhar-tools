const promptInput = document.getElementById("prompt");
const generateBtn = document.getElementById("generateBtn");
const image = document.getElementById("image");
const downloadBtn = document.getElementById("downloadBtn");

generateBtn.addEventListener("click", async () => {

    const prompt = promptInput.value.trim();

    if (!prompt) {
        alert("Please enter a prompt first!");
        return;
    }

    generateBtn.disabled = true;
    generateBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Generating Image...';

    // API yahan Step 5 me add hogi

    setTimeout(() => {
        generateBtn.disabled = false;
        generateBtn.innerHTML =
            '<i class="fa-solid fa-image"></i> Generate Image';
    }, 2000);

});
