const express = require('express');
const path = require('path');
const { evaluateExpression } = require('./math');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// FEATURE 1: POST API for calculation
app.post('/api/calculate', (req, res) => {
    const { expression } = req.body;
    try {
        const result = evaluateExpression(expression);
        res.json({ result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// FEATURE 2: GET API for system status
app.get('/api/status', (req, res) => {
    res.status(200).json({ 
        status: "Online", 
        timestamp: new Date().toISOString() 
    });
});

if (require.main === module) {
    app.listen(port, () => console.log(`Server running at http://localhost:${port}/`));
}

module.exports = app;