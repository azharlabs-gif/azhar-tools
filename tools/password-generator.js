// ======================================
// Password Generator | Azhar Labs
// ======================================

const password = document.getElementById("password");
const length = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const upper = document.getElementById("upper");
const lower = document.getElementById("lower");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

// Update Slider Value
length.addEventListener("input", () => {

    lengthValue.textContent = length.value;

    generatePassword();

});

// Generate Password
function generatePassword() {

    let chars = "";

    if (upper.checked)
        chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (lower.checked)
        chars += "abcdefghijklmnopqrstuvwxyz";

    if (numbers.checked)
        chars += "0123456789";

    if (symbols.checked)
        chars += "!@#$%^&*()_+-={}[]<>?/";

    if (chars === "") {

        password.value = "";

        alert("Please select at least one option.");

        return;

    }

    let pass = "";

    for (let i = 0; i < length.value; i++) {

        pass += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );

    }

    password.value = pass;

}

// Copy Password
copyBtn.addEventListener("click", () => {

    if (password.value === "") return;

    navigator.clipboard.writeText(password.value);

    copyBtn.innerHTML =
        '<i class="fa-solid fa-check"></i> Copied!';

    setTimeout(() => {

        copyBtn.innerHTML =
        '<i class="fa-solid fa-copy"></i> Copy Password';

    }, 2000);

});

// Generate Button
generateBtn.addEventListener("click", generatePassword);

// Auto Generate on Checkbox Change
[upper, lower, numbers, symbols].forEach(option => {

    option.addEventListener("change", generatePassword);

});

// Generate First Password
generatePassword();
