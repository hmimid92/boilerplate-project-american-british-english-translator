const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    suite('POST tests', function () {
        test('Translation with text and locale fields', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({
                "text": "Like a high tech Rube Goldberg machine.",
                "locale": "american-to-british"
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type,'application/json');
              assert.equal(res.body.text,'Like a high tech Rube Goldberg machine.');
              assert.equal(res.body.translation, 'Like a high tech <span class="highlight">Heath Robinson device</span>.');
              done();
            });
        });    
        test('Translation with text and invalid locale field', function (done) {
            chai
              .request(server)
              .keepOpen()
              .post('/api/translate')
              .send({
                  "text": "Like a high tech Rube Goldberg machine.",
                  "locale": "american-to-britishfdff"
              })
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.type,'application/json');
                assert.equal(res.body.error,'Invalid value for locale field');
                done();
              });
          });    
          test('Translation with missing text field', function (done) {
            chai
              .request(server)
              .keepOpen()
              .post('/api/translate')
              .send({
                  "locale": "american-to-british"
              })
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.type,'application/json');
                assert.equal(res.body.error,'Required field(s) missing');
                done();
              });
          });    
          test('Translation with missing locale field', function (done) {
            chai
              .request(server)
              .keepOpen()
              .post('/api/translate')
              .send({
                  "text": "We watched the footie match for a while."
              })
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.type,'application/json');
                assert.equal(res.body.error,'Required field(s) missing');
                done();
              });
          }); 
          test('Translation with empty text', function (done) {
            chai
              .request(server)
              .keepOpen()
              .post('/api/translate')
              .send({
                  "text": "",
                  "locale": "american-to-british"
              })
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.type,'application/json');
                assert.equal(res.body.error,'No text to translate');
                done();
              });
          }); 
          test('Translation with text that needs no translation', function (done) {
            chai
              .request(server)
              .keepOpen()
              .post('/api/translate')
              .send({
                  "text": "Paracetamol takes up to an hour to work.",
                  "locale": "american-to-british"
              })
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.type,'application/json');
                assert.equal(res.body.text,'Paracetamol takes up to an hour to work.');
                assert.equal(res.body.translation,'Everything looks good to me!');
                done();
              });
          }); 
      });
});
