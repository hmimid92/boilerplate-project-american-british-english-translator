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
        textRaw = textRaw.toLowerCase();
        res.json({
          text: textRaw,
          translation: translator.americanToBritish(textRaw) === 'same' ? "Everything looks good to me!" : translator.americanToBritish(textRaw)
        });
        return;
      } else if(local === 'british-to-american') {
        textRaw = textRaw.toLowerCase();
        res.json({
          text: textRaw,
          translation: translator.britishToAmerican(textRaw) === 'same' ? "Everything looks good to me!" : translator.britishToAmerican(textRaw)
        });
        return;
      } else {
        res.json({ error: 'Invalid value for locale field' });
        return;
      }  
    });
};
