'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const local = req.body.locale;
      let textRaw = req.body.text;

      if(textRaw === undefined || local === undefined) {
        res.json({ error: 'Required field(s) missing' });
        return;
      }  
      
      if(!textRaw) {
        res.json({ error: 'No text to translate' });
        return;
      } 
 
      if(local === 'american-to-british') {
        if(translator.americanToBritish(textRaw) === "") {
          res.json({
            text: textRaw,
            translation: "Everything looks good to me!"
          });
        } else {
          res.json({
            text: textRaw,
            translation: translator.americanToBritish(textRaw)
          });
        }
      } else if(local === 'british-to-american') {
        if(translator.britishToAmerican(textRaw) === "") {
          res.json({
            text: textRaw,
            translation: "Everything looks good to me!"
          });
        } else {
          res.json({
            text: textRaw,
            translation: translator.britishToAmerican(textRaw)
          });
        }          
      } else {
        res.json({ error: 'Invalid value for locale field' });
        return;
      } 
    });
};
