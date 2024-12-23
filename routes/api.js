'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const local = req.body.locale;
      const textRaw = req.body.text;
      // if(!local || !textRaw) {
      //   res.json({ error: 'Required field(s) missing' });
      //   return;
      // } 
      // if(textRaw === '') {
      //   res.json({ error: 'No text to translate' });
      //   return;
      // } 
      // if(local !== 'american-to-british' || local !== 'british-to-american') {
      //   res.json({ error: 'Invalid value for locale field' });
      //   return;
      // } 
      if(translator.americanToBritish(textRaw) === "Everything looks good to me!" ||
         translator.britishToAmerican(textRaw) === "Everything looks good to me!" ) {
          res.json({
            text: textRaw,
            translation: "Everything looks good to me!"
          });
         }
      if(local === 'american-to-british') {
        res.json({
          text: textRaw,
          translation: translator.americanToBritish(textRaw)
        });
        return;
      } 
       if(local === 'british-to-american') {
        res.json({
          text: textRaw,
          translation: translator.britishToAmerican(textRaw)
        });
        return;
      }
    });
};
