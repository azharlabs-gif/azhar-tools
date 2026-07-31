function calculateAge() {
    const dob = document.getElementById("dob").value;
    const result = document.getElementById("result");

    if (!dob) {
        alert("Please select your date of birth.");
        return;
    }

    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    result.innerHTML = `
    <h2>Your Age</h2>

    <div class="age-result">

        <div class="age-box">
            <span>${years}</span>
            <small>Years</small>
        </div>

        <div class="age-box">
            <span>${months}</span>
            <small>Months</small>
        </div>

        <div class="age-box">
            <span>${days}</span>
            <small>Days</small>
        </div>

    </div>
`;
}
