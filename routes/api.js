'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const {text, locale} = req.body;

      if(text == undefined || !locale) {
        res.json({ error: 'Required field(s) missing' });
        return;
      }  
      
      if(text == "") {
        res.json({ error: 'No text to translate' });
        return;
      } 
     
      let textTranslated = "";
      if(locale === 'american-to-british') {
        textTranslated = translator.americanToBritish(text);
      } else if(locale === 'british-to-american') {
        textTranslated = translator.britishToAmerican(text);
      } else {
        res.json({ error: 'Invalid value for locale field' });
        return;
      } 

      if(textTranslated == text || !textTranslated) {
        res.json({
          text,
          translation: "Everything looks good to me!"
        });
      } else {
        res.json({
          text,
          translation: textTranslated
        });
      }
    });
};
