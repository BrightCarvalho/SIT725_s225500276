const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); 
const { evaluateExpression } = require('../math');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Calculator Backend Test Suite', () => {

    // --- FEATURE 1: Calculation Function (Unit Testing) ---

    // TC-01: Valid Behaviour
    it('should correctly evaluate a valid math string', () => {
        const result = evaluateExpression("20 / 2 + 5");
        expect(result).to.equal(15);
    });

    // TC-02: Edge Case
    it('should handle division by zero as Infinity', () => {
        const result = evaluateExpression("5 / 0");
        expect(result).to.equal(Infinity);
    });

    // --- FEATURE 2: REST API Endpoint (Integration Testing) ---

    // TC-03: Valid Behaviour (API Response)
    it('should return status 200 and result via POST /api/calculate', (done) => {
        chai.request(app)
            .post('/api/calculate')
            .send({ expression: "12 * 12" })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.result).to.equal(144);
                done();
            });
    });

    // TC-04: Invalid/Error Behaviour
    it('should return status 400 for malicious script injections', (done) => {
        chai.request(app)
            .post('/api/calculate')
            .send({ expression: "require('fs')" })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                done();
            });
    });
});