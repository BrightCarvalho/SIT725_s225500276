const { expect } = require('chai');
const { evaluateExpression } = require('../math');

describe('Unit Testing: Calculation Logic', () => {
    it('should correctly add and multiply numbers', () => {
        expect(evaluateExpression("10 + 5 * 2")).to.equal(20);
    });

    it('should throw an error for letters/scripting', () => {
        expect(() => evaluateExpression("fetch('hack')")).to.throw("Invalid characters");
    });
});