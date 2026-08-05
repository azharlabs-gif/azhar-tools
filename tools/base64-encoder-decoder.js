const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const encodeBtn = document.getElementById("encodeBtn");
const decodeBtn = document.getElementById("decodeBtn");
const swapBtn = document.getElementById("swapBtn");

const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");

const statusMessage = document.getElementById("statusMessage");
const charCount = document.getElementById("charCount");

inputText.addEventListener("input", updateCharacterCount);

encodeBtn.addEventListener("click", encodeBase64);
decodeBtn.addEventListener("click", decodeBase64);

swapBtn.addEventListener("click", swapText);

copyBtn.addEventListener("click", copyOutput);
downloadBtn.addEventListener("click", downloadOutput);
clearBtn.addEventListener("click", clearAll);

function updateCharacterCount() {

    charCount.textContent = inputText.value.length;

}
function showStatus(message, isSuccess) {

    statusMessage.textContent = message;

    statusMessage.style.color = isSuccess ? "#22c55e" : "#ef4444";

}

function encodeBase64() {

    const text = inputText.value.trim();

    if (!text) {

        showStatus("Please enter some text to encode.", false);

        outputText.value = "";

        return;

    }

    try {

        outputText.value = btoa(unescape(encodeURIComponent(text)));

        showStatus("✅ Text encoded successfully.", true);

    } catch (error) {

        outputText.value = "";

        showStatus("❌ Failed to encode text.", false);

    }

}

function decodeBase64() {

    const text = inputText.value.trim();

    if (!text) {

        showStatus("Please enter Base64 text to decode.", false);

        outputText.value = "";

        return;

    }

    try {

        outputText.value = decodeURIComponent(escape(atob(text)));

        showStatus("✅ Base64 decoded successfully.", true);

    } catch (error) {

        outputText.value = "";

        showStatus("❌ Invalid Base64 string.", false);

    }

}
function copyOutput() {

    if (!outputText.value.trim()) {

        showStatus("Nothing to copy.", false);

        return;

    }

    navigator.clipboard.writeText(outputText.value)
    .then(() => {

        showStatus("✅ Output copied successfully.", true);

    })
    .catch(() => {

        showStatus("❌ Failed to copy output.", false);

    });

}

function downloadOutput() {

    if (!outputText.value.trim()) {

        showStatus("Nothing to download.", false);

        return;

    }

    const blob = new Blob([outputText.value], {

        type: "text/plain"

    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "base64-output.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showStatus("✅ Output downloaded successfully.", true);

}

function swapText() {

    const temp = inputText.value;

    inputText.value = outputText.value;

    outputText.value = temp;

    updateCharacterCount();

    showStatus("✅ Input and output swapped.", true);

}

function clearAll() {

    inputText.value = "";

    outputText.value = "";

    statusMessage.textContent = "";

    updateCharacterCount();

    inputText.focus();

      }
inputText.addEventListener("keydown", function (event) {

    if (event.ctrlKey && event.key === "Enter") {

        event.preventDefault();

        encodeBase64();

    }

});

inputText.addEventListener("input", autoResize);

outputText.addEventListener("input", autoResize);

function autoResize() {

    this.style.height = "auto";

    this.style.height = this.scrollHeight + "px";

}

window.addEventListener("load", () => {

    updateCharacterCount();

    inputText.focus();

    autoResize.call(inputText);

    autoResize.call(outputText);

});
