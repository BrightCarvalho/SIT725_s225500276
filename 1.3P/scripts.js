let clickCount = 0;

const messages = [
    "Great job! Keep clicking!",
    "You're doing awesome!",
    "JavaScript is fun!",
    "Welcome to SIT725!",
    "One more click!",
    "You're a natural!",
    "Amazing work!",
    "Keep it up!"
];

function changeContent() {
    clickCount++;
    
    const messageElement = document.getElementById('message');
    const counterElement = document.getElementById('counter');
    const button = document.getElementById('actionButton');
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageElement.textContent = randomMessage;
    
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    messageElement.style.color = randomColor;
    
    counterElement.textContent = `Button clicked: ${clickCount} times`;
    
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 100);
    
    console.log(`Button clicked ${clickCount} times`);
}

console.log("scripts.js loaded successfully!");
console.log("Student ID: s225500276");
