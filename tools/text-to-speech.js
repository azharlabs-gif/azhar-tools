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
