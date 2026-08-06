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
const voice = document.getElementById("voice");
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
    text: text,
    voice_id: voice.value,
    user_api_key: localStorage.getItem("elevenlabs_api_key") || null
})
        });

        if (!response.ok) {

    const error = await response.json();

    if (error.error === "QUOTA_EXHAUSTED") {

        document.getElementById("quotaModal").style.display = "flex";

        return;

    }

    throw new Error(error.error);

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
// ==========================
// API SETTINGS - PART 1
// ==========================

const apiSettingsBtn = document.getElementById("apiSettingsBtn");
const apiModal = document.getElementById("apiModal");
const quotaModal = document.getElementById("quotaModal");

const closeApiBtn = document.getElementById("closeApiBtn");
const closeQuotaBtn = document.getElementById("closeQuotaBtn");
const openApiSettingsBtn = document.getElementById("openApiSettingsBtn");

apiSettingsBtn.addEventListener("click", () => {

    apiModal.style.display = "flex";

});

closeApiBtn.addEventListener("click", () => {

    apiModal.style.display = "none";

});

closeQuotaBtn.addEventListener("click", () => {

    quotaModal.style.display = "none";

});

openApiSettingsBtn.addEventListener("click", () => {

    quotaModal.style.display = "none";

    apiModal.style.display = "flex";

});

window.addEventListener("click", (event) => {

    if (event.target === apiModal) {

        apiModal.style.display = "none";

    }

    if (event.target === quotaModal) {

        quotaModal.style.display = "none";

    }

});
// ==========================
// API SETTINGS - PART 2
// ==========================

const userApiKey = document.getElementById("userApiKey");
const saveApiBtn = document.getElementById("saveApiBtn");
const removeApiBtn = document.getElementById("removeApiBtn");

// Load saved API key
const savedApiKey = localStorage.getItem("elevenlabs_api_key");

if (savedApiKey) {

    userApiKey.value = savedApiKey;

}

// Save API Key
saveApiBtn.addEventListener("click", () => {

    const key = userApiKey.value.trim();

    if (!key) {

        alert("Please enter your ElevenLabs API Key.");

        return;

    }

    localStorage.setItem("elevenlabs_api_key", key);

    alert("✅ API Key saved successfully.");

    apiModal.style.display = "none";

});

// Remove API Key
removeApiBtn.addEventListener("click", () => {

    localStorage.removeItem("elevenlabs_api_key");

    userApiKey.value = "";

    alert("✅ API Key removed successfully.");

});
