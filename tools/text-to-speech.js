const textInput = document.getElementById("text");
const chars = document.getElementById("chars");
const words = document.getElementById("words");

textInput.addEventListener("input", () => {
    const text = textInput.value;

    chars.textContent = text.length + " Characters";

    const wordCount = text.trim() === ""
        ? 0
        : text.trim().split(/\s+/).length;

    words.textContent = wordCount + " Words";
});
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

copyBtn.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(textInput.value);

        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';

        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy';
        }, 1500);
    } catch (err) {
        alert("Copy failed!");
    }
});

clearBtn.addEventListener("click", () => {
    textInput.value = "";
    chars.textContent = "0 Characters";
    words.textContent = "0 Words";
});
const player = document.getElementById("player");
const stopBtn = document.getElementById("stopBtn");

stopBtn.addEventListener("click", () => {
    player.pause();
    player.currentTime = 0;

    stopBtn.innerHTML = '<i class="fa-solid fa-check"></i> Stopped';

    setTimeout(() => {
        stopBtn.innerHTML = '<i class="fa-solid fa-stop"></i> Stop';
    }, 1500);
});
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

generateBtn.addEventListener("click", async () => {
    const text = textInput.value.trim();

    if (!text) {
        alert("Please enter some text first!");
        return;
    }

    generateBtn.disabled = true;
    generateBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';

    try {
        const response = await fetch("https://azhar-tools-api.vercel.app/api/tts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text
            })
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        player.src = audioUrl;
        await player.play();

        downloadBtn.href = audioUrl;

    } catch (err) {
        alert("Voice generation failed: " + err.message);
    } finally {
        generateBtn.disabled = false;
        generateBtn.innerHTML =
            '<i class="fa-solid fa-wand-magic-sparkles"></i> Generate Voice';
    }
});
