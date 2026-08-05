const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const upperBtn = document.getElementById("upperBtn");
const lowerBtn = document.getElementById("lowerBtn");
const titleBtn = document.getElementById("titleBtn");
const sentenceBtn = document.getElementById("sentenceBtn");

const camelBtn = document.getElementById("camelBtn");
const pascalBtn = document.getElementById("pascalBtn");
const snakeBtn = document.getElementById("snakeBtn");
const kebabBtn = document.getElementById("kebabBtn");

const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");

const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");
const statusMessage = document.getElementById("statusMessage");

inputText.addEventListener("input", updateStats);

upperBtn.addEventListener("click", convertToUpperCase);
lowerBtn.addEventListener("click", convertToLowerCase);
titleBtn.addEventListener("click", convertToTitleCase);
sentenceBtn.addEventListener("click", convertToSentenceCase);

camelBtn.addEventListener("click", convertToCamelCase);
pascalBtn.addEventListener("click", convertToPascalCase);
snakeBtn.addEventListener("click", convertToSnakeCase);
kebabBtn.addEventListener("click", convertToKebabCase);

copyBtn.addEventListener("click", copyOutput);
downloadBtn.addEventListener("click", downloadOutput);
clearBtn.addEventListener("click", clearAll);

function updateStats() {

    const text = inputText.value;

    charCount.textContent = text.length;

    const words = text.trim() === ""
        ? 0
        : text.trim().split(/\s+/).length;

    wordCount.textContent = words;

}
function showStatus(message, isSuccess) {

    statusMessage.textContent = message;

    statusMessage.style.color = isSuccess ? "#22c55e" : "#ef4444";

}

function getInputText() {

    const text = inputText.value.trim();

    if (!text) {

        outputText.value = "";

        showStatus("Please enter some text first.", false);

        return null;

    }

    return text;

}

function convertToUpperCase() {

    const text = getInputText();

    if (text === null) return;

    outputText.value = text.toUpperCase();

    showStatus("✅ Converted to UPPERCASE.", true);

}

function convertToLowerCase() {

    const text = getInputText();

    if (text === null) return;

    outputText.value = text.toLowerCase();

    showStatus("✅ Converted to lowercase.", true);

}

function convertToTitleCase() {

    const text = getInputText();

    if (text === null) return;

    outputText.value = text
        .toLowerCase()
        .replace(/\b\w/g, function(letter){

            return letter.toUpperCase();

        });

    showStatus("✅ Converted to Title Case.", true);

}

function convertToSentenceCase() {

    const text = getInputText();

    if (text === null) return;

    const sentence =
        text.charAt(0).toUpperCase() +
        text.slice(1).toLowerCase();

    outputText.value = sentence;

    showStatus("✅ Converted to Sentence Case.", true);

    }
function convertToCamelCase() {

    const text = getInputText();

    if (text === null) return;

    const words = text
        .toLowerCase()
        .trim()
        .split(/[\s_-]+/);

    outputText.value = words
        .map((word, index) => {

            if (index === 0) return word;

            return word.charAt(0).toUpperCase() + word.slice(1);

        })
        .join("");

    showStatus("✅ Converted to camelCase.", true);

}

function convertToPascalCase() {

    const text = getInputText();

    if (text === null) return;

    outputText.value = text
        .toLowerCase()
        .trim()
        .split(/[\s_-]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");

    showStatus("✅ Converted to PascalCase.", true);

}

function convertToSnakeCase() {

    const text = getInputText();

    if (text === null) return;

    outputText.value = text
        .toLowerCase()
        .trim()
        .replace(/[\s-]+/g, "_");

    showStatus("✅ Converted to snake_case.", true);

}

function convertToKebabCase() {

    const text = getInputText();

    if (text === null) return;

    outputText.value = text
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, "-");

    showStatus("✅ Converted to kebab-case.", true);

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

    link.download = "converted-text.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showStatus("✅ Output downloaded successfully.", true);

}

function clearAll() {

    inputText.value = "";

    outputText.value = "";

    statusMessage.textContent = "";

    updateStats();

    inputText.focus();

}

inputText.addEventListener("keydown", function(event){

    if(event.ctrlKey && event.key === "Enter"){

        event.preventDefault();

        convertToUpperCase();

    }

});

window.addEventListener("load", () => {

    updateStats();

    inputText.focus();

});
