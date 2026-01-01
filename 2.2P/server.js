// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// REST API for backend calculation
app.post('/api/calculate', (req, res) => {
    const { expression } = req.body;

    // Security: Only allow accepted calc symbols, numbers, spaces, and dots
    if (!/^[-+*/()\d.\s]+$/.test(expression)) {
        return res.status(400).json({ error: "Invalid characters in expression." });
    }

    try {
        // Evaluate in backend (safe for simple calc expressions)
        // eslint-disable-next-line
        const result = eval(expression);
        res.json({ result });
    } catch {
        res.status(400).json({ error: "Error in calculation." });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});