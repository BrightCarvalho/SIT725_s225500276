let expression = "";
const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
const grid = document.querySelector(".button-grid");

function updateDisplays() {
    expressionDisplay.textContent = expression || "0";
}
function showResult(result) {
    resultDisplay.textContent = "= " + result;
    resultDisplay.style.color = "#259c55";
    resultDisplay.style.background = "#e6f5cf";
}
function showError(msg) {
    resultDisplay.textContent = "Error: " + msg;
    resultDisplay.style.color = "#db4b66";
    resultDisplay.style.background = "#fee0e1";
}

function handleButtonClick(val) {
    if (val === "=") return calculate();
    else if (val === "C") {
        expression = "";
        updateDisplays();
        resultDisplay.textContent = "";
        return;
    }
    expression += val;
    updateDisplays();
}
function calculate() {
    if (!expression) return;
    fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) showError(data.error);
        else showResult(data.result);
        expression = data.result !== undefined ? data.result.toString() : expression;
        updateDisplays();
    })
    .catch(() => { showError("Server error"); });
}
grid.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
        const val = e.target.dataset.value || (e.target.id === "clear" && "C") || (e.target.id === "equals" && "=");
        handleButtonClick(val);
        e.target.classList.add("active");
        setTimeout(() => e.target.classList.remove("active"), 120);
    }
});
const keyMap = {
    "Enter": "=", "=": "=", "+": "+", "-": "-", "*": "*", "/": "/", ".": ".", "(": "(", ")": ")", "c": "C", "C": "C"
};
document.addEventListener("keydown", e => {
    let val = keyMap[e.key] || (/\d/.test(e.key) ? e.key : null);
    if (val) {
        const btn = Array.from(grid.querySelectorAll("button")).find(b => b.dataset.value === val || b.textContent.trim() === val);
        if (btn) {
            btn.classList.add("active");
            setTimeout(() => btn.classList.remove("active"), 120);
        }
        handleButtonClick(val);
    }
});

expressionDisplay.tabIndex = 0;
updateDisplays();
