const abc = require('../app.js');
var assert = require('assert');
const chai =  require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

//test case for product of two numbers
describe('Product of two numbers',function(){
    it('No numbers are passed as arguments',function(done) {
        chai.request(abc).get(`/product`).end(function(err,res){
               expect(res).to.have.status(404);
               expect(res.text).to.equal(`Route Not Found`);
               done();
             })
        })
    it('Arguments are not numbers',function(done) {
        chai.request(abc).get(`/product/a/b`).end(function(err,res){
                expect(res).to.have.status(400);
                expect(res.text).to.equal(`Bad Request`);
                done();
                })
        })
    it('product of 2 numbers passed in arguments',function(done) {
        chai.request(abc).get(`/product/5/6`).end(function(err,res){
                expect(res).to.have.status(200);
                expect(res.text).to.equal(`30`);
                done();
            })
        })
})

//test case for writing content into file
describe('Writing content into file',function(){
    it('when empty string argument is passed to file',function(done) {
        chai.request(abc).get(`/writeContent`).end(function(err,res){
               expect(res).to.have.status(404);
               expect(res.text).to.equal(`Route Not Found`);
               done();
             })
        })
});

// test case for finding first repetitve character
describe('finding first non-repetitive characters',function(){
    it('when string argument is empty',function(done) {
        chai.request(abc).get(`/string`).end(function(err,res){
               expect(res).to.have.status(404);
               expect(res.text).to.equal(`Route Not Found`);
               done();
             })
        })
    it('Non-repetitive character',function(done) {
        chai.request(abc).get(`/string/hello`).end(function(err,res){
                expect(res.status).to.equal(200);
                expect(res.text).to.equal(`h`);
                done();
                })
        })
});