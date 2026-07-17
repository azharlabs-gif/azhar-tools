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
