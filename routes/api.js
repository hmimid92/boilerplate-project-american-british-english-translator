'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const local = req.body.locale;
      const textRaw = req.body.text;
      if(!textRaw) {
        res.json({ error: 'No text to translate' });
        return;
      } 
      if(!textRaw && (local !== 'american-to-british' || local !== 'british-to-american')) {
        res.json({ error: 'Required field(s) missing' });
        return;
      }  
      if(local !== 'american-to-british' || local !== 'british-to-american') {
        res.json({ error: 'Invalid value for locale field' });
        return;
      } 
    });
};
