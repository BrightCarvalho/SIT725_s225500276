const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Integration Testing: REST API Endpoints', () => {
    
    // Test Case: Valid API Calculation
    it('POST /api/calculate should return 200 and result', (done) => {
        chai.request(app)
            .post('/api/calculate')
            .send({ expression: "100 / 4" })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.result).to.equal(25);
                done();
            });
    });

    // Test Case: New Endpoint (Status)
    it('GET /api/status should return server health', (done) => {
        chai.request(app)
            .get('/api/status')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equal("Online");
                done();
            });
    });
});