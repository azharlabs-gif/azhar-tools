const jsonInput = document.getElementById("jsonInput");
const jsonOutput = document.getElementById("jsonOutput");

const formatBtn = document.getElementById("formatBtn");
const validateBtn = document.getElementById("validateBtn");

const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");

const statusMessage = document.getElementById("statusMessage");

formatBtn.addEventListener("click", formatJSON);

validateBtn.addEventListener("click", validateJSON);

copyBtn.addEventListener("click", copyJSON);

downloadBtn.addEventListener("click", downloadJSON);

clearBtn.addEventListener("click", clearJSON);
function showStatus(message, isValid) {

    statusMessage.textContent = message;

    statusMessage.style.color = isValid ? "#16a34a" : "#dc2626";

}

function formatJSON() {

    const input = jsonInput.value.trim();

    if (!input) {
        showStatus("Please enter JSON first.", false);
        jsonOutput.value = "";
        return;
    }

    try {

        const parsedJSON = JSON.parse(input);

        jsonOutput.value = JSON.stringify(parsedJSON, null, 4);

        showStatus("✅ JSON formatted successfully.", true);

    } catch (error) {

        jsonOutput.value = "";

        showStatus("❌ Invalid JSON. Please check your syntax.", false);

    }

}

function validateJSON() {

    const input = jsonInput.value.trim();

    if (!input) {
        showStatus("Please enter JSON first.", false);
        return;
    }

    try {

        JSON.parse(input);

        showStatus("✅ Valid JSON.", true);

    } catch (error) {

        showStatus("❌ Invalid JSON.", false);

    }

}
function copyJSON() {

    if (!jsonOutput.value.trim()) {
        showStatus("Nothing to copy.", false);
        return;
    }

    navigator.clipboard.writeText(jsonOutput.value)
    .then(() => {
        showStatus("✅ JSON copied successfully.", true);
    })
    .catch(() => {
        showStatus("❌ Failed to copy JSON.", false);
    });

}

function downloadJSON() {

    if (!jsonOutput.value.trim()) {
        showStatus("Nothing to download.", false);
        return;
    }

    const blob = new Blob([jsonOutput.value], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "formatted.json";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    showStatus("✅ JSON downloaded successfully.", true);

}

function clearJSON() {

    jsonInput.value = "";

    jsonOutput.value = "";

    statusMessage.textContent = "";

    jsonInput.focus();

}
jsonInput.addEventListener("keydown", function (event) {

    if (event.ctrlKey && event.key === "Enter") {

        event.preventDefault();

        formatJSON();

    }

});

jsonInput.addEventListener("input", autoResize);

jsonOutput.addEventListener("input", autoResize);

function autoResize() {

    this.style.height = "auto";

    this.style.height = this.scrollHeight + "px";

}

window.addEventListener("load", () => {

    jsonInput.focus();

    autoResize.call(jsonInput);

    autoResize.call(jsonOutput);

});
