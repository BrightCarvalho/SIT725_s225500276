/**
 * math.js - Modularized Calculation Logic
 */
function evaluateExpression(expression) {
    if (!/^[-+*/()\d.\s]+$/.test(expression)) {
        throw new Error("Invalid characters in expression.");
    }
    try {
        // eslint-disable-next-line
        return eval(expression);
    } catch (e) {
        throw new Error("Mathematical syntax error.");
    }
}

module.exports = { evaluateExpression };